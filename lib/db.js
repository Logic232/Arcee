const data = {
  general: {
    NUMBER_SYNTAX_ERROR:
        "```Enter a valid contact number as per the syntax below:\n    1. XXXXXXXXXX\n    2. Tag the person\n    3. YYXXXXXXXXXX (YY- Country Code, without zeros)```",
    MESSAGE_NOT_TAGGED: "```Tag a message or enter a number.```",
    NOT_A_GROUP: "```Command only applicable in a group chat.```",
    BOT_NOT_ADMIN: "```Sorry, don't have permission to do so since I am not an admin.```",
    ADMIN_PERMISSION:
        "```You need to be an admin to execute this command.```",
    SUDO_PERMISSION:
        "```Hey there, I am 💠Arcee💠. I guess you were trying to use my commands in``` *{Arcee.groupName}*```. However, the bot is currently in {worktype} mode. This enables only the owner and sudo users to use the command``` *{commandName}* ```.\n\nIf you are keen to use my features, you can deploy Arcee on your own account without much effort, in less than 5 minutes! Check out the links given below.```\n\n🔗https://myarcee.com\n🔗https://github.com/Logic232/Arcee",
    ERROR_TEMPLATE:
        "```Looks like something went wrong. Need not worry. Here are some logs since when the bot was not responding as expected.```\n```---------```\n```🧐 Command:``` *{commandName}*\n```😎 From Me?:``` *{fromMe}*\n```🗣️ Was a reply?:``` *{isReply}*\n```👥 In a group?``` *{isGroup}*\n```📥 In Inbox?``` *{isPm}*\n```📸 Command with image?``` *{isImage}*\n```🕺🏻 Is Bot group admin?``` *{isBotGroupAdmin}*\n```📈 Was Sender group admin?``` *{isSenderGroupAdmin}*\n```🫂 Was sender sudo?``` *{isSenderSudo}*\n```⚠️ Error:``` \n*{err}*\n```---------```\n_To figure out what exactly went wrong, please report/raise the issue on our support chat at_ https://chat.whatsapp.com/Gc8gNMoue2uHyd6xhFwvEP",
    SUCCESSFUL_CONNECTION: "*Arcee successfuly integrated.*\n```Bot is currently working in``` *{worktype}* ```mode.```\n```For more information regarding Bot working and permissions check out:``` \n🔗https://github.com/Logic232/Arcee."
  },
  add: {
      DESCRIPTION: "Module to add a person to a group.",
      EXTENDED_DESCRIPTION:
          "```Add new people to a group by entering their mobile number as per the format mentioned below.\n    1. XXXXXXXXXX\n    2. YYXXXXXXXXXX ()\n\nFor example -\n``` *.add 9861212121*",
      NUMBER_SYNTAX_ERROR:
          "```Valid formats -\n    1. XXXXXXXXXX\n    2. YYXXXXXXXXXX\n\nFor example-```\n*.add 9861212121*\n*.add 919861212121*",
      NO_ARG_ERROR:
          "```Enter the number you want to add.\n\nFor instance,```  *.add <NUMBER>* .",
      NO_24HR_BAN:
          "```The number entered cannot be added back before 24 hours.```",
      ALREADY_MEMBER:
          "```The number entered is already a member of this group.```",
      NOT_ON_WHATSAPP:
          "```The number you're trying to add isn't available on WhatsApp.\nPlease verify the number again.```",
      SUCCESS: " added successfully!"
  },
  admins: {
      DESCRIPTION: "Tag admins",
      EXTENDED_DESCRIPTION:
          "```Tag admins of a group (either as a reply to another message or a direct tag).```",
      NOT_GROUP_CHAT:
          "*.admins*  ```command is only applicable for group chats.```"
  },
  alive: {
      DESCRIPTION: "Check if bot is online.",
      EXTENDED_DESCRIPTION:
          "```This module can be used to check if the bot is currently online or not.\n\nExample usage,```\n*.alive*",
      ALIVE_MSG: "```💠 Arcee has been integrated successfully. 💠\n\nUse the ```  *.help*  ``` command to get a list of plugins that will make your WhatsApp experience much easier.```"
  },
  block: {
      DESCRIPTION: "Block contact",
      EXTENDED_DESCRIPTION: "```Add the number to blocklist. You can reply to the person in group / pm or use .block <number>.```",
      NUMBER_SYNTAX_ERROR:
          "```Enter a valid contact number as per the syntax below:\n    1. XXXXXXXXXX\n    2. Tag the person\n    3. +YYXXXXXXXXXX (YY-Country Code, without zeros)```",
      MESSAGE_NOT_TAGGED: "```Tag a message or enter a number to proceed.```",
      NOT_BLOCK_BOT: "```Bot can not block itself```"
  },
  carbon: {
      DESCRIPTION: "Convert text/code to a carbon image.",
      EXTENDED_DESCRIPTION: "```This module can be used to convert text/code into carbon images.\n\nExample Usage,```\n    *.carbon <text>* \n    *.carbon*  ```and reply to a text message.\n\nUse the -t flag after```  *.carbon*  ```to get the list of themes availble.\nIn order to specify the theme, use```  *.carbon <text> -t <theme>* .",
      NO_INPUT: "```No input provided.\nPlease use the command```  *.carbon <text>*  ```or reply to a text message with```  *.carbon*  ```to carbonize the text.```",
      CARBONIZING: "```Converting your text into a code snippet. Please wait...```",
      OUTPUT: "*<< Here's your carbon image! >>*\n```Carbonized by Arcee\nColour Scheme: {}```",
      INVALID_REPLY: "```The replied message should be text.```",
      INVALID_THEME: "```Please enter a valid theme.\nDo note that theme names are```  *case sensitive*."
  },
  demote: {
      DESCRIPTION: "Demote a person from admin",
      EXTENDED_DESCRIPTION:
          "```Use this module to demote a person from admin by entering the person's mobile number. Valid Syntaxes -\n    1. XXXXXXXXXX\n    2. YYXXXXXXXXXX ()\n\nFor example``` -\n*.demote 9861212121*",
      NOT_A_GROUP: "```This command is only applicable for group chats.```",
      BOT_NOT_ADMIN: "```Sorry, dont have the permission to do so since I am not an admin.```",
      PERSON_NOT_IN_GROUP: "```Person not found.```",
      MESSAGE_NOT_TAGGED:
          "```Reply/tag/enter contact number of the person to be demoted.```"
  },
  disappear: {
      DESCRIPTION: "Toggle disappearing messages",
      EXTENDED_DESCRIPTION: "```Toggle disappearing messages by using command``` *.dissapear* ."
  },
  getdp: {
      DESCRIPTION: "Get display picture",
      EXTENDED_DESCRIPTION: "```Get the profile picture of the group in a group conversation or the profile picture of Arcee itself in personal chat.```",
      IMAGE_CAPTION: "```Here is the display image. Procured by Arcee.```",
      PROCESSING: "```Getting display picture...```",
      TRY_AGAIN: "```Display picture not found. Upload an image and try again.```"
  },
  github: {
      DESCRIPTION: "Github Profile",
      EXTENDED_DESCRIPTION: "```Get the github profile by command```  *.github <user>*  ```or replying```  *.github* .",
      NO_ARG_ERROR:"```Please enter the username.```",
      ERROR_MSG:"```Enter a valid username.```",
      FETCHING: "```Fetching user details from GitHub. Please wait...```"
  },
  help: {
      DESCRIPTION: "Get the command list and info on modules",
      EXTENDED_DESCRIPTION:
          "This module is used to get info on other modules and their triggers.",
      HEAD: "👾 *Arcee Menu* 👾\n```Use .help command for detailed info on a module.```",
      TEMPLATE: "\n\n🤖 *Command* - ```{}```\n💡 *Info* - ```{}```",
      COMMAND_INTERFACE: "👾 *Arcee Command Interface* 👾\n\n",
      COMMAND_INTERFACE_TEMPLATE: "💠 *Triggers -* ```{}```\n📚 *Info -* {}",
      FOOTER: "```\n\nClick on the button below to get a preview of the plugin.```"
  },
  invite: {
      DESCRIPTION: "Module to create group invite link",
      EXTENDED_DESCRIPTION:
          "```Use this module to send a group invite link in the group or personally to someone.```",
      LINK_SENT: "```Invite link sent in DM, please check.```"
  },
  lyrics: {
      DESCRIPTION: "Module to find lyrics of song",
      EXTENDED_DESCRIPTION: "```Use this module to find the lyrics of a song by using```  *.lyrics*  ```command.```",
      NO_ARG: "```Please enter the songs name.```",
      NOT_FOUND: "```Song not found !```",
      PROCESSING: "```Searching. Please wait....```"
  },
  mute: {
      DESCRIPTION: "Mute group chat for a specified time.",
      EXTENDED_DESCRIPTION: "Mute non-admin members of a group. You can even specify the duration using s, m or h.\n\nFor example:\n .mute 15 m   will change chat permissions to admin-only for 15 minutes.",
      NOT_GROUP_CHAT:
          "*.mute*  ```command is only applicable in a group chat.```",
      NOT_ADMIN:
          "```Sorry, dont have the permission to do so since I am not an admin.```",
      CHAT_ADMIN_ONLY: "```Chat permissions changed to```  *admin only*.",
      MENTION_DURATION:
          "```Please mention how long you want to mute the chat. For example,```\n*.mute 10 s*  ```to mute for 10 seconds.```",
      CHAT_ALL_MEMBERS:
          "```Chat permissions changed to```  *all group members*."
  },
  neko: {
      DESCRIPTION: "Copy your text to nekobin",
      EXTENDED_DESCRIPTION:
          "```Use this module to paste your text to a pastebin (NEKOBIN). Enter text with the command```  *.neko* .",
      ENTER_TEXT: "```Please enter a text message along with the command.```",
      TRY_LATER: "```Too many tries. Please try again later.```",
      PROCESSING: "```Pasting text to nekobin. Please wait...```"
  },
  ocr: {
      DESCRIPTION: "Optical Character Recognition",
      EXTENDED_DESCRIPTION: "```Use this module to obtain text from an image by```  *.ocr*  ```command.```",
      PROCESSING: "```Processing. Please wait...```",
      ERROR_MSG:"```Please tag a valid message.```",
      NO_TEXT: "Couldn't find text in the image"
  },
  promote: {
      DESCRIPTION: "Promote a member to admin",
      EXTENDED_DESCRIPTION:
          "```Use this module to promote a member to admin. You can enter the person's mobile number as per the format below. Valid Syntaxes -\n    1. XXXXXXXXXX\n    2. YYXXXXXXXXXX ()\n\nFor example-\n``` *.promote 9861212121*",
      NOT_A_GROUP: "```This command is only applicable in a group chat.```",
      BOT_NOT_ADMIN: "```Sorry, dont have the permission to do so since I am not an admin.```",
      PERSON_NOT_IN_GROUP: "```Person is not in the group.```",
      MESSAGE_NOT_TAGGED:
          "```Reply/tag/enter contact number of the person to be promoted.```"
  },
  remove: {
      DESCRIPTION: "Module to remove a person from a group.",
      EXTENDED_DESCRIPTION:
          "```Use this module to remove people from a group by tagging them```  *.remove @<person-to-remove>*  ```or replying to them```  *.remove*.",
      INPUT_ERROR: "```Reply to the person you want to remove or tag them.\n\nFor instance,```  *.remove @<person-to-remove>*  ```or reply using```  *.remove*."
  },
  setdp: {
      DESCRIPTION: "Change the group icon",
      EXTENDED_DESCRIPTION:
          "```Use this module to change the group's icon. Tag image with the command or send the desired image with caption as the command```",
      NOT_AN_IMAGE: "```Please reply or caption the image you want to make the group icon.```",
      NOT_A_GROUP: "```This command is only applicable in a group chat.```",
      ICON_CHANGED: "```Chnaging icon/group image...```"
  },
  song: {
      DESCRIPTION: "Download songs",
      EXTENDED_DESCRIPTION: "Use this module to download audio of your choice either by specifying a YouTube link or the name of the song.",
      ENTER_SONG: "```Enter song with the command```",
      SONG_NOT_FOUND: "```Could not find the song you entered. Check whether the link or keyword entered is correct.```",
      DOWNLOADING: "```Downloading your song...```",
      UPLOADING: "```Uploading song...```",
      INTRO: ""
  },
  sticker: {
      DESCRIPTION: "Module to convert image to sticker",
      EXTENDED_DESCRIPTION:
          "```Use this module to convert any image from your chat to a sticker. Reply to an image message with the command```  *.sticker*  ```to convert and send that image as a sticker.```",
      TAG_A_VALID_MEDIA_MESSAGE:
          "```Please tag a valid image/video/gif message to convert to sticker.```",
      DOWNLOADING: "```Your sticker is downloading. Please wait...```"
  },
  stoi: {
      DESCRIPTION: "Module to convert sticker to image",
      EXTENDED_DESCRIPTION:
          "```Use this module to convert any sticker from your chat to an image. Reply to a sticker message with the command```  *.stoi*  ```to convert and send that sticker as an image.```",
      ANIMATED_STICKER_ERROR : "```Tagged sticker message is animated, ``` *Can not convert animated sticker to image*, ```Try again with a static sticker.```",
      TAG_A_VALID_STICKER_MESSAGE:
          "```Please tag a valid sticker message to convert to an image.```",
      DOWNLOADING: "```Your image is downloading. Please wait...```",
      ERROR: "```Woops, something went wrong. Try again later, or proabaly not with this again...```"
  },
  tr: {
      DESCRIPTION: "Language Translator",
      EXTENDED_DESCRIPTION: "```Use```  *.tr <text> | <language>*  ```to translate text to the specified language. You can also reply to a text message with syntax```  *.tr <language>*  ```to translate text.\nIf you do not specify a language, it defaults to <English class=''></English>```",
      PROCESSING: "```Translating. Please wait...```",
      TOO_LONG: "*Total characters should be less than 4000.*\n```Total characters for current input were``` ```{}.```",
      LANGUAGE_NOT_SUPPORTED: "```Language is invalid.```",
      INVALID_REPLY: "```Please reply to a text message.```",
      SUCCESS: "*TR:* Translate [*{}* -> *{}*]\n\n{}",
      NO_INPUT: "```No input was detected. Please use``` *.help tts* ```for info on how to use this module.```"
  },
  tts: {
      DESCRIPTION: "Text To Speech.",
      EXTENDED_DESCRIPTION: "```Use```  *.tts <text>*  ```or```  *.tts <text> | <language_code>*  ```to convert text to speech.\nYou can also reply to a text message with syntax```  *.tr <language>*  ```to translate text.```",
      PROCESSING: "```Converting text to speech. Please wait...```",
      TOO_LONG: "*Total characters should be less than 200.*\n```Total characters for current input were``` ```{}.```",
      INVALID_LANG_CODE: "*The Language Code was incorrect.*\n```The Language Code is generally the first two letters of the language you're trying to convert to.```",
      NO_INPUT: "```No input was detected. Please use``` *.help tts* ```for info on how to use this module.```"
  },
  tagall: {
      DESCRIPTION: "Module to tag evryone in a group.",
      EXTENDED_DESCRIPTION:
          "```Use this module to tag everyone in the group by either replying to a message or simply using```  *.tagall*  ```command.```",
      TAG_MESSAGE: "*Everyone!*"
  },
  ud: {
      DESCRIPTION: "Urban Dictionary",
      EXTENDED_DESCRIPTION: "```Use this module to find the meaning of a word in Urban Dictionary. Enter```  *.ud*  ```command.```",
      NO_ARG: "```Please enter the word to be search.```",
      NOT_FOUND: "```Term``` *{}* ```Not Found!```",
      PROCESSING: "```Searching. Please wait....```"
  },
  unblock: {
      DESCRIPTION: "Unblock contact",
      EXTENDED_DESCRIPTION: "```Remove number from the blocklist.```",
      NUMBER_SYNTAX_ERROR:
          "```Enter a valid contact number. Valid syntax,\n    1. XXXXXXXXXX\n    2. Tag the person\n    3. +YYXXXXXXXXXX (YY- Country Code, without zeros)```",
      MESSAGE_NOT_TAGGED: "```Tag a message or enter a number.```",
      NOT_UNBLOCK_BOT: "```Bot can not unblock itself```"
  },
  unmute: {
      DESCRIPTION: "Unmute group chat",
      EXTENDED_DESCRIPTION: "Unmute non-admin members of a group",
      NOT_GROUP_CHAT:
          "*.unmute*  ```command is only applicable for a group chat.```",
      NOT_ADMIN:
          "```Sorry, dont have the permissions to do so since I am not an admin.```",
      CHAT_ALL_MEMBERS:
          "```Chat permissions changed to```  *all group members*."
  },
  weather: {
      DESCRIPTION: "Get weather data of a city",
      EXTENDED_DESCRIPTION:
          "```Obtain weather info by entering the city name.```",
      WEATHER_DATA:
          "*Temperature:* {tempInC} °C | {tempInF} °F\n*Min Temp:* {minTempInC} °C | {minTempInF} °F\n*Max Temp:* {maxTempInC} °C | {maxTempInF} °F\n*Humidity:* {humidity}%\n*Wind:* {windSpeedInkmph} kmph | {windSpeedInmph} mph , {degree}°\n*Sunrise:* {sunriseTime}\n*Sunset:* {sunsetTime}\n\n\n*{weatherDescription}*\n{cityName} , {country}\n{dateAndTime}",
      CITY_NAME_REQUIRED:
          "```Please mention the city name to search weather data.```",
      ERROR_OCCURED:
          "```Woops, cannot process this request. Try again later.```",
      DOWNLOADING: "```Processing data. Please wait...```",
      NOT_FOUND: "```City not found. Please recheck the spelling and adhere to syntax.```"
  },
  welcome: {
      DESCRIPTION: "Welcome new members to the group with a custom message.",
      EXTENDED_DESCRIPTION:
          "```New members of a group chat will be welcomed with a message. It can be an image, video, gif with caption or just a text message.\n\nUse this module to either set, update or delete the existing message.\n\nThe welcome option can be disabled but saved using the ```  *.welcome  off*  ```command. In order to delete the existing message, use```  *.welcome  delete*.  ```Do note, the welcome option is still enabled after you use the delete option.```",
      NOT_A_GROUP: "```This command is only applicable in a group chat.```",
      SET_WELCOME_FIRST: "```Set a welcome message first.```",
      GREETINGS_ENABLED: "```Welcome message has been enabled.```",
      GREETINGS_UNENABLED: "```Welcome message has been disabled.```",
      CURRENTLY_ENABLED: "```Greetings are enabled: True \nCurrently greeting new members with:```",
      CURRENTLY_DISABLED: "```Greetings are enabled: False \nCurrently greeting new members with:```",
      WELCOME_DELETED: "```Welcome message deleted.```",
      WELCOME_UPDATED: "```Welcome message updated and enabled.```"
  },
  goodbye: {
      DESCRIPTION: "A goodbye message for group chat whenever someone leaves.",
      EXTENDED_DESCRIPTION:
          "```A goodbye message will be sent when any member leaves the group. It can be an image, video, gif with caption or just a text message.\n\nUse this module to either set, update or delete the existing message.\n\nThe goodbye option can be disabled but saved using the```  *.goodbye  off*  ```command. In order to delete the existing message, use```  *.goodbye  delete*.  ```Do note, the goodbye option is still enabled after you use the delete option.```",
      NOT_A_GROUP: "```This is not a group```",
      SET_GOODBYE_FIRST: "```Set a goodbye message first.```",
      GREETINGS_ENABLED: "```Goodbye message has been enabled.```",
      GREETINGS_UNENABLED: "```Goodbye message has been disabled.```",
      CURRENTLY_ENABLED: "```Greetings are enabled: True \nCurrently greeting new members with:```",
      CURRENTLY_DISABLED: "```Greetings are enabled: True \nCurrently greeting new members with:```",
      GOODBYE_DELETED: "```Goodbye message deleted.```",
      GOODBYE_UPDATED: "```Goodbye message updated and enabled.```"
  },
  yt: {
      DESCRIPTION: "Get recommendations and links from Youtube",
      EXTENDED_DESCRIPTION:
          "```Get the first 10 recommendations from YouTube with their authorname, timestamp and link. Mention the keywords that are required to be searched along with the command.```",
      REPLY: "```Obtaining the recommendations...```",
      NO_VIDEOS: "```No videos could be found.```"
  }
};

module.exports = data;