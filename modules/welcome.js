const { MessageType } = require("@adiwajshing/baileys");
const Greetings = require("../database/greeting");
const inputSanitization = require("../sidekick/input-sanitization");
const Strings = require("../lib/db");
const WELCOME = Strings.welcome;

module.exports = {
    name: "welcome",
    description: WELCOME.DESCRIPTION,
    extendedDescription: WELCOME.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [".welcome", ".welcome off", ".welcome delete"],
    },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    WELCOME.NOT_A_GROUP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            var Msg = await Greetings.getMessage(Arcee.chatId, "welcome");
            if (args.length == 0) {
                var enabled = await Greetings.checkSettings(
                    Arcee.chatId,
                    "welcome"
                );
                try {
                    if (enabled === false || enabled === undefined) {
                        client.sendMessage(
                            Arcee.chatId,
                            WELCOME.SET_WELCOME_FIRST,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        return;
                    } else if (enabled === "OFF") {
                        client.sendMessage(
                            Arcee.chatId,
                            WELCOME.CURRENTLY_DISABLED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        client.sendMessage(
                            Arcee.chatId,
                            Msg.message,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        return;
                    }

                    client.sendMessage(
                        Arcee.chatId,
                        WELCOME.CURRENTLY_ENABLED,
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    client.sendMessage(
                        Arcee.chatId,
                        Msg.message,
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                } catch (err) {
                    throw err;
                }
            } else {
                try {
                    if (
                        args[0] === "OFF" ||
                        args[0] === "off" ||
                        args[0] === "Off"
                    ) {
                        switched = "OFF";
                        await Greetings.changeSettings(
                            Arcee.chatId,
                            switched
                        );
                        client.sendMessage(
                            Arcee.chatId,
                            WELCOME.GREETINGS_UNENABLED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        return;
                    }
                    if (
                        args[0] === "ON" ||
                        args[0] === "on" ||
                        args[0] === "On"
                    ) {
                        switched = "ON";
                        await Greetings.changeSettings(
                            Arcee.chatId,
                            switched
                        );
                        client.sendMessage(
                            Arcee.chatId,
                            WELCOME.GREETINGS_ENABLED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));

                        return;
                    }
                    if (args[0] === "delete") {
                        var Msg = await Greetings.deleteMessage(
                            Arcee.chatId,
                            "welcome"
                        );
                        if (Msg === false || Msg === undefined) {
                            client.sendMessage(
                                Arcee.chatId,
                                WELCOME.SET_WELCOME_FIRST,
                                MessageType.text
                            ).catch(err => inputSanitization.handleError(err, client, Arcee));
                            return;
                        }

                        await client.sendMessage(
                            Arcee.chatId,
                            WELCOME.WELCOME_DELETED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));

                        return;
                    }
                    text = Arcee.body.replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    );
                    if (Msg === false || Msg === undefined) {
                        await Greetings.setWelcome(Arcee.chatId, text);
                        await client.sendMessage(
                            Arcee.chatId,
                            WELCOME.WELCOME_UPDATED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));

                        return;
                    } else {
                        await Greetings.deleteMessage(
                            Arcee.chatId,
                            "welcome"
                        );
                        await Greetings.setWelcome(Arcee.chatId, text);
                        await client.sendMessage(
                            Arcee.chatId,
                            WELCOME.WELCOME_UPDATED,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));

                        return;
                    }
                } catch (err) {
                    throw err;
                }
            }
        } catch (err) {
            inputSanitization.handleError(err, client, Arcee);
            return;
        }
    },
};
