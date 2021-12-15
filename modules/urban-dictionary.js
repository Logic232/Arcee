const got = require("got");
const { MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const STRINGS = require("../lib/db");
const format = require("python-format-js");
const ud = require("urban-dictionary");

module.exports = {
    name: "ud",
    description: STRINGS.ud.DESCRIPTION,
    extendedDescription: STRINGS.ud.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".ud bruh" },
    async handle(client, chat, Arcee, args) {
        const processing = await client.sendMessage(
            Arcee.chatId,
            STRINGS.ud.PROCESSING,
            MessageType.text
        ).catch(err => inputSanitization.handleError(err, client, Arcee));
        try {
            var text = "";
            if (!(Arcee.replyMessage === "")) {
                text = Arcee.replyMessage;
            } else if (args.length == 0) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.ud.NO_ARG,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            } else {
                text = args.join(" ");
            }

            let Response = await ud.define(text);
            let result = Response.reduce(function (prev, current) {
                return prev.thumbs_up + prev.thumbs_down >
                    current.thumbs_up + current.thumbs_down
                    ? prev
                    : current;
            });

            result.definition = result.definition.replace(/\[/g, "_");
            result.definition = result.definition.replace(/\]/g, "_");
            result.example = result.example.replace(/\[/g, "_");
            result.example = result.example.replace(/\]/g, "_");

            let msg =
                "*Word :* " +
                result.word +
                "\n\n*Meaning :*\n" +
                result.definition +
                "\n\n*Example:*\n" +
                result.example +
                "\n〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️\n👍" +
                result.thumbs_up +
                "  👎" +
                result.thumbs_down;

            await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });

            await client.sendMessage(Arcee.chatId, msg, MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Arcee,
                STRINGS.ud.NOT_FOUND.format(text)
            );
            return await client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        }
        return;
    },
};
