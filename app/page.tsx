'use client';

import { useLifeOS } from '@/lib/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const store = useLifeOS();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hasProfile = store.name !== '';
  const completionRate = store.habits.size > 0
    ? Array.from(store.habits.values()).filter((h) => h.completed).length / store.habits.size
    : 0;

  const sampleData = [
    { day: 'Mon', productivity: 65, energy: 75 },
    { day: 'Tue', productivity: 72, energy: 80 },
    { day: 'Wed', productivity: 68, energy: 70 },
    { day: 'Thu', productivity: 85, energy: 88 },
    { day: 'Fri', productivity: 78, energy: 82 },
    { day: 'Sat', productivity: 55, energy: 60 },
    { day: 'Sun', productivity: 45, energy: 65 },
  ];

  const scoreData = [
    { name: 'Productivity', value: 75 },
    { name: 'Discipline', value: 68 },
    { name: 'Health', value: 72 },
  ];

  const COLORS = ['#3b82f6', '#ef4444', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">LIFE OS PRIME</h1>
            <p className="text-slate-400">Advanced Personal Performance Dashboard</p>
          </div>
          {!hasProfile && (
            <Link href="/onboarding">
              <Button size="lg">Start Onboarding</Button>
            </Link>
          )}
        </div>

        {hasProfile ? (
          <>
            {/* Welcome */}
            <div className="mb-8 rounded-lg bg-slate-800 border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white">Welcome back, {store.name}</h2>
              <p className="text-slate-400 mt-2">
                Satisfaction: {store.satisfactionLevel}/10 | Stress: {store.stressLevel}/10 | Discipline: {store.disciplineLevel}/10
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 mb-8 grid-cols-1 md:grid-cols-4">
              <MetricCard title="Productivity Score" value={75} unit="%" color="bg-blue-500" />
              <MetricCard title="Discipline Score" value={68} unit="%" color="bg-red-500" />
              <MetricCard title="Habit Completion" value={Math.round(completionRate * 100)} unit="%" color="bg-green-500" />
              <MetricCard title="Energy Level" value={82} unit="%" color="bg-yellow-500" />
            </div>

            {/* Charts */}
            <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-2">
              {/* Productivity Trend */}
              <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Weekly Productivity Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Breakdown */}
              <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {scoreData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <Link href="/daily-checkin">
                <Button className="w-full" size="lg">Daily Check-in</Button>
              </Link>
              <Link href="/habits">
                <Button className="w-full" size="lg">Track Habits</Button>
              </Link>
              <Link href="/analytics">
                <Button className="w-full" size="lg">Full Analytics</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to LIFE OS PRIME</h2>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Transform yourself into a high-performing human. Complete onboarding to set up your personalized dashboard.
            </p>
            <Link href="/onboarding">
              <Button size="lg">Begin Onboarding</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, color }: { title: string; value: number; unit: string; color: string }) {
  return (
    <div className="rounded-lg bg-slate-800 border border-slate-700 p-6">
      <p className="text-sm text-slate-400 mb-2">{title}</p>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-white">{value}</span>
        <span className="text-slate-400 mb-1">{unit}</span>
      </div>
      <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
