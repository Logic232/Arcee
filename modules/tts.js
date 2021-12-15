const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const format = require('python-format-js');
const googleTTS = require('google-tts-api');
const STRINGS = require("../lib/db.js");

module.exports = {
    name: "tts",
    description: STRINGS.tts.DESCRIPTION,
    extendedDescription: STRINGS.tts.EXTENDED_DESCRIPTION,
    demo: {isEnabled: true, text: ['.tts やめてください', '.tts やめてください | ja']},
    async handle(client, chat, Arcee, args) {
        const proccessing = await client.sendMessage(Arcee.chatId, STRINGS.tts.PROCESSING, MessageType.text);
        let text = '';
        let langCode = "en";
        for (var i = 0; i < args.length; i++) {
            if (args[i] == '|') {
                langCode = args[i + 1];
                break;
            }
            text += args[i] + " ";
        }
        if(text === ""){
            await client.sendMessage(Arcee.chatId, STRINGS.tts.NO_INPUT, MessageType.text);
            return await client.deleteMessage(Arcee.chatId, { id: proccessing.key.id, remoteJid: Arcee.chatId, fromMe: true });
        }
        if(text.length > 200){
            await client.sendMessage(Arcee.chatId, STRINGS.tts.TOO_LONG.format(text.length), MessageType.text);
        }else{
            try {
                const url = googleTTS.getAudioUrl(text, {
                    lang: langCode,
                    slow: false,
                    host: 'https://translate.google.com',
                });
                // console.log(url);
                await client.sendMessage(Arcee.chatId, { url: url }, MessageType.audio, { mimetype: Mimetype.mp4Audio });
            }
            catch (err) {
                // console.log(err);
            }
        }
        return await client.deleteMessage (Arcee.chatId, {id: proccessing.key.id, remoteJid: Arcee.chatId, fromMe: true});
    }
}