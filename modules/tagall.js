const { MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const STRINGS = require("../lib/db.js");

module.exports = {
    name: "tagall",
    description: STRINGS.tagall.DESCRIPTION,
    extendedDescription: STRINGS.tagall.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".tagall",
            ".tagall Hey everyone! You have been tagged in this message hehe.",
        ],
    },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.general.NOT_A_GROUP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            let members = [];
            for (var i = 0; i < Arcee.groupMembers.length; i++) {
                members[i] = Arcee.groupMembers[i].jid;
            }
            if (Arcee.isReply) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.tagall.TAG_MESSAGE,
                    MessageType.text,
                    {
                        contextInfo: {
                            stanzaId: Arcee.replyMessageId,
                            participant: Arcee.replyParticipant,
                            quotedMessage: {
                                conversation: Arcee.replyMessage,
                            },
                            mentionedJid: members,
                        },
                    }
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (args.length) {
                client.sendMessage(
                    Arcee.chatId,
                    args.join(" "),
                    MessageType.text,
                    {
                        contextInfo: {
                            mentionedJid: members,
                        },
                    }
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }

            client.sendMessage(
                Arcee.chatId,
                STRINGS.tagall.TAG_MESSAGE,
                MessageType.text,
                {
                    contextInfo: {
                        mentionedJid: members,
                    },
                }
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
        return;
    },
};
