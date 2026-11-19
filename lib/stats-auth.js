// Accesso alla dashboard /statistiche (solo server).
// Il cookie qui definito è un cookie di AMMINISTRAZIONE: serve solo al titolare per
// restare collegato alla dashboard e non riguarda i visitatori del sito.
import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'itp_stats_admin'
export const SESSION_PATH = '/statistiche'
export const SESSION_HOURS = 8
const MIN_PASSWORD = 16
const MIN_SECRET = 32

function sha256(value) {
  return createHash('sha256').update(String(value), 'utf8').digest()
}

// Spiega cosa manca nella configurazione, oppure null se è tutto a posto.
export function authConfigProblem() {
  const password = process.env.STATS_PASSWORD || ''
  const secret = process.env.STATS_SECRET || ''
  if (password.length < MIN_PASSWORD) return `STATS_PASSWORD mancante o più corta di ${MIN_PASSWORD} caratteri.`
  if (secret.length < MIN_SECRET) return `STATS_SECRET mancante o più corto di ${MIN_SECRET} caratteri.`
  return null
}

// Confronto a tempo costante: si confrontano gli hash (sempre 32 byte), così né il
// contenuto né la lunghezza della password influenzano il tempo di risposta.
export function checkPassword(input) {
  if (authConfigProblem()) return false
  const a = sha256(typeof input === 'string' ? input : '')
  const b = sha256(process.env.STATS_PASSWORD)
  return timingSafeEqual(a, b)
}

function sign(payload) {
  return createHmac('sha256', process.env.STATS_SECRET).update(`itp-stats:${payload}`).digest('hex')
}

// Token: "<scadenza in ms>.<hmac>"
export function createSessionToken(now = Date.now()) {
  const exp = String(now + SESSION_HOURS * 3600 * 1000)
  return `${exp}.${sign(exp)}`
}

export function verifySessionToken(token, now = Date.now()) {
  try {
    if (authConfigProblem() || typeof token !== 'string') return false
    const [exp, mac] = token.split('.')
    if (!/^\d{10,16}$/.test(exp || '') || !/^[a-f0-9]{64}$/.test(mac || '')) return false
    if (Number(exp) < now) return false
    return timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(sign(exp), 'hex'))
  } catch {
    return false
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: SESSION_PATH,
    maxAge: SESSION_HOURS * 3600,
  }
}

export function isAuthenticated() {
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value)
}
