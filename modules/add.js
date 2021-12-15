const { MessageType } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const STRINGS = require("../lib/db.js");
const ADD = STRINGS.add;
const inputSanitization = require("../sidekick/input-sanitization");

module.exports = {
    name: "add",
    description: ADD.DESCRIPTION,
    extendedDescription: ADD.EXTENDED_DESCRIPTION,
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
            if (!args[0]) {
                client.sendMessage(
                    Arcee.chatId,
                    ADD.NO_ARG_ERROR,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            let number;
            if (isNaN(args[0]) || args[0][0] === "+" || args[0].length < 10) {
                client.sendMessage(
                    Arcee.chatId,
                    ADD.NUMBER_SYNTAX_ERROR,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (args[0].length == 10 && !isNaN(args[0])) {
                number = "91" + args[0];
            } else {
                number = args[0];
            }
            const exists = await client.isOnWhatsApp(
                number + "@s.whatsapp.net"
            );
            if (!exists) {
                client.sendMessage(
                    Arcee.chatId,
                    ADD.NOT_ON_WHATSAPP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            const request = client.groupAdd(Arcee.chatId, [
                Arcee.owner,
                number + "@s.whatsapp.net",
            ]);
            const response = await request;

            if (response[number + "@c.us"] == 408) {
                client.sendMessage(
                    Arcee.chatId,
                    ADD.NO_24HR_BAN,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            } else if (response[number + "@c.us"] == 409) {
                client.sendMessage(
                    Arcee.chatId,
                    ADD.ALREADY_MEMBER,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            client.sendMessage(
                Arcee.chatId,
                "``` " + number + ADD.SUCCESS + "```",
                MessageType.text
            );
        } catch (err) {
            if (err.status == 400) {
                await inputSanitization.handleError(
                    err,
                    client,
                    Arcee,
                    (customMessage = ADD.NOT_ON_WHATSAPP)
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
            }
            await inputSanitization.handleError(err, client, Arcee);
        }
        return;
    },
};
