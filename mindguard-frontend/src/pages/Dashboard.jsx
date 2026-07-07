import { Heart, Moon, Gauge, TrendingUp, MessageCircle, ListChecks, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import StatTile from '../components/ui/StatTile.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { latestAssessment, currentUser } from '../data/mockData.js'

export default function Dashboard() {
  const a = latestAssessment
  const scoreDelta = a.wellnessScore - a.previousComparison.wellnessScore
  const riskDelta = a.burnoutRisk - a.previousComparison.burnoutRisk

  return (
    <div>
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${currentUser.name.split(' ')[0]}`}
        description="Here's your latest wellness snapshot, based on your most recent check-in."
      />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <GlassCard glow className="lg:col-span-2 p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-text-lo mb-1">Wellness Score</p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-display font-semibold">{a.wellnessScore}</p>
                <span className={`flex items-center gap-1 text-sm mb-1.5 ${scoreDelta >= 0 ? 'text-accent-teal' : 'text-rose-300'}`}>
                  {scoreDelta >= 0 ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {Math.abs(scoreDelta)} vs last check-in
                </span>
              </div>
            </div>
            <Badge tone="low">Trending up</Badge>
          </div>
          <ProgressBar value={a.wellnessScore} height="h-3" />
        </GlassCard>

        <GlassCard className="p-7">
          <div className="flex items-start justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-accent-amber/10 flex items-center justify-center">
              <Gauge size={18} className="text-accent-amber" />
            </span>
            <Badge tone={a.riskLevel}>{a.riskLevel === 'low' ? 'Low Risk' : a.riskLevel}</Badge>
          </div>
          <p className="text-xs text-text-lo mb-1">Burnout Risk</p>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-display font-semibold text-accent-amber">{a.burnoutRisk}%</p>
            <span className={`flex items-center gap-1 text-xs mb-1 ${riskDelta <= 0 ? 'text-accent-teal' : 'text-rose-300'}`}>
              {riskDelta <= 0 ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
              {Math.abs(riskDelta)}%
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatTile icon={Heart} label="Mood" value={a.mood} iconTone="text-accent-purple bg-accent-purple/10" />
        <StatTile icon={Moon} label="Sleep" value={`${a.sleepHours}h`} sub="Recommended: 8–9h" iconTone="text-accent-blue bg-accent-blue/10" />
        <StatTile icon={Gauge} label="Stress" value={a.stressLevel} iconTone="text-accent-teal bg-accent-teal/10" />
        <StatTile icon={TrendingUp} label="Productivity" value={`${a.productivity}%`} iconTone="text-accent-amber bg-accent-amber/10" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-7">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium">Today's Planner Progress</h3>
            <Link to="/app/planner" className="text-xs text-accent-purple hover:text-accent-teal transition-colors">
              Open planner →
            </Link>
          </div>
          <ProgressBar value={a.plannerProgress} label="Completed today" height="h-3" />

          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-sm font-medium mb-4">Recovery Goals</h4>
            <div className="space-y-3">
              {a.recoveryGoals.map((g) => (
                <div key={g.id} className="flex items-center gap-3">
                  <span className={`rounded-md border flex items-center justify-center shrink-0 ${g.completed ? 'bg-brand-gradient border-transparent' : 'border-white/20'}`} style={{ width: 18, height: 18 }} />
                  <p className={`text-sm ${g.completed ? 'text-text-faint line-through' : 'text-text-lo'}`}>{g.goal}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <h3 className="font-medium mb-5 flex items-center gap-2">
            <Sparkles size={16} className="text-accent-purple" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link to="/app/chat">
              <button className="w-full flex items-center gap-3 glass rounded-xl px-4 py-3.5 text-sm hover:bg-glass-fillhover transition-colors">
                <MessageCircle size={17} className="text-accent-purple" />
                Start a check-in conversation
              </button>
            </Link>
            <Link to="/app/planner">
              <button className="w-full flex items-center gap-3 glass rounded-xl px-4 py-3.5 text-sm hover:bg-glass-fillhover transition-colors">
                <ListChecks size={17} className="text-accent-teal" />
                Review today's tasks
              </button>
            </Link>
            <Link to="/app/progress">
              <button className="w-full flex items-center gap-3 glass rounded-xl px-4 py-3.5 text-sm hover:bg-glass-fillhover transition-colors">
                <TrendingUp size={17} className="text-accent-blue" />
                View long-term progress
              </button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
