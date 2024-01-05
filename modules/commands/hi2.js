
module.exports.config = {
  name: "hi1",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "hi sticker",
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "hii",
    "hi",
    "hola",
    "chao",
    "hí",
    "híí",
    "hì",
    "hìì",
    "lô",
    "hii",
    "helo",
    "hê nhô"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
   
    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Kolkata').format('HHmm');
    let session = (
    hours > 401 && hours <= 700 ? "early morning" : 
    hours > 2001 && hours <= 2400 ? "good night" :
    hours > 701 && hours <= 1000 ? "good morning" :
    hours > 1001 && hours <= 1200 ? "nice shining" : 
    hours > 1201 && hours <= 1600 ? "good afternoon" : 
    hours > 1601 && hours <= 1800 ? "nice gloaming" : 
    hours > 1801 && hours <= 2000 ? "good evening" : 
    hours > 0001 && hours <= 400 ? "too late night" : 
    "error");
    
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    

 let msg = {body: `Hi ${name}, have a ${session}`}
    api.sendMessage(msg, event.threadID, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success!",
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi1"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}