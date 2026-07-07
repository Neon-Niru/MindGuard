import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import AuthShell from '../components/layout/AuthShell.jsx'
import TextField from '../components/ui/TextField.jsx'
import Button from '../components/ui/Button.jsx'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // UI-only demo: navigate straight to the dashboard.
    navigate('/app/dashboard')
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to check in on your wellness."
      footer={
        <>
          New to MindGuard AI?{' '}
          <Link to="/register" className="text-accent-purple hover:text-accent-teal transition-colors">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField label="Email" type="email" placeholder="you@school.edu" icon={Mail} required />
        <TextField label="Password" type="password" placeholder="••••••••" icon={Lock} required />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-text-lo">
            <input type="checkbox" className="rounded border-white/20 bg-white/5" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-accent-purple hover:text-accent-teal transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" icon={ArrowRight} className="w-full">
          Log In
        </Button>
      </form>
    </AuthShell>
  )
}
