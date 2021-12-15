const got = require("got");
const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const STRINGS = require("../lib/db");

module.exports = {
    name: "lyrics",
    description: STRINGS.lyrics.DESCRIPTION,
    extendedDescription: STRINGS.lyrics.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".lyrics love  to go " },
    async handle(client, chat, Arcee, args) {
        const processing = await client.sendMessage(
            Arcee.chatId,
            STRINGS.lyrics.PROCESSING,
            MessageType.text
        );
        try {
            var song = "";
            if (Arcee.isReply) {
                song = Arcee.replyMessage;
            } else if (args.length == 0) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.lyrics.NO_ARG,
                    MessageType.text
                );
                return;
            } else {
                song = args.join(" ");
            }
            let Response = await got(
                `https://some-random-api.ml/lyrics/?title=${song}`
            );
            let data = JSON.parse(Response.body);
            let caption =
                "*Title :* " +
                data.title +
                "\n*Author :* " +
                data.author +
                "\n*Lyrics :*\n" +
                data.lyrics;

            try {
                await client.sendMessage(
                    Arcee.chatId,
                    { url: data.thumbnail.genius },
                    MessageType.image,
                    {
                        mimetype: Mimetype.png,
                        caption: caption,
                        thumbnail: null,
                    }
                );
            } catch (err) {
                client.sendMessage(Arcee.chatId, caption, MessageType.text);
            }
            await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
            // return;
        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Arcee,
                STRINGS.lyrics.NOT_FOUND
            );
            return await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        }
    },
};
