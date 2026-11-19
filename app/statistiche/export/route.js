// Export CSV degli eventi anonimi del periodo filtrato (stessa autenticazione della dashboard).
import { verifySessionToken, SESSION_COOKIE } from '@/lib/stats-auth'
import { resolveFilters, fetchEvents, COLUMNS } from '@/lib/stats-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BASE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
}

function csvCell(value) {
  const s = value === null || value === undefined ? '' : String(value)
  return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export async function GET(request) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return new Response('Accesso non autorizzato.', {
      status: 401,
      headers: { ...BASE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const filters = resolveFilters(Object.fromEntries(request.nextUrl.searchParams))
  const { rows, error } = await fetchEvents(filters)
  if (error) {
    return new Response(`Lettura non riuscita: ${error.message}${error.hint ? `\n${error.hint}` : ''}`, {
      status: 500,
      headers: { ...BASE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const columns = COLUMNS.split(',')
  const lines = [columns.join(','), ...rows.map((r) => columns.map((c) => csvCell(r[c])).join(','))]
  const day = new Date().toISOString().slice(0, 10)
  const filename = `statistiche-${filters.env}-${filters.period}-${day}.csv`

  return new Response('﻿' + lines.join('\r\n') + '\r\n', {
    status: 200,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
