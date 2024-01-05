const axios = require("axios");
const fs = require('fs');
const path = require("path");

module.exports.config = {
  name: "bard",
  version: "1",
  hasPermssion: 0,
  credits: "Priyansh Rajput",
  description: "Ask me anything...",
  commandCategory: "ai",
  usages: "bard <ask>",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, body } = event;
  const response = body.slice(5).trim();

  if (!response) {
    api.sendMessage('Please provide a question or query', threadID, messageID);
    return;
  }

  api.sendMessage('🔃Processing...Once at a time only please... I might punch you now... ', threadID, messageID);

  try {
    const encodedResponse = encodeURIComponent(response);
    const res = await axios.get(`https://testapi.heckerman06.repl.co/api/other/bard-ai?prompt=${encodedResponse}&apikey=danielxd`);
    const { content, content2 } = res.data;

    if (content && content.length > 0) {
      const attachmentPayloads = [];

      for (let i = 0; i < content.length; i++) {
        const photoUrl = content[i][0][0];
        const imageResponse = await axios.get(photoUrl, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(imageResponse.data, 'binary');
        const photoPath = path.join(__dirname, `cache/test${i + 1}.png`);
        fs.writeFileSync(photoPath, imageData);
        attachmentPayloads.push(fs.createReadStream(photoPath));
      }

      api.sendMessage(
        {
          attachment: attachmentPayloads,
          body: content2,
        },
        threadID,
        messageID
      );
    } else {
      api.sendMessage(content2, threadID, messageID);
    }
  } catch (error) {
    console.error('Error occurred while fetching data from the Bard API:', error);
    api.sendMessage('An error occurred while fetching data from the Bard API.', threadID, messageID);
  }
};