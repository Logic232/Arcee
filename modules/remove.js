const { MessageType } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const STRINGS = require("../lib/db.js");
const inputSanitization = require("../sidekick/input-sanitization");

module.exports = {
    name: "remove",
    description: STRINGS.remove.DESCRIPTION,
    extendedDescription: STRINGS.remove.EXTENDED_DESCRIPTION,
    demo: { isEnabled: false },
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
            if (!Arcee.isBotGroupAdmin) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.general.BOT_NOT_ADMIN,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            let owner = Arcee.chatId.split("-")[0];
            if (Arcee.isReply) {
                let PersonToRemove =
                    chat.message.extendedTextMessage.contextInfo.participant;
                if (PersonToRemove === owner + "@s.whatsapp.net") {
                    client.sendMessage(
                        Arcee.chatId,
                        "*" + owner + " is the owner of the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }
                if (PersonToRemove === Arcee.owner) {
                    client.sendMessage(
                        Arcee.chatId,
                        "```Why man, why?! Why would you use my powers to remove myself from the group?!🥺```\n*Request Rejected.* 😤",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }
                var isMember = inputSanitization.isMember(
                    PersonToRemove,
                    Arcee.groupMembers
                );
                if (!isMember) {
                    client.sendMessage(
                        Arcee.chatId,
                        "*person is not in the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                }
                try {
                    if (PersonToRemove) {
                        client.groupRemove(Arcee.chatId, [PersonToRemove]).catch(err => inputSanitization.handleError(err, client, Arcee));
                        return;
                    }
                } catch (err) {
                    throw err;
                }
                return;
            }
            if (!args[0]) {
                client.sendMessage(
                    Arcee.chatId,
                    STRINGS.remove.INPUT_ERROR,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (args[0][0] == "@") {
                const number = args[0].substring(1);
                if (isNaN(number)) {
                    client.sendMessage(
                        Arcee.chatId,
                        STRINGS.remove.INPUT_ERROR,
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }

                if((number + "@s.whatsapp.net") === Arcee.owner){
                    client.sendMessage(
                        Arcee.chatId,
                        "```Why man, why?! Why would you use my powers to remove myself from the group?!🥺```\n*Request Rejected.* 😤",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }

                if (!(number === owner)) {
                    client.groupRemove(Arcee.chatId, [
                        number + "@s.whatsapp.net",
                    ]).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                } else {
                    client.sendMessage(
                        Arcee.chatId,
                        "*" + owner + " is the owner of the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }
            }
            client.sendMessage(
                Arcee.chatId,
                STRINGS.remove.INPUT_ERROR,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
            return;
        }
    },
};
