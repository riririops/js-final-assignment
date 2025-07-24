// src/components/HabitList.jsx
import React, { useState } from 'react';
import { useHabitStore } from '../store/habitStore';
import { useGrowthStore } from '../store/growthStore';
import { formatToday } from '../utils/dateUtils';

export default function HabitList() {
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const addHabit = useHabitStore((state) => state.addHabit);
  const deleteHabit = useHabitStore((state) => state.removeHabitById);
  const addExp = useGrowthStore((state) => state.addExp);

  const [newHabitName, setNewHabitName] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const today = formatToday();

  /*  追加ボタン */
  const onAdd = () => {
    const name = newHabitName.trim();

    // === 重複チェック（大小無視） ===
    const exists = habits.some(
      (h) => h.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      alert('同じ習慣がすでに存在します');
      return;
    }

    if (name !== '') {
      addHabit(name);
      setNewHabitName('');
    }
  };

  /*  トグルで経験値付与 */
  const handleToggle = (id) => {
    const checked = toggleHabit(id, today);
    // チェックを付けた時だけ経験値を加算
    if (checked) {
      addExp(10);
    }
  };

  /*  削除 */
  const handleDelete = (id) => {
    if (window.confirm('この習慣を本当に削除しますか？')) deleteHabit(id);
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">今日の習慣</h2>

      <ul className="space-y-2">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={habit.history[today] || false}
                onChange={() => handleToggle(habit.id)}
                className="w-5 h-5"
                disabled={isDeleteMode}
              />
              <span className="text-gray-800">{habit.name}</span>
            </div>

            {isDeleteMode && (
              <button
                onClick={() => handleDelete(habit.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                削除
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* 追加フォーム & 削除モード切替 */}
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
        <button
          onClick={() => setIsDeleteMode(!isDeleteMode)}
          className={`px-4 py-2 text-white rounded-md ${
            isDeleteMode
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isDeleteMode ? '削除解除' : '削除モード'}
        </button>
      </div>
    </div>
  );
}
