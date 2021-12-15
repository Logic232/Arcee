const { MessageType } = require("@adiwajshing/baileys");
const Strings = require("../lib/db");
const inputSanitization = require("../sidekick/input-sanitization");
const Greetings = require("../database/greeting");
const GOODBYE = Strings.goodbye;

module.exports = {
    name: "goodbye",
    description: GOODBYE.DESCRIPTION,
    extendedDescription: GOODBYE.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [".goodbye", ".goodbye off", ".goodbye delete"],
    },
    async handle(client, chat, Arcee, args) {
        try {
            if (!Arcee.isGroup) {
                client.sendMessage(
                    Arcee.chatId,
                    GOODBYE.NOT_A_GROUP,
                    MessageType.text
                );
                return;
            }
            if (args.length == 0) {
                var enabled = await Greetings.checkSettings(
                    Arcee.chatId,
                    "goodbye"
                );
                var Msg = await Greetings.getMessage(Arcee.chatId, "goodbye");
                try {
                    if (enabled === false || enabled === undefined) {
                        client.sendMessage(
                            Arcee.chatId,
                            GOODBYE.SET_GOODBYE_FIRST,
                            MessageType.text
                        );
                        return;
                    } else if (enabled === "OFF") {
                        client.sendMessage(
                            Arcee.chatId,
                            GOODBYE.CURRENTLY_DISABLED,
                            MessageType.text
                        );
                        client.sendMessage(
                            Arcee.chatId,
                            Msg.message,
                            MessageType.text
                        );
                        return;
                    }

                    client.sendMessage(
                        Arcee.chatId,
                        GOODBYE.CURRENTLY_ENABLED,
                        MessageType.text
                    );
                    client.sendMessage(
                        Arcee.chatId,
                        Msg.message,
                        MessageType.text
                    );
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
                            GOODBYE.GREETINGS_UNENABLED,
                            MessageType.text
                        );
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
                            GOODBYE.GREETINGS_ENABLED,
                            MessageType.text
                        );
                        return;
                    }
                    if (args[0] === "delete") {
                        var Msg = await Greetings.deleteMessage(
                            Arcee.chatId,
                            "goodbye"
                        );
                        if (Msg === false || Msg === undefined) {
                            client.sendMessage(
                                Arcee.chatId,
                                GOODBYE.SET_GOODBYE_FIRST,
                                MessageType.text
                            );
                            return;
                        }
                        await client.sendMessage(
                            Arcee.chatId,
                            GOODBYE.GOODBYE_DELETED,
                            MessageType.text
                        );

                        return;
                    }
                    text = Arcee.body.replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    );

                    var Msg = await Greetings.getMessage(
                        Arcee.chatId,
                        "goodbye"
                    );
                    if (Msg === false || Msg === undefined) {
                        await Greetings.setGoodbye(Arcee.chatId, text);
                        await client.sendMessage(
                            Arcee.chatId,
                            GOODBYE.GOODBYE_UPDATED,
                            MessageType.text
                        );

                        return;
                    } else {
                        await Greetings.deleteMessage(
                            Arcee.chatId,
                            "goodbye"
                        );
                        await Greetings.setGoodbye(Arcee.chatId, text);
                        await client.sendMessage(
                            Arcee.chatId,
                            GOODBYE.GOODBYE_UPDATED,
                            MessageType.text
                        );
                        return;
                    }
                } catch (err) {
                    throw err;
                }
            }
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
