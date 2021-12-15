const fs = require('fs')
const config = require('../config')
const chalk = require('chalk')

var ArceeClass = require("../sidekick/sidekick")


exports.resolve = function(messageInstance, client, groupMetadata) {
    var Arcee = new ArceeClass();
    var prefix = config.PREFIX + '\\w+'
    var prefixRegex = new RegExp(prefix, 'g');
    var SUDOstring = config.SUDO;
    try{
        var jsonMessage = JSON.stringify(messageInstance)
    }catch(err){
        console.log(chalk.redBright("[ERROR] Something went wrong. ", err))
    }
    // console.log(messageInstance);
    // console.log(jsonMessage);
    Arcee.chatId = messageInstance.key.remoteJid || '';
    Arcee.fromMe = messageInstance.key.fromMe;
    Arcee.owner = client.user.jid || '';
    Arcee.mimeType = messageInstance.message ? Object.keys(messageInstance.message)[0] : null;
    Arcee.type = Arcee.mimeType === 'imageMessage' ? 'image' : (Arcee.mimeType === 'videoMessage') ? 'video' : (Arcee.mimeType === 'conversation' || Arcee.mimeType == 'extendedTextMessage') ? 'text' : (Arcee.mimeType === 'audioMessage') ? 'audio' : (Arcee.mimeType === 'stickerMessage') ? 'sticker' : '';
    Arcee.isReply = (Arcee.mimeType === 'extendedTextMessage' && messageInstance.message.extendedTextMessage.hasOwnProperty('contextInfo') && messageInstance.message.extendedTextMessage.contextInfo.hasOwnProperty('stanzaId'));
    Arcee.replyMessageId = (Arcee.isReply && messageInstance.message.extendedTextMessage.contextInfo) ? messageInstance.message.extendedTextMessage.contextInfo.stanzaId : '';
    Arcee.replyMessage = (Arcee.isReply && messageInstance.message.extendedTextMessage.contextInfo) ? messageInstance.message.extendedTextMessage.contextInfo.quotedMessage.conversation : '';
    Arcee.replyParticipant = (Arcee.isReply && messageInstance.message.extendedTextMessage.contextInfo) ? messageInstance.message.extendedTextMessage.contextInfo.participant : '';
    Arcee.body = Arcee.mimeType === 'conversation' ? messageInstance.message.conversation : (Arcee.mimeType == 'imageMessage') ? messageInstance.message.imageMessage.caption : (Arcee.mimeType == 'videoMessage') ? messageInstance.message.videoMessage.caption : (Arcee.mimeType == 'extendedTextMessage') ? messageInstance.message.extendedTextMessage.text : (Arcee.mimeType == 'buttonsResponseMessage') ? messageInstance.message.buttonsResponseMessage.selectedDisplayText :'';
    Arcee.isCmd = prefixRegex.test(Arcee.body);
    Arcee.commandName = Arcee.isCmd ? Arcee.body.slice(1).trim().split(/ +/).shift().toLowerCase() : '';
    Arcee.isImage = Arcee.type === "image";
    Arcee.isReplyImage = Arcee.isReply ? jsonMessage.indexOf("imageMessage") !== -1 : false;
    Arcee.imageCaption = Arcee.isImage ? messageInstance.message.imageMessage.caption : '';
    Arcee.isGIF = (Arcee.type === 'video' && messageInstance.message.videoMessage.gifPlayback);
    Arcee.isReplyGIF = Arcee.isReply ? (jsonMessage.indexOf("videoMessage") !== -1 && messageInstance.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.gifPlayback) : false;
    Arcee.isSticker = Arcee.type === 'sticker';
    Arcee.isReplySticker = Arcee.isReply ? jsonMessage.indexOf("stickerMessage") !== -1 : false;
    Arcee.isReplyAnimatedSticker = Arcee.isReplySticker ? messageInstance.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated :false;
    Arcee.isVideo = (Arcee.type === 'video' && !messageInstance.message.videoMessage.gifPlayback);
    Arcee.isReplyVideo = Arcee.isReply ? (jsonMessage.indexOf("videoMessage") !== -1 && !messageInstance.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.gifPlayback) : false;
    Arcee.isAudio = Arcee.type === 'audio';
    Arcee.isReplyAudio = Arcee.isReply ? jsonMessage.indexOf("audioMessage") !== -1 : false;
    Arcee.logGroup = client.user.jid || '';
    Arcee.isGroup = Arcee.chatId.endsWith('@g.us');
    Arcee.isPm = !Arcee.isGroup;
    Arcee.sender =  (Arcee.isGroup && messageInstance.message && Arcee.fromMe) ? Arcee.owner : (Arcee.isGroup && messageInstance.message) ? messageInstance.participant : (!Arcee.isGroup) ? Arcee.chatId: '';
    Arcee.groupName = Arcee.isGroup ? groupMetadata.subject : '';
    Arcee.groupMembers = Arcee.isGroup ? groupMetadata.participants : '';
    Arcee.groupAdmins = Arcee.isGroup ? getGroupAdmins(Arcee.groupMembers) : '';
    Arcee.groupId = Arcee.isGroup ? groupMetadata.id : '';
    Arcee.isSenderSUDO = SUDOstring.includes(Arcee.sender.substring(0,Arcee.sender.indexOf("@")));
    Arcee.isBotGroupAdmin = Arcee.isGroup ? (Arcee.groupAdmins.includes(Arcee.owner)) : false;
    Arcee.isSenderGroupAdmin = Arcee.isGroup ? (Arcee.groupAdmins.includes(Arcee.sender)) : false;

    return Arcee;
}

function getGroupAdmins(participants){
    var admins = [];
    for (var i in participants) {
        participants[i].isAdmin ? admins.push(participants[i].jid) : '';
    }
    // console.log("ADMINS -> " + admins);
    return admins;
}