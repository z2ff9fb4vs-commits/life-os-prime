# LIFE OS PRIME

Advanced Personal Performance Dashboard — Transform yourself into a high-performing human.

## Overview

**Life OS Prime** is a comprehensive AI-powered personal performance system that tracks habits, goals, productivity, energy, and discipline. It combines the best practices from elite productivity systems, behavioral psychology, and high-performance coaching.

## Features

### Core Features (MVP)
- **Onboarding System** — Multi-step setup to establish baseline performance metrics
- **Dashboard** — Real-time performance overview with key metrics and trends
- **Habit Tracking** — Daily/weekly/monthly habit tracking with streaks and analytics
- **Daily Check-In** — Quick capture of mood, energy, sleep, wins, failures, distractions
- **Analytics** — Weekly/monthly productivity trends, mood analysis, sleep patterns

### Data Tracked
- **Productivity Score** — Daily productivity measurement
- **Mood & Energy** — Emotional state and energy levels (1-5 scale)
- **Sleep Quality** — Hours slept, sleep consistency
- **Deep Work Hours** — Focused work time without distractions
- **Habits** — Custom habits with streak tracking and completion rates
- **Wins & Failures** — Daily wins and learning moments
- **Distractions** — Main sources of distraction for optimization

### Planned Features (Phase 2)
- Goal tracking (OKR framework)
- Time blocking and calendar integration
- Smart scheduling suggestions
- Burndown charts for projects
- Advanced analytics and dashboards
- Mobile responsiveness
- Export/import functionality

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (with localStorage persistence)
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Charts:** Recharts
- **Deployment:** Vercel

## Project Structure

```
life-os-prime/
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── onboarding/page.tsx      # 3-step onboarding flow
│   ├── habits/page.tsx          # Habit tracking
│   ├── daily-checkin/page.tsx   # Daily check-in form
│   ├── analytics/page.tsx       # Analytics dashboard
│   └── layout.tsx
├── lib/
│   ├── store.ts                 # Zustand store (core state)
│   └── utils.ts
├── components/
│   └── ui/                      # shadcn/ui components
└── public/
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Quick Start

```bash
cd ~/life-os-prime

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Onboarding
Visit `/onboarding` to complete the 3-step setup:
- **Step 1:** Basic info (name, age, country, occupation)
- **Step 2:** Goals, struggles, and desired self
- **Step 3:** Performance baseline (satisfaction, stress, discipline)

### 2. Dashboard
Main overview showing:
- Key performance metrics
- Weekly productivity trends
- Performance breakdown (pie chart)
- Quick access to habits, check-in, and analytics

### 3. Daily Check-In
Log your daily metrics:
- Wake time & sleep hours
- Mood & energy levels
- Deep work hours
- Productivity score (0-100%)
- Daily wins, failures, main distractions

### 4. Habit Tracking
Create and track custom habits:
- Add new habits
- Mark complete daily
- Track streaks
- View completion history

### 5. Analytics
View comprehensive analytics:
- Weekly productivity trends
- Mood & energy patterns
- Sleep analysis
- Check-in history
- Average metrics

## Data Persistence

All data is stored in **localStorage** using Zustand's persist middleware. Data persists across browser sessions and is kept local to the device.

### Storage
- Key: `life-os-storage`
- Format: JSON
- Limit: ~5-10MB per domain

## API & State Management

### Zustand Store (`lib/store.ts`)

Core entities:
- `habits` — Map of habit objects with streaks
- `tasks` — Task/project management (future)
- `goals` — Goal tracking with progress
- `checkIns` — Daily check-in history

Actions:
```typescript
store.addHabit(habit)
store.completeHabit(id)
store.addCheckIn(checkIn)
store.setUserProfile(profile)
```

## Styling

- **Theme:** Dark mode (slate-900 base with accent colors)
- **Colors:** Blue (#3b82f6), Red (#ef4444), Green (#10b981), Yellow (#f59e0b)
- **Framework:** Tailwind CSS v4 with shadcn/ui

## Future Roadmap

### Phase 2 (2-3 weeks)
- [ ] Goal tracking (OKR framework)
- [ ] Time blocking & calendar drag-drop
- [ ] Project management with milestones
- [ ] Smart scheduling suggestions
- [ ] Advanced habit templates

### Phase 3 (Polish)
- [ ] Mobile app (React Native)
- [ ] Email summaries (weekly reports)
- [ ] Dark/light mode toggle
- [ ] Data export (JSON, CSV)
- [ ] Integration with other systems

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect GitHub repo to Vercel for automatic deployments.

## GitHub

Repository: https://github.com/z2ff9fb4vs-commits/life-os-prime

---

**Made for Joshua Mammen — Founder, Selah Studios**
