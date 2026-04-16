import ws from 'ws';
import moment from 'moment';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import seeCommands from './lib/system/commandLoader.js';
import initDB from './lib/system/initDB.js';
import antilink from './commands/antilink.js';
import level from './commands/level.js';
import { getGroupAdmins } from './lib/message.js';

seeCommands()

export default async (client, m) => {
  if (!m.message) return

  const sender = m.sender 

  let body =
    m.message.conversation ||
    m.message.extendedTextMessage?.text ||
    m.message.imageMessage?.caption ||
    m.message.videoMessage?.caption ||
    m.message.buttonsResponseMessage?.selectedButtonId ||
    m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
    m.message.templateButtonReplyMessage?.selectedId ||
    ''

  if ((m.id.startsWith("3EB0") || (m.id.startsWith("BAE5") && m.id.length === 16) || (m.id.startsWith("B24E") && m.id.length === 20))) return

  initDB(m, client)
  antilink(client, m)

  const from = m.key.remoteJid
  const idDD = client.user.id.split(':')[0] + "@s.whatsapp.net" || ''
  const rawPrefijo = global.db.data.settings[idDD].prefijo || ''
  const prefas = Array.isArray(rawPrefijo) ? rawPrefijo : rawPrefijo ? [rawPrefijo] : ['#', '/', '.']

  const rawBotname = global.db.data.settings[idDD].namebot2 || 'KaynBot'
  const tipo = global.db.data.settings[idDD].type || 'Sub'

  const isValidBotname = /^[\w\s]+$/.test(rawBotname)
  const botname2 = isValidBotname ? rawBotname : 'San'

  const shortForms = [
    botname2.charAt(0),
    botname2.split(" ")[0],
    tipo.split(" ")[0],
    botname2.split(" ")[0].slice(0, 2),
    botname2.split(" ")[0].slice(0, 3)
  ]

  const prefixes = shortForms.map(name => `${name}`)
  prefixes.unshift(botname2)

  const prefixo = prefas.join('')
  globalThis.prefix = new RegExp(`^(${prefixes.join('|')})?[${prefixo}]`, 'i')

  const prefixMatch = body.match(globalThis.prefix)
  const prefix = prefixMatch ? prefixMatch[0] : null

  const tf = global.db.data.chats[from].users[m.sender] || {}
  const to = new Date().toLocaleDateString('es-CO', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-') 

  if (!tf.stats) tf.stats = {}
  if (!tf.stats[to]) tf.stats[to] = { msgs: 0, cmds: 0 }
  tf.stats[to].msgs++

  if (!prefix) return

  const args = body.slice(prefix.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase()
  const text = args.join(' ')

  const pushname = m.pushName || 'Sin nombre'
  const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
  const chat = global.db.data.chats[m.chat] || {}

  let groupMetadata = null
  let groupAdmins = []
  let groupName = ''

  if (!global.groupCache) global.groupCache = {}

  if (m.isGroup) {
    const cache = global.groupCache[m.chat]

    if (cache && (Date.now() - cache.time < 5 * 60 * 1000)) {
      groupMetadata = cache.data
    } else {
      groupMetadata = await client.groupMetadata(m.chat).catch(() => null)
      if (groupMetadata) {
        global.groupCache[m.chat] = {
          data: groupMetadata,
          time: Date.now()
        }
      }
    }

    groupName = groupMetadata?.subject || ''
    groupAdmins = groupMetadata?.participants?.filter(p =>
      p.admin === 'admin' || p.admin === 'superadmin'
    ) || []
  }

  const isBotAdmins = m.isGroup ? groupAdmins.some(p => p.id === botJid) : false
  const isAdmins = m.isGroup ? groupAdmins.some(p => p.id === sender) : false

  const fromprimary = global.db.data.chats[from];
  const consolePrimary = fromprimary.primaryBot;

  if (!consolePrimary || consolePrimary === botJid) {
    console.log(`BOT: ${client.user.id} | USER: ${pushname} | GROUP: ${groupName}`)
  }

  const prefixxy = ['/', '#', '!', '-', '+', '.']
  const hasPrefix = prefixxy.some(prefix => m.text?.startsWith(prefix))

  // 🔧 FIX: función limpia sin duplicados
  if (!global.sessionCache) global.sessionCache = { data: [], time: 0 }

  function getAllSessionBots() {
    if (Date.now() - global.sessionCache.time < 60 * 1000) {
      return global.sessionCache.data
    }

    const sessionDirs = ['./Sessions/Subs']
    let bots = []

    for (const dir of sessionDirs) {
      try {
        const subDirs = fs.readdirSync(path.resolve(dir))
        for (const sub of subDirs) {
          const credsPath = path.resolve(dir, sub, 'creds.json')
          if (fs.existsSync(credsPath)) {
            bots.push(sub + '@s.whatsapp.net')
          }
        }
      } catch {}
    }

    try {
      const ownerCreds = path.resolve('./Sessions/Owner/creds.json')
      if (fs.existsSync(ownerCreds)) {
        bots.push(botJid)
      }
    } catch {}

    global.sessionCache = {
      data: bots,
      time: Date.now()
    }

    return bots
  }

  const chatData = global.db.data.chats[m.chat]
  const botprimaryId = chatData?.primaryBot
  const selfId = botJid

  if (botprimaryId && botprimaryId !== selfId && hasPrefix) {
    let participants = []

    if (m.isGroup) {
      const metadata = await client.groupMetadata(m.chat).catch(() => ({ participants: [] }))
      participants = metadata.participants || []
    }

    const primaryInGroup = participants.some(p => (p.id === botprimaryId))
    const primaryInSessions = getAllSessionBots().includes(botprimaryId)

    if (!primaryInSessions || !primaryInGroup) return
    if ((primaryInSessions && primaryInGroup)) return
  }

  const isVotOwn = [
    botJid,
    ...global.owner.map(num => num + '@s.whatsapp.net')
  ].includes(sender)

  if (global.db.data.settings[selfId].self) {
    const owner = global.db.data.settings[selfId].owner
    if (sender !== owner && !isVotOwn) return
  }

  const user = global.db.data.chats[m.chat].users[m.sender] || {}

  const today = new Date().toLocaleDateString('es-CO', { 
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).split('/').reverse().join('-') 

  if (!user.stats) user.stats = {}
  if (!user.stats[today]) user.stats[today] = { msgs: 0, cmds: 0 }

  const cmdData = global.comandos.get(command)

  if (!cmdData) {
    await client.readMessages([m.key])
    return m.reply(`✖️ El comando *${command}* no existe.`)
  }

  try {
    await client.readMessages([m.key])
    user.stats[today].cmds++
    await cmdData.run(client, m, args, command, text, prefix)
  } catch (error) {
    console.error('CMD ERROR:', error)
    return m.reply('✖️ Error al ejecutar el comando.')
  }

  level(m)
}
