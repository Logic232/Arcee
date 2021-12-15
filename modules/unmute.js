const { GroupSettingChange, MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const Strings = require("../lib/db");
const UNMUTE = Strings.unmute;

module.exports = {
    name: "unmute",
    description: UNMUTE.DESCRIPTION,
    extendedDescription: UNMUTE.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".unmute" },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    UNMUTE.NOT_GROUP_CHAT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (!Arcee.isBotGroupAdmin) {
                client.sendMessage(
                    Arcee.chatId,
                    UNMUTE.NOT_ADMIN,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            client.groupSettingChange(
                Arcee.chatId,
                GroupSettingChange.messageSend,
                false
            );
            client.sendMessage(
                Arcee.chatId,
                UNMUTE.CHAT_ALL_MEMBERS,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
