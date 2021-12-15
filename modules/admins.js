const { MessageType } = require("@adiwajshing/baileys");
const Strings = require("../lib/db");
const ADMINS = Strings.admins;
const inputSanitization = require("../sidekick/input-sanitization");

module.exports = {
    name: "admins",
    description: ADMINS.DESCRIPTION,
    extendedDescription: ADMINS.EXTENDED_DESCRIPTION,
    demo: { text: ".admins", isEnabled: true },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    ADMINS.NOT_GROUP_CHAT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }

            var message = "";
            for (let admin of Arcee.groupAdmins) {
                let number = admin.split("@")[0];
                message += `@${number} `;
            }

            if (!Arcee.isReply) {
                client.sendMessage(Arcee.chatId, message, MessageType.text, {
                    contextInfo: {
                        mentionedJid: Arcee.groupAdmins,
                    },
                }).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }

            client.sendMessage(Arcee.chatId, message, MessageType.text, {
                contextInfo: {
                    stanzaId: Arcee.replyMessageId,
                    participant: Arcee.replyParticipant,
                    quotedMessage: {
                        conversation: Arcee.replyMessage,
                    },
                    mentionedJid: Arcee.groupAdmins,
                },
            }).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
