const { MessageType } = require("@adiwajshing/baileys");
const Strings = require("../lib/db");
const format = require("python-format-js");
const inputSanitization = require("../sidekick/input-sanitization");
const config = require("../config");
const HELP = Strings.help;

module.exports = {
    name: "help",
    description: HELP.DESCRIPTION,
    extendedDescription: HELP.EXTENDED_DESCRIPTION,
    demo: {isEnabled: false},
    async handle(client, chat, Arcee, args, commandHandler) {
        try {
            var prefixRegex = new RegExp(config.PREFIX, "g");
            var prefixes = /\/\^\[(.*)+\]\/\g/g.exec(prefixRegex)[1];
            if(!args[0]){
                var helpMessage = HELP.HEAD;
                commandHandler.forEach(element => {
                    helpMessage += HELP.TEMPLATE.format(prefixes[0] + element.name, element.description);
                });
                client.sendMessage(Arcee.chatId, helpMessage, MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            var helpMessage = HELP.COMMAND_INTERFACE;
            var command = commandHandler.get(args[0]);
            if(command){
                var triggers = " | "
                prefixes.split("").forEach(prefix => {
                    triggers += prefix + command.name + " | "
                });

                if(command.demo.isEnabled) {
                    var buttons = [];
                    helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggers, command.extendedDescription) + HELP.FOOTER;
                    if(command.demo.text instanceof Array){
                        for (var i in command.demo.text){
                            var button = {
                                buttonId: 'id' + i,
                                buttonText: {displayText: command.demo.text[i]},
                                type: 1
                            }
                            buttons.push(button);
                        }
                    }else{
                        buttons.push({buttonId: 'id1', buttonText: {displayText: command.demo.text}, type: 1});
                    }
                    const buttonMessage = {
                        contentText: helpMessage,
                        buttons: buttons,
                        headerType: 1
                    }
                    return await client.sendMessage(Arcee.chatId, buttonMessage, MessageType.buttonsMessage).catch(err => inputSanitization.handleError(err, client, Arcee));
                }

                helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggers, command.extendedDescription);
                client.sendMessage(Arcee.chatId, helpMessage, MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            client.sendMessage(Arcee.chatId, HELP.COMMAND_INTERFACE + "```Invalid Command. Check the correct name from```  *.help*  ```command list.```", MessageType.text).catch(err => inputSanitization.handleError(err, client, Arcee));
        } catch (err) {
            await inputSanitization.handleError(err, client, Arcee);
        }
    },
};
