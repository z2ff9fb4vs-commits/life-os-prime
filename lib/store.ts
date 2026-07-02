import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  title: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  streak: number;
  lastCompletedDate?: Date;
  createdAt: Date;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  effort?: number;
  status: 'Backlog' | 'TODO' | 'In Progress' | 'Done';
  deadline?: Date;
  tags: string[];
}

export interface Goal {
  id: string;
  title: string;
  type: 'Annual' | 'Quarterly' | 'Monthly';
  progress: number;
  targetDate: Date;
  linkedTasks: string[];
}

export interface DailyCheckIn {
  date: Date;
  wakeTime: string;
  sleepHours: number;
  mood: 1 | 2 | 3 | 4 | 5;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  productivityScore: number;
  habitsCompleted: string[];
  deepWorkHours: number;
  distractions: string[];
  wins: string[];
  failures: string[];
}

interface LifeOSStore {
  // Data
  habits: Map<string, Habit>;
  tasks: Map<string, Task>;
  goals: Map<string, Goal>;
  checkIns: DailyCheckIn[];

  // User Profile
  name: string;
  age: number;
  country: string;
  occupation: string;
  mainGoals: string[];
  struggles: string[];
  desiredSelf: string;
  satisfactionLevel: number;
  stressLevel: number;
  disciplineLevel: number;

  // Actions
  addHabit: (habit: Habit) => void;
  completeHabit: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addGoal: (goal: Goal) => void;
  addCheckIn: (checkIn: DailyCheckIn) => void;
  setUserProfile: (profile: Partial<LifeOSStore>) => void;
}

export const useLifeOS = create<LifeOSStore>()(
  persist(
    (set) => ({
      habits: new Map(),
      tasks: new Map(),
      goals: new Map(),
      checkIns: [],

      name: '',
      age: 0,
      country: '',
      occupation: '',
      mainGoals: [],
      struggles: [],
      desiredSelf: '',
      satisfactionLevel: 0,
      stressLevel: 0,
      disciplineLevel: 0,

      addHabit: (habit) =>
        set((state) => {
          const newHabits = new Map(state.habits);
          newHabits.set(habit.id, habit);
          return { habits: newHabits };
        }),

      completeHabit: (id) =>
        set((state) => {
          const newHabits = new Map(state.habits);
          const habit = newHabits.get(id);
          if (habit) {
            habit.completed = true;
            habit.streak += 1;
            habit.lastCompletedDate = new Date();
            newHabits.set(id, habit);
          }
          return { habits: newHabits };
        }),

      addTask: (task) =>
        set((state) => {
          const newTasks = new Map(state.tasks);
          newTasks.set(task.id, task);
          return { tasks: newTasks };
        }),

      updateTask: (id, updates) =>
        set((state) => {
          const newTasks = new Map(state.tasks);
          const task = newTasks.get(id);
          if (task) {
            newTasks.set(id, { ...task, ...updates });
          }
          return { tasks: newTasks };
        }),

      addGoal: (goal) =>
        set((state) => {
          const newGoals = new Map(state.goals);
          newGoals.set(goal.id, goal);
          return { goals: newGoals };
        }),

      addCheckIn: (checkIn) =>
        set((state) => ({
          checkIns: [...state.checkIns, checkIn],
        })),

      setUserProfile: (profile) => set(profile),
    }),
    {
      name: 'life-os-storage',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);
