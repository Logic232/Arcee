const { MessageType } = require("@adiwajshing/baileys");
const Reply = require("../lib/db.js").block;
const inputSanitization = require("../sidekick/input-sanitization");

module.exports = {
    name: "block",
    description: Reply.DESCRIPTION,
    extendedDescription: Reply.EXTENDED_DESCRIPTION,
    async handle(client, chat, Arcee, args) {
        try {
            // if (!Arcee.isReply && typeof args[0] == "undefined") {
            //     client.sendMessage(
            //         Arcee.chatId,
            //         Reply.MESSAGE_NOT_TAGGED,
            //         MessageType.text
            //     );
            //     return;
            // }
            const reply = chat.message.extendedTextMessage;
            var contact = "";
            if (!args.length > 0) {
                contact = reply.contextInfo.participant.split("@")[0];
            } else {
                contact = await inputSanitization.getCleanedContact(
                    args,
                    client,
                    Arcee
                );
            }

            if (contact === Arcee.owner.split("@")[0]) {
                client.sendMessage(
                    Arcee.chatId,
                    Reply.NOT_BLOCK_BOT,
                    MessageType.text
                );
                return;
            }

            if(contact === ""){
                client.sendMessage(
                    Arcee.chatId,
                    Reply.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }
            var JID = contact + "@s.whatsapp.net";
            client.blockUser(JID, "add");
            client.sendMessage(
                Arcee.chatId,
                "*" + contact + " blocked successfully.*",
                MessageType.text
            );
        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Arcee,
                Reply.MESSAGE_NOT_TAGGED
            );
        }
    },
};
