import { useState } from 'react'
import { Plus, Clock, Tag, Sparkles, User as UserIcon } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import GlassCard from '../components/ui/GlassCard.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { plannerTasks as initialTasks } from '../data/mockData.js'

const priorityTone = { High: 'high', Medium: 'moderate', Low: 'low' }

export default function Planner() {
  const [tasks, setTasks] = useState(initialTasks)

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const completed = tasks.filter((t) => t.completed).length
  const percent = Math.round((completed / tasks.length) * 100)

  return (
    <div>
      <PageHeader
        eyebrow="Recovery Planner"
        title="Today's Plan"
        description="Your tasks and recovery goals, together in one place."
        action={
          <Button variant="primary" icon={Plus}>
            Add Task
          </Button>
        }
      />

      <GlassCard glow className="p-7 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-text-lo mb-1">Daily Progress</p>
            <p className="text-3xl font-display font-semibold">{percent}%</p>
          </div>
          <p className="text-sm text-text-lo">{completed} of {tasks.length} tasks completed</p>
        </div>
        <ProgressBar value={percent} height="h-3" />
      </GlassCard>

      <div className="space-y-3">
        {tasks.map((task) => (
          <GlassCard key={task.id} hover className="p-5 flex items-center gap-4">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                task.completed ? 'bg-brand-gradient border-transparent' : 'border-white/20 hover:border-accent-purple/50'
              }`}
              aria-label="Toggle task completion"
            >
              {task.completed && <span className="w-2 h-2 rounded-full bg-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium mb-1.5 ${task.completed ? 'text-text-faint line-through' : 'text-text-hi'}`}>
                {task.title}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-lo">
                <span className="flex items-center gap-1.5">
                  <Tag size={12} /> {task.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {task.date}, {task.time}
                </span>
                <span className="flex items-center gap-1.5">
                  {task.source === 'ENGINE' ? <Sparkles size={12} className="text-accent-purple" /> : <UserIcon size={12} />}
                  {task.source === 'ENGINE' ? 'AI Suggested' : 'Your Task'}
                </span>
              </div>
            </div>

            <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
