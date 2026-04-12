import fetch from 'node-fetch';
import { safeFetch } from '../lib/safeFetch.js';

export default {
  command: ['tiktok', 'tt'],
  category: 'downloader',
  run: async (client, m, args, command) => {

    if (!args.length) {
      return m.reply(`🇪🇪 Ingresa un *término* o *enlace* de TikTok.`)
    }

    const urls = args.filter(arg => arg.includes("tiktok.com"))

    if (urls.length) {
      for (const url of urls) {
        try {
          const apiUrl = `${api.url2}/dl/tiktok?url=${url}&key=${api.key2}`
          const res = await safeFetch(apiUrl)
          if (!res.ok) throw new Error(`El servidor respondió con ${res.status}`)
          const json = await res.json()

          const data = json.data
          if (!data) {
            await m.reply(`✖️ No se encontraron resultados para: ${url}`)
            continue
          }

          const {
            title = 'Sin título',
            dl,
            duration,
            author = {},
            stats = {},
            music = {},
          } = data

          const caption = `ㅤㅤ 〔ㅤㅤㅤㅤㅤ *⬚⬚* ㅤㅤㅤㅤㅤ〕
ㅤ ㅤ 𖩇ㅤㅤㅤㅤ *𝖳𝖨𝖪𝖳𝖮𝖪* ㅤㅤㅤㅤ𖩉

ㅤ ┝ㅤ Título: ${tittle}
ㅤ ┝ㅤ Autor: ${author.nickname || author.unique id || 'desconocido'}
ㅤ ┝ㅤ Duración: ${duration || 'N/A'}
ㅤ ┝ㅤ Likes: ${stats.likes || 0).toLocaleString()}
ㅤ ┝ㅤ Audio: ${music.tittle ? music.tittle +' -' : 'Desconocido'} ${música.author || ''}`.trim()
 
         const head = await fetch(dl, { method: 'HEAD' })
          const contentType = head.headers.get('content-type') || '' 

          if (contentType.includes('video')) {
            await client.sendMessage(m.chat, { video: { url: dl }, caption }, { quoted: m })
          } else {
            await m.reply(`✖️ El contenido de ${url} no es *compatible*.`)
          }
        } catch (e) {
          //console.error(e)
          await m.reply(msgglobal + e)
        }
      }
    } else {
      const query = args.join(" ")
      try {
        const apiUrl = `${api.url2}/search/tiktok?query=${encodeURIComponent(query)}&key=${api.key2}`
        const res = await safeFetch(apiUrl)
        if (!res.ok) throw new Error(`El servidor respondió con ${res.status}`)
        const json = await res.json()

        const data = json.data?.[0]
        if (!data) {
          return m.reply(`✖️ No se encontraron resultados para: ${query}`)
        }

        const {
          title = 'Sin título',
          dl,
          duration,
          author = {},
          stats = {},
          music = {},
        } = data

        const caption = `ㅤㅤ 〔ㅤㅤㅤㅤㅤ ⬚⬚ ㅤㅤㅤㅤㅤ〕
ㅤ ㅤ 𖩇ㅤㅤㅤㅤ 𝖳𝖨𝖪𝖳𝖮𝖪 ㅤㅤㅤㅤ𖩉

ㅤ ┝ㅤ Título: ${tittle}
ㅤ ┝ㅤ Autor: ${author.nickname || author.unique id || 'desconocido'}
ㅤ ┝ㅤ Duración: ${duration || 'N/A'}
ㅤ ┝ㅤ Likes: ${stats.likes || 0).toLocaleString()}
ㅤ ┝ㅤ Audio: ${music.tittle ? music.tittle +' -' : 'Desconocido'} ${música.author || ''}`.trim()

        const head = await fetch(dl, { method: 'HEAD' })
        const contentType = head.headers.get('content-type') || ''

        if (contentType.includes('video')) {
          return client.sendMessage(m.chat, { video: { url: dl }, caption }, { quoted: m })
        }

        return m.reply('✖️ El contenido no es *compatible*.')
      } catch (e) {
        // console.error(e)
        m.reply(msgglobal + e)
      }
    }
  },
};
