import fs from 'fs';
import os from 'os';

function getDefaultHostId() {
  if (process.env.HOSTNAME) {
    return process.env.HOSTNAME.split('-')[0]
  }
  return 'default_host_id'
}

export default {
  command: ['status'],
  category: 'info',
  run: async (client, m) => {

    const hostId = getDefaultHostId()
    const registeredGroups = global.db.data.chats ? Object.keys(global.db.data.chats).length : 0
    const botId = client.user.id.split(':')[0] + "@s.whatsapp.net" || false
    const botSettings = global.db.data.settings[botId] || {}

    const botname = botSettings.namebot || 'Ai Surus'
    const comandos = botSettings.commandsejecut || '0'
    const botname2 = botSettings.namebot2 || 'Surus'
    const userCount = Object.keys(global.db.data.users).length || '0'

    const estadoBot = 
`ㅤㅤㅤ ㅤ ㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜㅤㅤㅤ
ㅤ🇪🇪ㅤㅤ 𝖤𝗌𝗍𝖺𝗍𝗎𝗌 :: *${botname2}*

✦֗ㅤ Usuarios registrados: *${userCount.toLocaleString()}*
✦֗ㅤ Grupos registrados: *${registeredGroups.toLocaleString()}*
✦֗ㅤ Cmd Ejec: *${comando.toLocaleString()}*

ㅤ ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜

ㅤּㅤخبׅ𝓲ㅤׂㅤ Sistema: *${sistema}*
ㅤּㅤخبׅ𝓲ㅤׂㅤ Cpu: *${cpu} cores*
ㅤּㅤخبׅ𝓲ㅤׂㅤ Ram: *${ramTotal} GB*
ㅤּㅤخبׅ𝓲ㅤׂㅤ Ram usado: *${ramUsada} GB*
ㅤּㅤخبׅ𝓲ㅤׂㅤ Arquitectura: *${arquitectura}*
ㅤּㅤخبׅ𝓲ㅤׂㅤ Host ID: *${hostId}*

ㅤ ㅤּٜٜ۬ׄ͜ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ ㅤㅤㅤㅤㅤㅤㅤㅤㅤּٜٜ۬ׄ͜`

        await client.sendContextInfoIndex(m.chat, message, {}, m, true, {})
  }
};
