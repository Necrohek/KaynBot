export default {
  command: ['self'],
  category: 'socket',
  run: async (client, m, args) => {
    const idBot = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]
    const isOwner2 = [
      idBot,
      ...globalThis.owner.map((number) => number + '@s.whatsapp.net'),
    ].includes(m.sender)
    if (!isOwner2 && m.sender !== owner) {
      return m.reply(mess.socket)
    }
    const chat = global.db.data.settings[client.user.id.split(':')[0] + '@s.whatsapp.net']
    const estado = chat.self ?? false

    if (args[0] === 'enable' || args[0] === 'on') {
      if (estado) return m.reply('🇪🇪 El modo *self* ya estaba activado.')
      chat.self = true
      return m.reply('✔️ Has *activado* el modo *Self*.')
    }

    if (args[0] === 'disable' || args[0] === 'off') {
      if (!estado) return m.reply('🇪🇪 El modo *self* ya estaba desactivado.')
      chat.self = false
      return m.reply('✔️ Has *desactivado* el modo *privado*.')
    }

    return m.reply(
      `*ㅤ♱𝆬ㅤ Self*\n*ㅤ♱𝆬ㅤEstado ›* ${estado ? '✔️ Activado' : '✖️ Desactivado'}\n\nㅤ𓆰ㅤׂㅤ Puedes cambiarlo con:\n> ㅤ𓆰ㅤׂㅤ _Activar ›_ *self enable*\n> ㅤ𓆰ㅤׂㅤ _Desactivar ›_ *self disable*`,
    )
  },
};
