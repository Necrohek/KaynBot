import fs from 'fs';
import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'

global.owner = ['523115194331']
global.sessionName = 'Sessions/Owner'
global.version = '^2.0'
global.timeout = 10000

// No olvides sacar tu apikey de cada api!

global.api = {
  url: 'https://api.evogb.org',
  url2: 'https://api.stellarwa.xyz',
  url3: 'https://sylphy.xyz',
  key: '', 
  key2: '', 
  key3: ''
}

global.bot = {
  api: 'https://api.stellarwa.xyz',
  web: ' https://wa.me/message/S75J4FMOHHTCH1'
}

global.mods = ['523115194331']

global.msgglobal = '[Error: *TypeError*] fetch failed'
globalThis.dev = ' Kayn Necrohëk'

global.mess = {
  socket: ' ✖️ Este comando solo puede ser ejecutado por un Socket.',
  admin: ' ✖️ Este comando solo puede ser ejecutado por los Administradores del Grupo.',
  botAdmin: ' ✖️ Este comando solo puede ser ejecutado si el Socket es Administrador del Grupo.'
}

global.my = {
  ch: ' https://wa.me/message/S75J4FMOHHTCH1',
  name: ' Kayn Necrohëk'
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log('[ Hot Reload ] settings.js actualizado')
  import(`${file}?update=${Date.now()}`).catch(console.error)
})
