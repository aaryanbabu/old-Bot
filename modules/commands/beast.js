const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "beast",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Priyansh Rajput",
  description: "Mr.beast text to speach",
  commandCategory: "Ai",
  usages: "[text]",
  cooldowns: 5
};
  module.exports.run = async function ({ api, event, args }) {
    try {
      const { createReadStream, unlinkSync } = fs;
      const { resolve } = path;

      const { messageID, threadID, senderID, body, mentions, type } = event;

      const name = "Beast";

      let chat = args.join(" ");

    
      const extractText = () => {
        if (type === "message_reply") {
          return event.messageReply.body;
        } else if (mentions.length > 0) {
          return mentions[0].body;
        } else {
          return chat;
        }
      };

      chat = extractText();

      if (!chat) return api.sendMessage(`Please provide text to convert to audio.`, threadID, messageID);

      
      const text = encodeURIComponent(chat);

      const audioPath = resolve(__dirname, 'cache', `${threadID}_${senderID}_beast.mp3`);

      const audioApi = await axios.get(`https://www.api.vyturex.com/beast?query=${text}`);

      const audioUrl = audioApi.data.audio;

      await global.utils.downloadFile(audioUrl, audioPath);

      const att = createReadStream(audioPath);

      api.sendMessage({
        attachment: att,
        body: '', 
      }, threadID, null, messageID, () => unlinkSync(audioPath));
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};
