const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "chumma",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "kiss reply",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);
  var ThreadInfo = await api.getThreadInfo(event.threadID);
  var all = ThreadInfo.userInfo
  for (let c of all) {
    if (c.id == id) var gender1 = c.gender;
  };
if(gender1 == "FEMALE"){
    var tl = ["Ummmmmmaaaahhhhhh😘😘 Baby 😘", "Etni kissi 😘😘 mat karo baby mujhe sharam aati hai🫣🫣"];
  }
  var rand = tl[Math.floor(Math.random() * tl.length)]


   mess = "{name}"

  if (event.body.indexOf("😘")==0 || event.body.indexOf("kiss")==0 || event.body.indexOf("chumma")==0 || event.body.indexOf("kissi")==0) {
    var msg = {
      body: `${rand}`
    }
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
