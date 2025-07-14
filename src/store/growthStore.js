import { create } from 'zustand';

const LEVEL_UP_EXP = 100;

export const useGrowthStore = create((set, get) => ({
  level: 1,
  experience: 0,
  addExp: (amount) => {
    set((state) => {
      const newExp = state.experience + amount;
      const levelUps = Math.floor(newExp / LEVEL_UP_EXP);
      const remainingExp = newExp % LEVEL_UP_EXP;
      return {
        experience: remainingExp,
        level: state.level + levelUps,
      };
    });
  },
  updateExpByHabits: (habits) => {
    const today = new Date().toISOString().slice(0, 10);
    const doneCount = habits.reduce(
      (acc, h) => acc + (h.history[today] ? 1 : 0),
      0
    );
    get().addExp(doneCount * 10);
  },
}));