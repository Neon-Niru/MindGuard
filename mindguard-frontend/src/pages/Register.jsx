import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import AuthShell from '../components/layout/AuthShell.jsx'
import TextField from '../components/ui/TextField.jsx'
import Button from '../components/ui/Button.jsx'

export default function Register() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/app/dashboard')
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your wellness journey in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-accent-purple hover:text-accent-teal transition-colors">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField label="Full name" type="text" placeholder="Aditi Sharma" icon={User} required />
        <TextField label="Email" type="email" placeholder="you@school.edu" icon={Mail} required />
        <TextField label="Password" type="password" placeholder="At least 8 characters" icon={Lock} required />

        <label className="flex items-start gap-2.5 text-xs text-text-lo">
          <input type="checkbox" className="mt-0.5 rounded border-white/20 bg-white/5" required />
          I agree to the Terms of Service and Privacy Policy.
        </label>

        <Button type="submit" variant="primary" icon={ArrowRight} className="w-full">
          Create Account
        </Button>
      </form>
    </AuthShell>
  )
}
