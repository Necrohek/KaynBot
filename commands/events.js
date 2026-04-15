import chalk from 'chalk'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

export default async (client, m) => {
  client.ev.on('group-participants.update', async (anu) => {
    try {
      const metadata = await client.groupMetadata(anu.id) || {}
      const chat = global.db.data.chats[anu.id]
      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'

      const primaryBotId = chat?.primaryBot || ''

      const botSettings = global.db.data.settings[botId]
      const isSelf = botSettings?.self
      if (isSelf) return

      const now = new Date()
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
      const tiempo = colombianTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/,/g, '')
      const tiempo2 = moment.tz('America/Bogota').format('hh:mm A')

      const memberCount = metadata.participants?.length || 0
      const groupIcon = await client.profilePictureUrl(anu.id, 'image').catch(_ => 'https://i.imgur.com/DhiOyGX.jpeg')

      for (const p of anu.participants) {
        const phone = p.phoneNumber ? p.phoneNumber.split('@')[0] : ''
        const name = global.db.data.users[p.phoneNumber].name || ''
        const avatar = await client.profilePictureUrl(p.phoneNumber, 'image').catch(_ => ' https://i.imgur.com/DhiOyGX.jpeg')

        const fakeContext = {
          contextInfo: {        
            externalAdReply: {
              title: botSettings.namebot || '',
              body: dev,
              mediaUrl: null,
              description: null,
              previewType: 'PHOTO',
              thumbnailUrl: botSettings.icon || '',
              sourceUrl: botSettings.link || '',
              mediaType: 1,
              renderLargerThumbnail: false
            },
            mentionedJid: [p.phoneNumber]
          }
        }

        if (anu.action === 'add' && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {
          let caption
          if (chat.welcomeMessage && chat.welcomeMessage.trim() !== '') {
            caption = chat.welcomeMessage
              .replace(/@user/g, `@${phone}`)
              .replace(/@group/g, metadata.subject || '')
              .replace(/@desc/g, metadata.desc || 'Sin descripción')
              .replace(/@members/g, memberCount)
              .replace(/@time/g, `${tiempo} ${tiempo2}`)
          } else {
            caption = `ㅤㅤㅤㅤㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜ
ㅤㅤㅤㅤㅤ *🇪🇪ㅤㅤ Bienvenido*
ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜
✦֗ㅤ   *Usuario ›* @${phone}
✦֗ㅤ   *Grupo ›* ${metadata.subject || ''}
ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜ 
𓉰. *Usa /menu para ver los comandos.*
𓉰. *Ahora somos ${memberCount} miembros.*
ㅤㅤㅤㅤㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜ`
          }
          const apiUrl = `${api.url2}/generate/welcome-image?username=${name}&guildName=${metadata.subject || ''}&guildIcon=${encodeURIComponent(avatar)}&memberCount=${memberCount}&avatar=${encodeURIComponent(groupIcon)}&background=${encodeURIComponent (botSettings.banner)}`
          const res = await fetch(apiUrl)
          const contentType = res.headers.get('content-type') || ''
          if (!contentType.startsWith('image/')) {
            console.log('Error: la API devolvió', contentType)
            return
          }
          const buffer = Buffer.from(await res.arrayBuffer())
          await client.sendMessage(anu.id, { image: buffer, caption, ...fakeContext })
        }

        if ((anu.action === 'remove' || anu.action === 'leave') && chat?.goodbye && (!primaryBotId || primaryBotId === botId)) {
          let caption
          if (chat.byeMessage && chat.byeMessage.trim() !== '') {
            caption = chat.byeMessage
              .replace(/@user/g, `@${phone}`)
              .replace(/@group/g, metadata.subject || '')
              .replace(/@desc/g, metadata.desc || 'Sin descripción')
              .replace(/@members/g, memberCount)
              .replace(/@time/g, `${tiempo} ${tiempo2}`)
          } else {
            caption = `ㅤㅤㅤㅤㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜ
ㅤㅤㅤㅤㅤ *🇪🇪ㅤㅤ Nos vemos, adiós*
ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜
✦֗ㅤ   *Nombre ›* @${phone}
ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜

𓉰.  *Ojalá que vuelva pronto.*
𓉰.  *Ahora somos ${memberCount} miembros.*
ㅤㅤㅤㅤㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜ`
          }
          const apiUrl = `${api.url2}/generate/bye-image?username=${encodeURIComponent(name)}&guildName=${encodeURIComponent(metadata.subject || '')}&guildIcon=${encodeURIComponent(avatar)}&memberCount=${memberCount}&avatar=${encodeURIComponent(groupIcon)}&background=${botSettings.banner}`
          const res = await fetch(apiUrl)
          const contentType = res.headers.get('content-type') || ''
          if (!contentType.startsWith('image/')) {
            console.log('Error: la API devolvió', contentType)
            return
          }
          const buffer = Buffer.from(await res.arrayBuffer())
          await client.sendMessage(anu.id, { image: buffer, caption, ...fakeContext })
        }

        if (anu.action === 'promote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author || ''
          await client.sendMessage(anu.id, {
            text: `ㅤㅤ ٛٛㅤㅤㅤㅤㅤㅤ𒑖ㅤㅤㅤㅤㅤㅤٛٛ
ㅤ۪݂ㅤ𓆰ㅤׂㅤ *@${phone}* ha sido promovido a administrador por *@${usuario.split('@')[0]}.*`,
            mentions: [p.phoneNumber, usuario]
          })
        }

        if (anu.action === 'demote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author || ''
          await client.sendMessage(anu.id, {
            text: `ㅤㅤ ٛٛㅤㅤㅤㅤㅤㅤ𒑖ㅤㅤㅤㅤㅤㅤٛٛ
ㅤ۪݂ㅤ𓆰ㅤׂㅤ *@${phone}* ha sido degradado de Administrador por *@${usuario.split('@')[0]}.*`,
            mentions: [p.phoneNumber, usuario]
          })
        }
      }
    } catch (err) {
      console.log(chalk.gray(`[ EVENT ] → ${err}`))
    }
  })
}
