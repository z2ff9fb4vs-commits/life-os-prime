'use client';

import { useLifeOS } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HabitsPage() {
  const store = useLifeOS();
  const [newHabit, setNewHabit] = useState('');

  const habits = Array.from(store.habits.values());

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    store.addHabit({
      id: Date.now().toString(),
      title: newHabit,
      frequency: 'Daily',
      streak: 0,
      createdAt: new Date(),
      completed: false,
    });
    setNewHabit('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Habit Tracking</h1>

        <div className="rounded-lg bg-slate-800 border border-slate-700 p-6 mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
            <Button onClick={handleAddHabit}>Add Habit</Button>
          </div>
        </div>

        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No habits yet. Create one to get started!</div>
          ) : (
            habits.map((habit) => (
              <div key={habit.id} className="rounded-lg bg-slate-800 border border-slate-700 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{habit.title}</h3>
                  <p className="text-slate-400">Streak: {habit.streak}</p>
                </div>
                <Button onClick={() => store.completeHabit(habit.id)}>
                  {habit.completed ? '✓ Done' : 'Complete'}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
