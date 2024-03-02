const axios = require('axios');
const fs = require('fs-extra');
const tinyurl = require("tinyurl");

module.exports.config = {
  name: "4k",
  version: "6.9",
  hasPermssion: 0,
  credits: "Dipto",
  description: "Image Enhancer",
  commandCategory: "Noprefix",
  usages: "Reply to a photo to enhance image",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("4k") === 0 || event.body.indexOf("HD") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();


  const { threadID, messageID } = event;

  const photoUrl = event.messageReply?.attachments[0]?.url || args.join(" ");

  if (!photoUrl) {
    api.sendMessage("🔰 | Please reply to a photo to proceed enhancing images...", threadID, messageID);
    return;
  }

   const finalUrl = await tinyurl.shorten(photoUrl);

  api.sendMessage("⏳ | Enhancing please wait...", threadID, async () => {
    try {
      const response = await axios.get(`https://all-image-genator-d1p.onrender.com/dipto/4k?img=${encodeURIComponent(finalUrl)}&key=dipto008`);

      const ImageURL = response.data.dipto;

      const img = (await axios.get(ImageURL, { responseType: "arraybuffer" })).data;
      
      const dipto = response.data.author;
      const ShortUrl = await tinyurl.shorten(ImageURL);
      const fuck = __dirname + `/cache/fuck.jpg`;

      fs.writeFileSync(fuck, Buffer.from(img, 'binary'));
       api.setMessageReaction("✅", messageID, (err) => {}, true);
      api.sendMessage({
        body: `
        ✅ | Successfully enhanced your image...
        🔰 | Author: Priyansh 
        ☂ | Download Link: ${ShortUrl}`,
        attachment: fs.createReadStream(fuck)
      }, threadID, () => fs.unlinkSync(fuck), messageID);
    } catch (error) {
      api.sendMessage(`❎ | Error while processing image: ` + error, threadID, messageID);
    }
  });
};

module.exports.run = async function ({ api, event }) {};
