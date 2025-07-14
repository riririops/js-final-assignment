import React, { useState } from 'react';
import { useHabitStore } from '../store/habitStore';
import { formatToday } from '../utils/dateUtils';

export default function HabitList() {
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const addHabit = useHabitStore((state) => state.addHabit);
  const [newHabitName, setNewHabitName] = useState('');
  const today = formatToday();

  const onAdd = () => {
    if (newHabitName.trim() !== '') {
      addHabit(newHabitName.trim());
      setNewHabitName('');
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">今日の習慣</h2>
      <ul className="space-y-2">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={habit.history[today] || false}
              onChange={() => toggleHabit(habit.id, today)}
              className="w-5 h-5"
            />
            <span className="text-gray-800">{habit.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="新しい習慣を追加"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </div>
  );
}
