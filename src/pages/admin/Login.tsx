import { signInWithEmailAndPassword } from 'firebase/auth'
import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SectionHeading } from '../../components/SectionHeading'
import { useAuth } from '../../hooks/useAuth'
import { auth } from '../../lib/firebase'

export function Login() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <SectionHeading>Admin Login</SectionHeading>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4 rounded-lg border border-noir/10 bg-white p-6 shadow-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none"
        />
        {error && <p className="text-sm text-crimson">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-crimson px-4 py-2 text-white transition-colors hover:bg-noir disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
