// src/store/habitStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

// セキュリティのための暗号化キー（本番環境では環境変数にすることを推奨）
const SECRET_KEY = 'your-secret-key';

// ローカルストレージ保存データの暗号化・復号化関数
const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return null;
  }
};

// Zustand ストア定義（暗号化付き永続化）
export const useHabitStore = create(
  persist(
    (set) => ({
      habits: [],

      // 習慣のチェック状態をトグル（ON/OFF）
      toggleHabit: (id, dateStr) =>
        set((state) => {
          const newHabits = state.habits.map((h) => {
            if (h.id !== id) return h;
            const updatedHistory = { ...h.history };
            updatedHistory[dateStr] = !updatedHistory[dateStr];
            return { ...h, history: updatedHistory };
          });
          return { habits: newHabits };
        }),

      // 習慣を追加
      addHabit: (name) =>
        set((state) => ({
          habits: [...state.habits, { id: Date.now(), name, history: {} }],
        })),

      // 習慣を削除（ID指定）
      deleteHabit: (id) =>
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
