const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "chummi",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "chummi",
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
  if(event.senderID == 100037743553265){
    var tl = ["Sir aap kab se ye kissi wale emoji use karne lage🤭🤭"];
  }
  else if(gender1 == "MALE"){
    var tl = ["Chi chi me ladko ko kissi nahi karta 🤮🤮", "Sharam nahi aati tumko kiss karte huye 🙂"];
  }
  // else{
  //   var tl = [""];
  // }
  var rand = tl[Math.floor(Math.random() * tl.length)]

  if (event.body.indexOf("😘")==0 || event.body.indexOf("kiss")==0 || event.body.indexOf("chumma")==0 || event.body.indexOf("kissi")==0) {
    var msg = {
      body: `${rand}`
    }
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😅", event.messageID, (err) => {}, true)
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
