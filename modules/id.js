const { MessageType } = require("@adiwajshing/baileys");
const Strings = require("../lib/db");
const format = require("python-format-js");
const inputSanitization = require("../sidekick/input-sanitization");
const alive = Strings.alive;

module.exports = {
    name: "alive",
    description: alive.DESCRIPTION,
    extendedDescription: alive.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".alive" },
    async handle(client, chat, Arcee, args) {
        try {
            client.sendMessage(
                Arcee.chatId,
                alive.ALIVE_MSG,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
