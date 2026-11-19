'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blu text-white font-body font-semibold text-base px-6 py-4 rounded-full hover:bg-[#1f7e9a] transition-colors disabled:opacity-60"
    >
      {pending ? 'Verifica…' : 'Entra'}
    </button>
  )
}

export default function LoginForm({ configProblem }) {
  const [state, action] = useFormState(login, { error: '' })

  return (
    <form action={action} className="flex flex-col gap-4">
      <label htmlFor="stats-password" className="font-heading text-[0.72rem] tracking-[0.14em] uppercase text-blu">
        Password
      </label>
      <input
        id="stats-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className="border border-celeste-light rounded-xl px-4 py-3 text-base text-blu bg-site-white focus:outline-none focus:border-celeste font-body w-full"
      />
      {(configProblem || state?.error) && (
        <p role="alert" className="font-body text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {configProblem || state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  )
}
