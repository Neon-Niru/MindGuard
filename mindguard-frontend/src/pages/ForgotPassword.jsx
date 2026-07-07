import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import AuthShell from '../components/layout/AuthShell.jsx'
import TextField from '../components/ui/TextField.jsx'
import Button from '../components/ui/Button.jsx'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a reset link to your email."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="text-accent-purple hover:text-accent-teal transition-colors">
            Back to login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-accent-teal/10 border border-accent-teal/25 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={22} className="text-accent-teal" />
          </div>
          <p className="text-sm text-text-hi mb-1.5">Check your inbox</p>
          <p className="text-sm text-text-lo">
            If an account exists for that email, a reset link is on its way. The link expires shortly, so use it soon.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField label="Email" type="email" placeholder="you@school.edu" icon={Mail} required />
          <Button type="submit" variant="primary" icon={ArrowRight} className="w-full">
            Send Reset Link
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
