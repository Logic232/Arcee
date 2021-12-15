const { MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const String = require("../lib/db.js");
const REPLY = String.demote;

module.exports = {
    name: "demote",
    description: REPLY.DESCRIPTION,
    extendedDescription: REPLY.EXTENDED_DESCRIPTION,
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    REPLY.NOT_A_GROUP,
                    MessageType.text
                );
                return;
            }
            if (!Arcee.isBotGroupAdmin) {
                client.sendMessage(
                    Arcee.chatId,
                    REPLY.BOT_NOT_ADMIN,
                    MessageType.text
                );
                return;
            }
            if (!Arcee.isReply && typeof args[0] == "undefined") {
                client.sendMessage(
                    Arcee.chatId,
                    REPLY.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }

            const reply = chat.message.extendedTextMessage;
            if (Arcee.isReply) {
                var contact = reply.contextInfo.participant.split("@")[0];
            } else {
                var contact = await inputSanitization.getCleanedContact(
                    args,
                    client,
                    Arcee
                );
            }
            var admin = false;
            var isMember = await inputSanitization.isMember(
                contact,
                Arcee.groupMembers
            );
            var owner = Arcee.chatId.split("-")[0];
            for (const index in Arcee.groupMembers) {
                if (contact == Arcee.groupMembers[index].jid.split("@")[0]) {
                    if (Arcee.groupMembers[index].isAdmin) {
                        admin = true;
                    }
                }
            }

            if (contact === owner) {
                client.sendMessage(
                    Arcee.chatId,
                    "*" + contact + " is the owner of the group*",
                    MessageType.text
                );
                return;
            }

            if (isMember) {
                if (admin == true) {
                    const arr = [contact + "@s.whatsapp.net"];
                    client.groupDemoteAdmin(Arcee.chatId, arr);
                    client.sendMessage(
                        Arcee.chatId,
                        "*" + contact + " is demoted from admin*",
                        MessageType.text
                    );
                    return;
                } else {
                    client.sendMessage(
                        Arcee.chatId,
                        "*" + contact + " was not an admin*",
                        MessageType.text
                    );
                    return;
                }
            }
            if (!isMember) {
                if (contact === undefined) {
                    return;
                }

                client.sendMessage(
                    Arcee.chatId,
                    REPLY.PERSON_NOT_IN_GROUP,
                    MessageType.text
                );
                return;
            }
            return;
        } catch (err) {
            if (err === "NumberInvalid") {
                await inputSanitization.handleError(
                    err,
                    client,
                    Arcee,
                    "```Invalid number ```" + args[0]
                );
            } else {
                await inputSanitization.handleError(err, client, Arcee);
            }
        }
    },
};
