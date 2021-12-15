const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const Strings = require("../lib/db");
const GETDP = Strings.getdp;

module.exports = {
    name: "getdp",
    description: GETDP.DESCRIPTION,
    extendedDescription: GETDP.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".getdp" },
    async handle(client, chat, Arcee, args) {
        const processing = await client.sendMessage(
            Arcee.chatId,
            GETDP.PROCESSING,
            MessageType.text
        );
        try {
            let url = await client.getProfilePicture(Arcee.chatId);
            await client.sendMessage(
                Arcee.chatId,
                { url: url },
                MessageType.image,
                {
                    mimetype: Mimetype.png,
                    caption: GETDP.IMAGE_CAPTION,
                    thumbnail: null,
                }
            );
            return client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        } catch (err) {
            if (err.status == 404) {
                await inputSanitization.handleError(
                    err,
                    client,
                    Arcee,
                    GETDP.TRY_AGAIN
                );
            } else {
                await inputSanitization.handleError(err, client, Arcee);
            }

            return client.deleteMessage(Arcee.chatId, {
                id: processing.key.id,
                remoteJid: Arcee.chatId,
                fromMe: true,
            });
        }
    },
};
