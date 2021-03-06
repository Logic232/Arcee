const { MessageType } = require("@adiwajshing/baileys");
const yts = require("yt-search");
const inputSanitization = require("../sidekick/input-sanitization");
const Strings = require("../lib/db");
const YT = Strings.yt;

module.exports = {
    name: "yt",
    description: YT.DESCRIPTION,
    extendedDescription: YT.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".yt Boston Dynamics Atlas" },
    async handle(client, chat, Arcee, args) {
        try {
            const keyword = await yts(args.join(" "));
            const videos = keyword.videos.slice(0, 10);
            var topRequests = "";
            var num = 1;
            var reply = await client.sendMessage(
                Arcee.chatId,
                YT.REPLY,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));

            videos.forEach(function (links) {
                topRequests =
                    topRequests +
                    `*${num}.)* ${links.title} (${links.timestamp}) | *${links.author.name}* | ${links.url}\n\n`;
                num++;
            });

            if (topRequests === "") {
                client.sendMessage(
                    Arcee.chatId,
                    YT.NO_VIDEOS,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                await client.deleteMessage(Arcee.chatId, {
                    id: reply.key.id,
                    remoteJid: Arcee.chatId,
                    fromMe: true,
                });
                return;
            }

            client.sendMessage(Arcee.chatId, topRequests, MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
            await client.deleteMessage(Arcee.chatId, {
                id: reply.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        } catch (err) {
            inputSanitization.handleError(err, client, Arcee, YT.NO_VIDEOS);
            await client.deleteMessage(Arcee.chatId, {
                id: reply.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
            return;
        }
    },
};
