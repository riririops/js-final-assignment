import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // 環境変数で管理するのが望ましい

const encrypt = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return null;
  }
};

export const useHabitStore = create(
  persist(
    (set) => ({
      habits: [],
      toggleHabit: (id, dateStr) => {
        let checked = false;
        set((state) => {
          const newHabits = state.habits.map((h) => {
            if (h.id !== id) return h;
            const updatedHistory = { ...h.history };
            const prev = !!updatedHistory[dateStr];
            const next = !prev;
            updatedHistory[dateStr] = next;
            checked = next;
            return { ...h, history: updatedHistory };
          });
          return { habits: newHabits };
        });
        return checked;
      },
      addHabit: (name) =>
        set((state) => ({
          habits: [...state.habits, { id: Date.now(), name, history: {} }],
        })),
      removeHabitById: (id) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        })),
    }),
    {
      name: 'habit-storage',
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          const decrypted = decrypt(raw);
          return decrypted ? { state: decrypted } : null;
        },
        setItem: (name, value) => {
          const encrypted = encrypt(value.state);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
