
import fg from 'api-dylux'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
let limit = 350
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
	if (!args || !args[0]) throw `✳️ උදා :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
    if (!args[0].match(/youtu/gi)) throw `❎ වලංගු ලින්ක් එකක් නොවේ.`
	 let chat = global.db.data.chats[m.chat]
	 m.react(rwait) 
	try {
		let q = args[1] || '360p'
		let v = args[0]
		const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)).catch(async () => await youtubedlv3(v))
		const dl_url = await yt.video[q].download()
		const title = await yt.title
		const size = await yt.video[q].fileSizeH 
		
       if (size.split('MB')[0] >= limit) return m.reply(` ≡  *PASI YTDL*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️quality* : ${q}\n\n▢ _මෙම වීඩියෝව බාගත කිරීමේ සීමාව ඉක්මවා ඇත. *+${limit} MB*`)    
	  conn.sendFile(m.chat, dl_url, title + '.mp4', `
 ≡  *⍤⃝᳇ρ̶ͥαᷧѕⷨι͜и∂υ❤️⟧➳̶̶̶̶͟͞ YTDL*
  
▢ *📌Títle* : ${title}
▢ *📟 Ext* : mp4
▢ *🎞️Quality* : ${q}
▢ *⚖️Size* : ${size}
`.trim(), m, false, { asDocument: chat.useDocument })
		m.react(done) 
		
	} catch {
		
		const { title, result, quality, size, duration, thumb, channel } = await fg.ytv(args[0]) 
		if (size.split('MB')[0] >= limit) return m.reply(` ≡  *⍤⃝᳇ρ̶ͥαᷧѕⷨι͜и∂υ❤️⟧➳̶̶̶̶͟͞ YTDL2*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️Quality* : ${quality}\n\n▢ _මෙම වීඩියෝව බාගත කිරිමේ සීමාව ඉක්මවා ඇත_ *+${limit} MB*`)
	conn.sendFile(m.chat, result, title + '.mp4', `
 ≡  *⍤⃝᳇ρ̶ͥαᷧѕⷨι͜и∂υ❤️⟧➳̶̶̶̶͟͞ YTDL2*
  
▢ *📌Títle* : ${title}
▢ *📟 Ext* : mp4
▢ *⚖️size* : ${size}
`.trim(), m, false, { asDocument: chat.useDocument })
		m.react(done) 
	} 
		 
}
handler.help = ['ytmp4 <link yt>']
handler.tags = ['dl'] 
handler.command = ['ytmp4', 'video']
handler.diamond = true

export default handler
