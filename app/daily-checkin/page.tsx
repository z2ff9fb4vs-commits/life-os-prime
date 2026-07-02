'use client';

import { useLifeOS } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DailyCheckInPage() {
  const store = useLifeOS();
  const [formData, setFormData] = useState({
    wakeTime: '06:00',
    sleepHours: 7,
    mood: 3,
    energyLevel: 3,
    deepWorkHours: 2,
    productivityScore: 70,
    wins: '',
    failures: '',
    distractions: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    store.addCheckIn({
      date: new Date(),
      wakeTime: formData.wakeTime,
      sleepHours: parseInt(formData.sleepHours.toString()),
      mood: parseInt(formData.mood.toString()),
      energyLevel: parseInt(formData.energyLevel.toString()),
      productivityScore: parseInt(formData.productivityScore.toString()),
      deepWorkHours: parseInt(formData.deepWorkHours.toString()),
      habitsCompleted: [],
      wins: formData.wins.split(',').map((w) => w.trim()),
      failures: formData.failures.split(',').map((f) => f.trim()),
      distractions: formData.distractions.split(',').map((d) => d.trim()),
    });

    alert('Daily check-in saved! Great work.');
    setFormData({
      wakeTime: '06:00',
      sleepHours: 7,
      mood: 3,
      energyLevel: 3,
      deepWorkHours: 2,
      productivityScore: 70,
      wins: '',
      failures: '',
      distractions: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Daily Check-In</h1>

        <form onSubmit={handleSubmit} className="rounded-lg bg-slate-800 border border-slate-700 p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Wake Time</label>
              <input
                type="time"
                name="wakeTime"
                value={formData.wakeTime}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sleep Hours: {formData.sleepHours}</label>
              <input
                type="range"
                name="sleepHours"
                min="1"
                max="12"
                value={formData.sleepHours}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mood: {formData.mood}/5</label>
              <input
                type="range"
                name="mood"
                min="1"
                max="5"
                value={formData.mood}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Energy: {formData.energyLevel}/5</label>
              <input
                type="range"
                name="energyLevel"
                min="1"
                max="5"
                value={formData.energyLevel}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Deep Work Hours: {formData.deepWorkHours}</label>
            <input
              type="range"
              name="deepWorkHours"
              min="0"
              max="8"
              value={formData.deepWorkHours}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Productivity Score: {formData.productivityScore}%</label>
            <input
              type="range"
              name="productivityScore"
              min="0"
              max="100"
              value={formData.productivityScore}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Wins Today (comma-separated)</label>
            <textarea
              name="wins"
              value={formData.wins}
              onChange={handleChange}
              placeholder="Completed project, Good workout..."
              rows={2}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Failures (comma-separated)</label>
            <textarea
              name="failures"
              value={formData.failures}
              onChange={handleChange}
              placeholder="Procrastinated, Missed workout..."
              rows={2}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Main Distractions (comma-separated)</label>
            <textarea
              name="distractions"
              value={formData.distractions}
              onChange={handleChange}
              placeholder="Social media, Notifications..."
              rows={2}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Daily Check-In
          </Button>
        </form>
      </div>
    </div>
  );
}
