import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, Target, ListChecks } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import { weeklyTrend, plannerCompletionTrend, recoveryGoalCompletion } from '../data/mockData.js'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-3.5 py-2.5 text-xs">
      <p className="text-text-faint mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

function TrendCard({ title, dataKey, color, unit = '' }) {
  const first = weeklyTrend[0][dataKey]
  const last = weeklyTrend[weeklyTrend.length - 1][dataKey]
  const delta = last - first
  const improving = dataKey === 'burnout' || dataKey === 'stress' ? delta <= 0 : delta >= 0

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium">{title}</p>
        <span className={`flex items-center gap-1 text-xs ${improving ? 'text-accent-teal' : 'text-rose-300'}`}>
          {improving ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(delta)}{unit}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={weeklyTrend}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="week" hide />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  )
}

export default function Progress() {
  const goalPercent = Math.round((recoveryGoalCompletion.completed / recoveryGoalCompletion.total) * 100)

  return (
    <div>
      <PageHeader
        eyebrow="Progress"
        title="Your Long-Term Wellness"
        description="Trends from your past check-ins, so you can see how far you've come."
      />

      <GlassCard glow className="p-7 mb-6">
        <p className="text-sm font-medium mb-5">Weekly Wellness Score</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={weeklyTrend}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="week" stroke="#6b7390" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7390" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="wellness" name="Wellness Score" stroke="#a56bff" strokeWidth={3} dot={{ r: 3, fill: '#a56bff' }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <TrendCard title="Burnout Trend" dataKey="burnout" color="#f5a623" unit="%" />
        <TrendCard title="Mood Trend" dataKey="mood" color="#a56bff" />
        <TrendCard title="Sleep Trend" dataKey="sleep" color="#4d7fff" />
        <TrendCard title="Stress Trend" dataKey="stress" color="#2dd9c0" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <GlassCard className="p-7">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-9 h-9 rounded-xl bg-accent-blue/10 flex items-center justify-center">
              <ListChecks size={17} className="text-accent-blue" />
            </span>
            <p className="text-sm font-medium">Planner Completion</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={plannerCompletionTrend}>
              <defs>
                <linearGradient id="grad-planner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d7fff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4d7fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#6b7390" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="completion" name="Completion" stroke="#4d7fff" strokeWidth={2} fill="url(#grad-planner)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-9 h-9 rounded-xl bg-accent-purple/10 flex items-center justify-center">
              <Target size={17} className="text-accent-purple" />
            </span>
            <p className="text-sm font-medium">Recovery Goal Completion</p>
          </div>
          <p className="text-3xl font-display font-semibold mb-1">{goalPercent}%</p>
          <p className="text-xs text-text-lo mb-5">{recoveryGoalCompletion.completed} of {recoveryGoalCompletion.total} goals completed</p>
          <ProgressBar value={goalPercent} height="h-3" />
        </GlassCard>
      </div>
    </div>
  )
}
