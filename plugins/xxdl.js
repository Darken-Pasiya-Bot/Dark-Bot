
import fetch from 'node-fetch'
import fg from 'api-dylux'
let handler = async (m, { conn, args, text, usedPrefix, command }) => {

 let chat = global.db.data.chats[m.chat]
  if (!chat.nsfw) throw `🚫 දැනට මෙම ගෘපය තුල මේ සඳහා අවසර නැත. \n\nඔන් කිරීමට  \n*${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 17) throw `❎ වැල් බලන්න උබට වයස මදි😂. 18 වෙලා වරෙන් `
  if (!text) throw `✳️ සර්ච් කරන්න අවශ්‍ය කුමක්ද ?\n📌 Use : *${usedPrefix + command} <search>*\n\n*උදා*:- Hot desi girl \n ලින්ක් එක තියෙනව නම වීඩියෝ එක ඩව්න්ලෝඩ් කරන්න මෙහෙම.\nExample .xnxx (link) *`
    
    m.react(rwait)
    if (text.includes('http://') || text.includes('https://')) {
        if (!text.includes('xnxx.com')) return m.reply(`❎ *xnxx.com* එකේ ලින්ක් එකක් දීපන් 😒`)
        try {
            let xn = await (await fetch(global.API('fgmods', '/api/dowloader/xnxxdl', { url: text }, 'apikey'))).json()
            conn.sendFile(m.chat, xn.result.files.high, xn.result.title + '.mp4', `
≡  *XNXX DOWNLOAD*
            
▢ *📌Title*: ${xn.result.title}
▢ *⌚Duration:* ${xn.result.duration}
▢ *🎞️Quality:* ${xn.result.quality}
`.trim(), m, false, { asDocument: chat.useDocument })
 m.react('👙')
 } catch (e) {
    m.reply(`🔴 Error : we are trying hard to fix`)
 }
    } else {
        try {
            let res = await fetch(global.API('fgmods', '/api/search/xnxxsearch', { text }, 'apikey'))
            let json = await res.json()
             let listSections = []
              Object.values(json.result).map((v, index) => {
              listSections.push([`${index}┃ ${v.title}`, [
                    ['🎥 MP4', `${usedPrefix}xnxx ${v.link}`, `▢ 📌 *Title* : ${v.title}`]
                  ]])
              })
              //return conn.sendList(m.chat, '  ≡ *XNXX DL*🔎', `\n 🔞 Results:\n *${text}*`, fgig, `Click Here`, listSections, m)
              let ff = json.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n`).join('\n') 
              if (json.status) m.reply(ff)
            } catch (e) {
              m.reply(`🔴 Error: we are trying hard to fix it`)
               }
    }
}
handler.help = ['xnxx'] 
handler.tags = ['nsfw', 'prem']
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'] 
handler.diamond = false
handler.premium = false
handler.register = true

export default handler
