const { MessageType } = require("@adiwajshing/baileys");
const STRINGS = require("../lib/db.js");
const inputSanitization = require("../sidekick/input-sanitization");

module.exports = {
    name: "disappear",
    description: STRINGS.disappear.DESCRIPTION,
    extendedDescription: STRINGS.disappear.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: [".disappear", ".disappear off"] },
    async handle(client, chat, Arcee, args) {
        try {
            var time = 7 * 24 * 60 * 60;
            if (Arcee.isPm) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.general.NOT_A_GROUP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (Arcee.isGroup) {
                if (chat.message.extendedTextMessage == null) {
                    await client.toggleDisappearingMessages(
                        Arcee.chatId,
                        time
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                } else {
                    await client.toggleDisappearingMessages(Arcee.chatId, 0).catch(err => inputSanitization.handleError(err, client, Arcee));
                }
                return;
            }
            if (chat.message.extendedTextMessage.contextInfo.expiration == 0) {
                var time = 7 * 24 * 60 * 60;
            } else {
                var time = 0;
            }
            await client.toggleDisappearingMessages(Arcee.chatId, time).catch(err => inputSanitization.handleError(err, client, Arcee));
            return;
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
