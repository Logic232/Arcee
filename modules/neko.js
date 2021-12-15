const { MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const String = require("../lib/db.js");
const got = require("got");
const REPLY = String.neko;
module.exports = {
    name: "neko",
    description: REPLY.DESCRIPTION,
    extendedDescription: REPLY.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: '.neko #include <iostream> \nint main() \n{\n   std::cout << "Hello Arcee!"; \n   return 0;\n}',
    },
    async handle(client, chat, Arcee, args) {
        try {
            if (args.length === 0 && !Arcee.isReply) {
                await client.sendMessage(
                    Arcee.chatId,
                    REPLY.ENTER_TEXT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            const processing = await client.sendMessage(
                Arcee.chatId,
                REPLY.PROCESSING,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
            if (!Arcee.isReply) {
                var json = {
                    content: Arcee.body.replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    ),
                };
            } else {
                var json = {
                    content: Arcee.replyMessage.replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    ),
                };
            }
            let text = await got.post("https://nekobin.com/api/documents", {
                json,
            });
            json = JSON.parse(text.body);
            neko_url = "https://nekobin.com/" + json.result.key;
            client.sendMessage(Arcee.chatId, neko_url, MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
            return await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            }).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            if (json.result == undefined) {
                await inputSanitization.handleError(
                    err,
                    client,
                    Arcee,
                    REPLY.TRY_LATER
                );
            } else {
                await inputSanitization.handleError(err, client, Arcee);
            }
            return await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            }).catch(err => inputSanitization.handleError(err, client, Arcee));
        }
    },
};
