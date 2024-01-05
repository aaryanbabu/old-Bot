module.exports.config = {
    name: "restart",
    version: "2.0.2",
    hasPermssion: 3,
    credits: "Mirai Team",
    description: "Khởi động lai bot",
    commandCategory: "Hệ Thống",
    usages: "restart",
    cooldowns: 5,
    dependencies: { }
}
 
module.exports.run = async function({ api, args, Users, event}) {
const { threadID, messageID } = event;
const axios = global.nodemodule["axios"];

const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Kolkata").format("HH");
    var phut = moment.tz("Asia/Kolkata").format("mm");
    var giay = moment.tz("Asia/Kolkata").format("ss");
const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
  if (event.senderID != 100037743553265) return api.sendMessage(`[❗] Good luck next time`, event.threadID, event.messageID)
if(args.length == 0) api.sendMessage(`💟 Hi ${name}\n🔰 Please wait a moment, the system will restart in 10 seconds`,event.threadID, () =>process.exit(1))
else{    
let time = args.join(" ");
setTimeout(() =>
api.sendMessage(`🔮 The bot will restart after the time Admin set\n⏰Now is: ${gio}:${phut}:${giay} `, threadID), 0)
setTimeout(() =>
api.sendMessage("⌛ Perform the restart process",event.threadID, () =>process.exit(1)), 1000*`${time}`);
}
}