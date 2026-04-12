export default {
  command: ['tagall', 'todos'],
  category: 'grupo',
  isAdmin: true,
  run: async (client, m, args) => {
    const text = args.join(' ')
    const groupMetadata = m.isGroup
      ? await client.groupMetadata(m.chat).catch(() => null)
      : null

    const participants = groupMetadata?.participants || []

    if (!m.isGroup) {
      return m.reply('🇪🇪 Este comando es solo para grupos.')
    }

    if (!participants.length) {
      return m.reply('✖️ No se pudieron obtener los participantes.')
    }

    // Obtener IDs válidos
    const mentions = participants
      .map(p => p.jid || p.id || p.lid || p.phoneNumber)
      .filter(Boolean)
      .map(id => client.decodeJid(id))

    // Construir lista visible
    const list = mentions
      .map(u => `✦֗ㅤ @${u.split('@')[0]}`)
      .join('\n')

    const message = `*ㅤㅤㅤ𖧹ㅤㅤㅤ ATENCIÓN.*
ㅤㅤㅤㅤㅤㅤ🇪🇪 𝖡𝗈𝗍 𝖪𝖺𝗒𝗇.

> ㅤㅤ${text || 'Sin mensaje.'}

ㅤㅤㅤㅤַָּ֢ٜㅤㅤ    ㅤㅤּ⬪⬧⬪ּㅤㅤ    ㅤㅤַָּ֢ٜㅤㅤㅤ

${list}
ㅤ`

    try {
      await client.sendMessage(
        m.chat,
        {
          text: message,
          mentions
        },
        { quoted: m }
      )
    } catch (e) {
      m.reply('✖️ Error al ejecutar el comando.')
    }
  }
}
