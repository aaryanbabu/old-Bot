const fs = require("fs");
module.exports.config = {
	name: "khana",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "khana",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Khana")==0 || event.body.indexOf("khana")==0 || event.body.indexOf("Dinner")==0 || event.body.indexOf("dinner")==0) {
		var msg = {
				body: "Ye lo khana 🍽️",
				attachment: fs.createReadStream(__dirname + `/cache/khana.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍽️", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }