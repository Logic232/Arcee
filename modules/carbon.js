const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const String = require("../lib/db.js");
const Carbon = require("unofficial-carbon-now");
const inputSanitization = require("../sidekick/input-sanitization");
const CARBON = String.carbon;

module.exports = {
    name: "carbon",
    description: CARBON.DESCRIPTION,
    extendedDescription: CARBON.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".carbon Hi! Welcome to Arcee.",
            '.carbon #include <iostream> \nint main() \n{\n   std::cout << "Hello Arcee!"; \n   return 0;\n} -t yeti',
            ".carbon -t",
        ],
    },
    async handle(client, chat, Arcee, args) {
        try {
            let themes = [
                "3024 night",
                "a11y dark",
                "blackboard",
                "base 16 (dark)",
                "base 16 (light)",
                "cobalt",
                "duotone",
                "hopscotch",
                "lucario",
                "material",
                "monokai",
                "night owl",
                "nord",
                "oceanic next",
                "one light",
                "one dark",
                "panda",
                "paraiso",
                "seti",
                "shades of purple",
                "solarized (dark)",
                "solarized (light)",
                "synthwave '84",
                "twilight",
                "verminal",
                "vscode",
                "yeti",
                "zenburn",
            ];
            var code = "";
            if (args[0] == null && !Arcee.isReply) {
                await client.sendMessage(
                    Arcee.chatId,
                    CARBON.NO_INPUT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            } else if (Arcee.isReply && !Arcee.replyMessage) {
                await client.sendMessage(
                    Arcee.chatId,
                    CARBON.INVALID_REPLY,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            } else if (Arcee.isReply) {
                code = Arcee.replyMessage;
                themeInput = themes[Math.floor(Math.random() * themes.length)];
            } else {
                try {
                    var text = Arcee.body.replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    );
                    if (text[0] === "-" && text[1] === "t") {
                        if(text[2] == null){
                            let counter = 1;
                            var message = 'Available themes: ';
                            themes.forEach((theme) => {
                                message += `\n${counter}. ${theme}`;
                                counter += 1;
                            })
                            await client.sendMessage(
                                Arcee.chatId,
                                "```" + message + "```",
                                MessageType.text
                            )
                            return;
                        }
                        else{
                            await client.sendMessage(
                                Arcee.chatId,
                                CARBON.NO_INPUT,
                                MessageType.text
                            ).catch(err => inputSanitization.handleError(err, client, Arcee));
                            return;
                        }
                    }
                    var body = Arcee.body.split("-t");
                    code = body[0].replace(
                        Arcee.body[0] + Arcee.commandName + " ",
                        ""
                    );
                    themeInput = body[1].substring(1);
                    if (!themes.includes(themeInput)) {
                        await client.sendMessage(
                            Arcee.chatId,
                            CARBON.INVALID_THEME,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        return;
                    }
                } catch (err) {
                    if (err instanceof TypeError) {
                        code = Arcee.body.replace(
                            Arcee.body[0] + Arcee.commandName + " ",
                            ""
                        );
                        themeInput =
                            themes[Math.floor(Math.random() * themes.length)];
                    }
                }
            }
            try {
                const processing = await client.sendMessage(
                    Arcee.chatId,
                    CARBON.CARBONIZING,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                const carbon = new Carbon.createCarbon()
                    .setCode(code)
                    .setPrettify(true)
                    .setTheme(themeInput);
                const output = await Carbon.generateCarbon(carbon);
                await client.sendMessage(
                    Arcee.chatId,
                    output,
                    MessageType.image,
                    {
                        mimetype: Mimetype.png,
                        caption: CARBON.OUTPUT.format(themeInput),
                    }
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return await client.deleteMessage(Arcee.chatId, {
                    id: processing.key.id,
                    remoteJid: Arcee.chatId,
                    fromMe: true,
                });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
