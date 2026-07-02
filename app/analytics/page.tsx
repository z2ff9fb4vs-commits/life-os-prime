'use client';

import { useLifeOS } from '@/lib/store';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const store = useLifeOS();

  const checkIns = store.checkIns;

  const weeklyData = [
    { day: 'Mon', productivity: 65, energy: 75, mood: 3 },
    { day: 'Tue', productivity: 72, energy: 80, mood: 4 },
    { day: 'Wed', productivity: 68, energy: 70, mood: 3 },
    { day: 'Thu', productivity: 85, energy: 88, mood: 4 },
    { day: 'Fri', productivity: 78, energy: 82, mood: 4 },
    { day: 'Sat', productivity: 55, energy: 60, mood: 2 },
    { day: 'Sun', productivity: 45, energy: 65, mood: 3 },
  ];

  const avgProductivity = checkIns.length > 0
    ? Math.round(checkIns.reduce((sum, c) => sum + c.productivityScore, 0) / checkIns.length)
    : 0;

  const avgMood = checkIns.length > 0
    ? (checkIns.reduce((sum, c) => sum + c.mood, 0) / checkIns.length).toFixed(1)
    : 0;

  const avgSleep = checkIns.length > 0
    ? (checkIns.reduce((sum, c) => sum + c.sleepHours, 0) / checkIns.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Analytics Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid gap-4 mb-8 grid-cols-1 md:grid-cols-4">
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <p className="text-sm text-slate-400">Avg Productivity</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{avgProductivity}%</p>
          </div>
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <p className="text-sm text-slate-400">Avg Mood</p>
            <p className="text-3xl font-bold text-green-400 mt-2">{avgMood}/5</p>
          </div>
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <p className="text-sm text-slate-400">Avg Sleep</p>
            <p className="text-3xl font-bold text-purple-400 mt-2">{avgSleep}h</p>
          </div>
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <p className="text-sm text-slate-400">Check-Ins</p>
            <p className="text-3xl font-bold text-yellow-400 mt-2">{checkIns.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Productivity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Mood & Energy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="mood" fill="#10b981" />
                <Bar dataKey="energy" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-In History */}
        <div className="mt-8 rounded-lg bg-slate-800 border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Check-Ins</h3>
          {checkIns.length === 0 ? (
            <p className="text-slate-400">No check-ins yet. Start your daily check-in to see analytics!</p>
          ) : (
            <div className="space-y-4">
              {checkIns
                .slice(-7)
                .reverse()
                .map((checkIn, idx) => (
                  <div key={idx} className="border-t border-slate-700 pt-4 first:border-t-0">
                    <p className="text-sm text-slate-400">{new Date(checkIn.date).toLocaleDateString()}</p>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-slate-400">Productivity</p>
                        <p className="text-lg font-semibold text-blue-400">{checkIn.productivityScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Mood</p>
                        <p className="text-lg font-semibold text-green-400">{checkIn.mood}/5</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Energy</p>
                        <p className="text-lg font-semibold text-yellow-400">{checkIn.energyLevel}/5</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Sleep</p>
                        <p className="text-lg font-semibold text-purple-400">{checkIn.sleepHours}h</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
