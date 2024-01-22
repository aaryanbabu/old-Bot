module.exports.config = {
  name: "selflisten",	
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Priyansh Rajput",
  description: "Turn on or off self Listen mode (if the acc bot chats a command, it can still run that command)",
  commandCategory: "System",
  usages: "on/off",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const permission = ["100037743553265"];
if (!permission.includes(event.senderID)) return api.sendMessage("[ 𝐒𝐄𝐋𝐅 𝐋𝐈𝐒𝐓𝐄𝐍 ] - You don't have permission  😏", event.threadID, event.messageID);
  const { writeFileSync, readFileSync } = require("fs-extra");
  const { threadID, senderID, messageID } = event;
  const fs = require("fs-extra");
  const configPath = global.client.configPath;
  const config = require(configPath);
  const { selfListen } = global.config;
  if (config.FCAOption.selfListen == false) {
    config.FCAOption.selfListen = true;
    api.sendMessage("[ 𝐒𝐄𝐋𝐅 𝐋𝐈𝐒𝐓𝐄𝐍 ] - Active on ✅", threadID, messageID);
  } else {
    config.FCAOption.selfListen = false;
    api.sendMessage("[ 𝐒𝐄𝐋𝐅 𝐋𝐈𝐒𝐓𝐄𝐍 ] - Active off ✅", threadID, messageID);
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
  return;
}
