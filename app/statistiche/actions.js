'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SESSION_COOKIE,
  SESSION_PATH,
  authConfigProblem,
  checkPassword,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/stats-auth'

export async function login(prevState, formData) {
  if (authConfigProblem()) {
    return { error: 'Accesso non configurato: imposta STATS_PASSWORD e STATS_SECRET su Vercel.' }
  }
  const password = formData.get('password')
  if (!checkPassword(typeof password === 'string' ? password : '')) {
    // piccolo ritardo per rendere più lenti i tentativi a ripetizione
    await new Promise((r) => setTimeout(r, 800))
    return { error: 'Password non corretta.' }
  }
  cookies().set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions())
  redirect(SESSION_PATH)
}

export async function logout() {
  cookies().set(SESSION_COOKIE, '', { ...sessionCookieOptions(), maxAge: 0 })
  redirect(SESSION_PATH)
}
