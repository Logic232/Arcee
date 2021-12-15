const { MessageType } = require("@adiwajshing/baileys");
const translate = require("@vitalets/google-translate-api");
const inputSanitization = require("../sidekick/input-sanitization");
const STRINGS = require("../lib/db");
const format = require("python-format-js");

module.exports = {
    name: "tr",
    description: STRINGS.tr.DESCRIPTION,
    extendedDescription: STRINGS.tr.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".tr やめてください",
            ".tr how are you | hindi",
            ".tr how are you | hi",
        ],
    },
    async handle(client, chat, Arcee, args) {
        const processing = await client.sendMessage(
            Arcee.chatId,
            STRINGS.tr.PROCESSING,
            MessageType.text
        ).catch(err => inputSanitization.handleError(err, client, Arcee));
        try {
            var text = "";
            var language = "";
            if (args.length == 0) {
                await client.sendMessage(
                    Arcee.chatId,
                    STRINGS.tr.EXTENDED_DESCRIPTION,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return await client.deleteMessage(Arcee.chatId, {
                    id: processing.key.id,
                    remoteJid: Arcee.chatId,
                    fromMe: true,
                });
            }
            if (!Arcee.isReply) {
                try {
                    var body = Arcee.body.split("|");
                    text = body[0].replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    );
                    var i = 0;
                    while (body[1].split(" ")[i] == "") {
                        i++;
                    }
                    language = body[1].split(" ")[i];
                } catch (err) {
                    if (err instanceof TypeError) {
                        text = Arcee.body.replace(
                            Arcee.body[0] + Arcee.commandName + " ",
                            ""
                        );
                        language = "English";
                    }
                }
            } else if (Arcee.replyMessage) {
                text = Arcee.replyMessage;
                language = args[0];
            } else {
                await client.sendMessage(
                    Arcee.chatId,
                    STRINGS.tr.INVALID_REPLY,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return await client.deleteMessage(Arcee.chatId, {
                    id: processing.key.id,
                    remoteJid: Arcee.chatId,
                    fromMe: true,
                });
            }
            if (text.length > 4000) {
                await client.sendMessage(
                    Arcee.chatId,
                    STRINGS.tr.TOO_LONG.format(text.length),
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return await client.deleteMessage(Arcee.chatId, {
                    id: processing.key.id,
                    remoteJid: Arcee.chatId,
                    fromMe: true,
                });
            }
            await translate(text, {
                to: language,
            })
                .then((res) => {
                    client.sendMessage(
                        Arcee.chatId,
                        STRINGS.tr.SUCCESS.format(
                            res.from.language.iso,
                            language,
                            res.text
                        ),
                        MessageType.text
                    );
                })
                .catch((err) => {
                    inputSanitization.handleError(
                        err,
                        client,
                        Arcee,
                        STRINGS.tr.LANGUAGE_NOT_SUPPORTED
                    );
                });
            return await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        } catch (err) {
            inputSanitization.handleError(err, client, Arcee);
        }
    },
};
