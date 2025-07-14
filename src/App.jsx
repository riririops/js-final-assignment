import React, { useEffect } from 'react';
import HabitList from './components/HabitList';
import GrowthView from './components/GrowthView';
import StatsChart from './components/StatsChart';
import { useHabitStore } from './store/habitStore';
import { useGrowthStore } from './store/growthStore';
import Home from './pages/Home';
import './index.css';


export default function App() {
  const habits = useHabitStore(state => state.habits);
  const updateExpByHabits = useGrowthStore(state => state.updateExpByHabits);
   return <Home />;

  useEffect(() => {
    updateExpByHabits(habits);
  }, [habits]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>習慣でキャラ成長アプリ</h1>
      <GrowthView />
      <HabitList />
      <StatsChart habits={habits} />
    </div>
  );
}