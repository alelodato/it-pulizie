#!/usr/bin/env node
// Controlla la coerenza del contenitore GTM da importare:
// - ogni {{variabile}} usata da tag, trigger e variabili è definita
//   (variabili utente, variabili integrate attivate o variabili interne di GTM)
// - ogni trigger usato dai tag (attivazione o blocco) esiste
// - nomi e ID non duplicati
// Uso: node gtm/check-container.js [percorso-json]

const fs = require('fs')
const path = require('path')

const file = process.argv[2] || path.join(__dirname, 'gtm-itpulizie-container.json')
const json = JSON.parse(fs.readFileSync(file, 'utf8'))
const errors = []

if (json.exportFormatVersion !== 2) errors.push('exportFormatVersion deve essere 2')
const cv = json.containerVersion
if (!cv) {
  console.error('containerVersion mancante')
  process.exit(1)
}

const tags = cv.tag || []
const triggers = cv.trigger || []
const variables = cv.variable || []
const builtIns = cv.builtInVariable || []

// Trigger integrati di GTM (non compaiono nell'export)
const BUILT_IN_TRIGGERS = {
  2147479553: 'All Pages',
  2147479572: 'Consent Initialization - All Pages',
  2147479573: 'Initialization - All Pages',
}
// Variabili interne sempre disponibili (es. {{_event}} nei filtri evento)
const INTERNAL_VARIABLES = new Set(['_event', '_url', '_triggers'])

function checkDuplicates(list, key, label) {
  const seen = new Set()
  list.forEach((item) => {
    if (seen.has(item[key])) errors.push(`${label} duplicato: ${item[key]}`)
    seen.add(item[key])
  })
}
checkDuplicates(tags, 'name', 'Nome tag')
checkDuplicates(tags, 'tagId', 'ID tag')
checkDuplicates(triggers, 'name', 'Nome trigger')
checkDuplicates(triggers, 'triggerId', 'ID trigger')
checkDuplicates([...variables, ...builtIns], 'name', 'Nome variabile')
checkDuplicates(variables, 'variableId', 'ID variabile')

const definedVars = new Set([...variables.map((v) => v.name), ...builtIns.map((v) => v.name)])
const triggerIds = new Set(triggers.map((t) => t.triggerId))

function collectRefs(node, where, out) {
  if (typeof node === 'string') {
    for (const m of node.matchAll(/\{\{([^{}]+)\}\}/g)) out.push({ name: m[1], where })
  } else if (Array.isArray(node)) {
    node.forEach((n) => collectRefs(n, where, out))
  } else if (node && typeof node === 'object') {
    Object.values(node).forEach((n) => collectRefs(n, where, out))
  }
}

const refs = []
tags.forEach((t) => collectRefs(t.parameter, `tag "${t.name}"`, refs))
triggers.forEach((t) => collectRefs(t, `trigger "${t.name}"`, refs))
variables.forEach((v) => collectRefs(v.parameter, `variabile "${v.name}"`, refs))

refs.forEach(({ name, where }) => {
  if (!definedVars.has(name) && !INTERNAL_VARIABLES.has(name)) {
    errors.push(`{{${name}}} usata in ${where} ma non definita`)
  }
})

tags.forEach((t) => {
  const firing = t.firingTriggerId || []
  if (firing.length === 0) errors.push(`tag "${t.name}" senza trigger di attivazione`)
  ;[...firing, ...(t.blockingTriggerId || [])].forEach((id) => {
    if (!triggerIds.has(id) && !BUILT_IN_TRIGGERS[id]) {
      errors.push(`tag "${t.name}" usa il trigger ${id} che non esiste`)
    }
  })
})

// Trigger definiti ma non usati da nessun tag (solo avviso)
const usedTriggerIds = new Set(tags.flatMap((t) => [...(t.firingTriggerId || []), ...(t.blockingTriggerId || [])]))
const warnings = triggers.filter((t) => !usedTriggerIds.has(t.triggerId)).map((t) => `trigger "${t.name}" non usato`)

console.log(`Contenitore: ${path.relative(process.cwd(), file)}`)
console.log(`  ${tags.length} tag, ${triggers.length} trigger, ${variables.length} variabili, ${builtIns.length} variabili integrate`)
console.log(`  ${refs.length} riferimenti {{...}} controllati`)
tags.forEach((t) => {
  const names = (t.firingTriggerId || []).map((id) => BUILT_IN_TRIGGERS[id] || triggers.find((x) => x.triggerId === id)?.name)
  console.log(`  - ${t.name} [${t.type}] → ${names.join(', ')}`)
})
warnings.forEach((w) => console.warn(`AVVISO: ${w}`))

if (errors.length) {
  errors.forEach((e) => console.error(`ERRORE: ${e}`))
  process.exit(1)
}
console.log('OK: tutte le variabili e i trigger usati sono definiti.')
