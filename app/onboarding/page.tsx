'use client';

import { useState } from 'react';
import { useLifeOS } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const store = useLifeOS();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    occupation: '',
    mainGoals: '',
    struggles: '',
    desiredSelf: '',
    satisfactionLevel: 5,
    stressLevel: 5,
    disciplineLevel: 5,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    store.setUserProfile({
      name: formData.name,
      age: parseInt(formData.age),
      country: formData.country,
      occupation: formData.occupation,
      mainGoals: formData.mainGoals.split(',').map((g) => g.trim()),
      struggles: formData.struggles.split(',').map((s) => s.trim()),
      desiredSelf: formData.desiredSelf,
      satisfactionLevel: parseInt(formData.satisfactionLevel.toString()),
      stressLevel: parseInt(formData.stressLevel.toString()),
      disciplineLevel: parseInt(formData.disciplineLevel.toString()),
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">LIFE OS PRIME</h1>
          <p className="text-slate-400">Personal Onboarding - Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg bg-slate-800 border border-slate-700 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  placeholder="Joshua Mammen"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                    placeholder="Australia"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="Founder, Web Designer"
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!formData.name || !formData.age || !formData.country || !formData.occupation}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Goals & Struggles</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Main Goals (comma-separated)</label>
                <textarea
                  name="mainGoals"
                  value={formData.mainGoals}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="Build successful business, Maintain health, Continuous learning"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Struggles (comma-separated)</label>
                <textarea
                  name="struggles"
                  value={formData.struggles}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="Time management, Focus, Work-life balance"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Who do you want to become?</label>
                <textarea
                  name="desiredSelf"
                  value={formData.desiredSelf}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="A disciplined, focused entrepreneur who builds world-class products..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                  ← Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} className="flex-1">
                  Next →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Performance Baseline</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Life Satisfaction: {formData.satisfactionLevel}/10
                </label>
                <input
                  type="range"
                  name="satisfactionLevel"
                  min="1"
                  max="10"
                  value={formData.satisfactionLevel}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Stress Level: {formData.stressLevel}/10
                </label>
                <input
                  type="range"
                  name="stressLevel"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Discipline Level: {formData.disciplineLevel}/10
                </label>
                <input
                  type="range"
                  name="disciplineLevel"
                  min="1"
                  max="10"
                  value={formData.disciplineLevel}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="mt-8 p-4 bg-slate-700 rounded border border-slate-600">
                <p className="text-slate-300 text-sm">
                  ✓ Onboarding complete! Your Life OS Prime dashboard is ready. Let's start optimizing your performance.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setStep(2)} variant="outline" className="flex-1">
                  ← Back
                </Button>
                <Button type="submit" className="flex-1">
                  Complete & Start Dashboard
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
