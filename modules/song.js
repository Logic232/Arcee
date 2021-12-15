const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const chalk = require("chalk");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const inputSanitization = require("../sidekick/input-sanitization");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const STRINGS = require("../lib/db.js");
const SONG = STRINGS.song;

module.exports = {
    name: "song",
    description: SONG.DESCRIPTION,
    extendedDescription: SONG.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".song love of my life",
            ".song https://www.youtube.com/watch?v=0Gc3nvmMQP0",
            ".song https://youtu.be/pWiI9gabW9k",
        ],
    },
    async handle(client, chat, Arcee, args) {
        try {
            if (args.length === 0) {
                await client.sendMessage(
                    Arcee.chatId,
                    SONG.ENTER_SONG,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Arcee));
                return;
            }
            var reply = await client.sendMessage(
                Arcee.chatId,
                SONG.DOWNLOADING,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Arcee));

            // Task starts here
            var startTime = window.performance.now();
            var Id = " ";
            if (args[0].includes("youtu")) {
                Id = args[0];
                try {
                    if (args[0].includes("watch?v=")) {
                        var songId = args[0].split("watch?v=")[1];
                    } else {
                        var songId = args[0].split("/")[3];
                    }
                    const video = await yts({ videoId: songId });
                } catch (err) {
                    throw err;
                }
            } else {
                var song = await yts(args.join(" "));
                song = song.all;
                if (song.length < 1) {
                    client.sendMessage(
                        Arcee.chatId,
                        SONG.SONG_NOT_FOUND,
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Arcee));
                    return;
                }
                Id = song[0].url;
            }
            try {
                var stream = ytdl(Id, {
                    quality: "highestaudio",
                });

                ffmpeg(stream)
                    .audioBitrate(320)
                    .toFormat("ipod")
                    .saveToFile(`tmp/${chat.key.id}.mp3`)
                    .on("end", async () => {
                        var upload = await client.sendMessage(
                            Arcee.chatId,
                            SONG.UPLOADING,
                            MessageType.text
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        await client.sendMessage(
                            Arcee.chatId,
                            fs.readFileSync(`tmp/${chat.key.id}.mp3`),
                            MessageType.audio,
                            {
                                mimetype: Mimetype.mp4Audio,
                            }
                        ).catch(err => inputSanitization.handleError(err, client, Arcee));
                        inputSanitization.performanceTime(startTime);
                        inputSanitization.deleteFiles(`tmp/${chat.key.id}.mp3`);
                        client.deleteMessage(Arcee.chatId, {
                            id: reply.key.id,
                            remoteJid: Arcee.chatId,
                            fromMe: true,
                        });
                        client.deleteMessage(Arcee.chatId, {
                            id: upload.key.id,
                            remoteJid: Arcee.chatId,
                            fromMe: true,
                        });
                    });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Arcee,
                SONG.SONG_NOT_FOUND
            );
        }
    },
};
