// Endpoint delle statistiche anonime. Riceve un evento da navigator.sendBeacon.
// Risponde SEMPRE 204 senza corpo: non rivela mai se l'evento è stato salvato,
// scartato o se c'è stato un errore.
//
// Privacy: non legge né salva IP, cookie o user agent (lo user agent serve solo
// a scartare i bot e non viene memorizzato). env lo decide il server.
import { validateHit, isBot, envFromVercel } from '@/lib/stats'
import { insertHit } from '@/lib/hit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 2048

function noContent() {
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
}

// Legge il corpo fermandosi oltre 2 KB, senza caricare in memoria payload grandi.
async function readLimited(request) {
  const declared = Number(request.headers.get('content-length') || 0)
  if (declared > MAX_BYTES) return null
  if (!request.body) return ''
  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BYTES) {
      try { await reader.cancel() } catch {}
      return null
    }
    chunks.push(value)
  }
  return new TextDecoder().decode(Buffer.concat(chunks.map((c) => Buffer.from(c))))
}

// Se il browser invia Origin (o Referer), deve essere lo stesso host del sito.
function sameSite(request) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').toLowerCase()
  const claimed = request.headers.get('origin') || request.headers.get('referer')
  if (!claimed || claimed === 'null') return true
  try {
    return new URL(claimed).host.toLowerCase() === host
  } catch {
    return false
  }
}

export async function POST(request) {
  try {
    if (!sameSite(request)) return noContent()
    if (isBot(request.headers.get('user-agent'))) return noContent()

    const text = await readLimited(request)
    if (!text) return noContent()

    let raw
    try {
      raw = JSON.parse(text)
    } catch {
      return noContent()
    }

    const hit = validateHit(raw)
    if (!hit) return noContent()

    await insertHit({ ...hit, env: envFromVercel(process.env.VERCEL_ENV) })
  } catch (err) {
    console.error('[stats] errore endpoint:', err && err.message ? err.message : 'errore sconosciuto')
  }
  return noContent()
}

export function GET() {
  return noContent()
}
