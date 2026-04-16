let isNumber = (x) => typeof x === 'number' && !isNaN(x)

function initDB(m, client) {
  const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'

  const settings = global.db.data.settings[jid] ||= {}
  settings.self ??= false
  settings.prefijo ??= ['#',]
  settings.id ??= '120363425434939442@newsletter'
  settings.nameid ??= '✦͙͙͙ 🇪🇪 𝖡𝗈𝗍 𝖪𝖺𝗒𝗇'
  settings.link ??= 'https://wa.me/message/S75J4FMOHHTCH1'
  settings.banner ??= 'https://i.imgur.com/e1C1CH2.jpeg'
  settings.icon ??= 'https://i.imgur.com/DhiOyGX.jpeg'
  settings.namebot ??= '𝖡𝗈𝗍𝖪𝖺𝗒𝗇'
  settings.namebot2 ??=  𝖡𝗈𝗍𝖪𝖺𝗒𝗇'
  settings.owner ??= 'Kayn Necrohëk'
  settings.canal ??= 'https://whatsapp.com/channel/0029Vb6oawv9Gv7VNqOfQr1X'

  const user = global.db.data.users[m.sender] ||= {}
  user.name ??= ''
  user.usedcommands = isNumber(user.usedcommands) ? user.usedcommands : 0
  user.marry ??= ''
  user.birth ??= ''
  user.metadatos ??= null
  user.metadatos2 ??= null

  const chat = global.db.data.chats[m.chat] ||= {}
  chat.users ||= {}
  chat.bannedGrupo ??= false
  chat.welcome ??= true
  chat.alerts ??= true
  chat.rpg ??= true
  chat.adminonly ??= false
  chat.primaryBot ??= null
  chat.antilinks ??= true

  chat.users[m.sender] ||= {}
  user.stats = user.stats || {}
  user.usedTime = user.usedTime || null
}

export default initDB;
