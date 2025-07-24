import React, { useEffect } from 'react';
import HabitList from '../components/HabitList';
import GrowthView from '../components/GrowthView';
import StatsChart from '../components/StatsChart';
import { useHabitStore } from '../store/habitStore';
import { useGrowthStore } from '../store/growthStore';

export default function Home() {
  // Zustandストアから.map()で取得時にクラッシュするのを防ぐために
  const habits = useHabitStore((state) => state.habits ?? []);
  const updateExpByHabits = useGrowthStore(state => state.updateExpByHabits);

  // 習慣のチェック状態が変わるたびに経験値を更新
  useEffect(() => {
    updateExpByHabits(habits);
  }, [habits]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          習慣でキャラ成長アプリ
        </h1>
        <GrowthView />
        <HabitList />
        <StatsChart habits={habits} />
      </div>
    </div>
  );
}
