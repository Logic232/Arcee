const { GroupSettingChange, MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const Strings = require("../lib/db");
const MUTE = Strings.mute;

module.exports = {
    name: "mute",
    description: MUTE.DESCRIPTION,
    extendedDescription: MUTE.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: [".mute", ".mute 10 s", ".mute 1 h"] },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    MUTE.NOT_GROUP_CHAT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (!Arcee.isBotGroupAdmin) {
                client.sendMessage(
                    Arcee.chatId,
                    MUTE.NOT_ADMIN,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            if (!args[0]) {
                client.groupSettingChange(
                    Arcee.chatId,
                    GroupSettingChange.messageSend,
                    true
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                client.sendMessage(
                    Arcee.chatId,
                    MUTE.CHAT_ADMIN_ONLY,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            } else if (isNaN(args[0])) {
                client.sendMessage(
                    Arcee.chatId,
                    MUTE.MENTION_DURATION,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }

            var duration;
            var type = "minutes";
            if (args[1] === "s") {
                duration = args[0] * 1000;
                type = "seconds";
            } else if (args[1] === "m") {
                duration = args[0] * 60 * 1000;
                type = "seconds";
            } else if (args[1] === "h") {
                duration = args[0] * 60 * 60 * 1000;
                type = "seconds";
            } else {
                duration = args[0] * 60 * 1000; // default to minutes
            }

            client.groupSettingChange(
                Arcee.chatId,
                GroupSettingChange.messageSend,
                true
            );
            client.sendMessage(
                Arcee.chatId,
                "```Chat permissions changed to```  *admin only*  ```for " +
                    args[0] +
                    " " +
                    type +
                    ".```",
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));
            setTimeout(() => {
                client.groupSettingChange(
                    Arcee.chatId,
                    GroupSettingChange.messageSend,
                    false
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                client.sendMessage(
                    Arcee.chatId,
                    MUTE.CHAT_ALL_MEMBERS,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
            }, duration);
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
