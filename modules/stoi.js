const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const inputSanitization = require("../sidekick/input-sanitization");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const Strings = require("../lib/db");
const STOI = Strings.stoi;

module.exports = {
    name: "stoi",
    description: STOI.DESCRIPTION,
    extendedDescription: STOI.EXTENDED_DESCRIPTION,
    demo: { isEnabled: false },
    async handle(client, chat, Arcee, args) {
        // Task starts here
        try {
            var startTime = window.performance.now();

            // Function to convert media to sticker
            const convertToImage = async (stickerId, replyChat) => {
                var downloading = await client.sendMessage(
                    Arcee.chatId,
                    STOI.DOWNLOADING,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));

                const fileName = "./tmp/convert_to_image-" + stickerId;
                const filePath = await client.downloadAndSaveMediaMessage(
                    replyChat,
                    fileName
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                const imagePath = "./tmp/image-" + stickerId + ".png";
                try {
                    ffmpeg(filePath)
                        .save(imagePath)
                        .on("error", function (err, stdout, stderr) {
                            inputSanitization.deleteFiles(filePath);
                            inputSanitization.performanceTime(startTime);
                            client.deleteMessage(Arcee.chatId, {
                                id: downloading.key.id,
                                remoteJid: Arcee.chatId,
                                fromMe: true,
                            });
                            throw err;
                        })
                        .on("end", async () => {
                            await client.sendMessage(
                                Arcee.chatId,
                                fs.readFileSync(imagePath),
                                MessageType.image,
                                { mimetype: Mimetype.png, thumbnail: null }
                            ).catch(err => inputSanitization.handleError(err, client, Arcee));
                            inputSanitization.deleteFiles(filePath, imagePath);
                            inputSanitization.performanceTime(startTime);
                            return await client.deleteMessage(Arcee.chatId, {
                                id: downloading.key.id,
                                remoteJid: Arcee.chatId,
                                fromMe: true,
                            }).catch(err => inputSanitization.handleError(err, client, Arcee));
                        });
                } catch (err) {
                    throw err;
                }
            };

            if (Arcee.isReplySticker && !Arcee.isReplyAnimatedSticker) {
                var replyChatObject = {
                    message:
                        chat.message.extendedTextMessage.contextInfo
                            .quotedMessage,
                };
                var stickerId =
                    chat.message.extendedTextMessage.contextInfo.stanzaId;
                convertToImage(stickerId, replyChatObject);
            } else if (Arcee.isReplyAnimatedSticker) {
                client.sendMessage(
                    Arcee.chatId,
                    STOI.TAG_A_VALID_STICKER_MESSAGE,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                inputSanitization.performanceTime(startTime);
                return;
            } else {
                client.sendMessage(
                    Arcee.chatId,
                    STOI.TAG_A_VALID_STICKER_MESSAGE,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                inputSanitization.performanceTime(startTime);
            }
            return;
        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Arcee,
                STOI.ERROR
            );
        }
    },
};
