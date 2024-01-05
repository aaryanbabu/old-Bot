
module.exports.config = {
    name: "hi",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "",
    commandCategory: "không cần dấu lệnh",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": ""
    }
};
/*module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "hi.gif")) request("https://i.imgur.com/shIPtZI.gif").pipe(fs.createWriteStream(dirMaterial + "hi.gif"));
} */
module.exports.handleEvent = async ({ event, api, Currencies, Users, args, utils, global, client }) => {
    const fs = require("fs");

{
    var moment = require("moment-timezone");
    var hours = moment.tz('Asia/Kolkata').format('HHmm');
    var session = (
    hours > 401 && hours <= 700 ? "early morning" : 
    hours > 2001 && hours <= 2400 ? "good night" :
    hours > 701 && hours <= 1000 ? "good morning" :
    hours > 1001 && hours <= 1200 ? "nice shining" : 
    hours > 1201 && hours <= 1600 ? "good afternoon" : 
    hours > 1601 && hours <= 1800 ? "nice gloaming" : 
    hours > 1801 && hours <= 2000 ? "good evening" : 
    hours > 0001 && hours <= 400 ? "too late night" : 
    "error");
    
    var name = await Users.getNameUser(event.senderID);
    
    }
    // let msg = {body: `Hi ${name}, have a  ${session}`, mentions}
    // api.sendMessage(msg, event.threadID, (e, info) => {
    //   setTimeout(() => {
    //     api.sendMessage({sticker: sticker}, event.threadID);
    //   }, 100)
    // }, event.messageID)

  
    var msg = {
      body: `Hi ${name}, Have a ${session} ❤️`,
                attachment: fs.createReadStream(__dirname + `/noprefix/hi.gif`)
            }	
    if (event.body.toLowerCase() == "hello"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "hey"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("Use the wrong way and then lie",event.threadID)
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
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}




// module.exports.config = {
//     name: "hi",
//     version: "1.0.1",
//     hasPermssion: 0,
//     credits: "Kanichi",
//     description: "",
//     commandCategory: "không cần dấu lệnh",
//     usages: "",
//     cooldowns: 0,
//     denpendencies: {
//         "fs": "",
//         "request": ""
//     }
// };
// /*module.exports.onLoad = () => {
//     const fs = require("fs-extra");
//     const request = require("request");
//     const dirMaterial = __dirname + `/noprefix/`;
//     if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
//     if (!fs.existsSync(dirMaterial + "hi.gif")) request("https://i.imgur.com/shIPtZI.gif").pipe(fs.createWriteStream(dirMaterial + "hi.gif"));
// } */
// module.exports.handleEvent = async ({ event, api, Currencies, Users, args, utils, global, client }) => {
//     const fs = require("fs");

// {
//     var moment = require("moment-timezone");
//     var hours = moment.tz('Asia/Kolkata').format('HHmm');
//     var session = (
//     hours > 0001 && hours <= 500 ? "late night" : 
//     hours > 501 && hours <= 700 ? "bright morning" :
//     hours > 701 && hours <= 1000 ? "good morning" :
//     hours > 1001 && hours <= 1200 ? "nice shining" : 
//     hours > 1201 && hours <= 1700 ? "good afternoon" : 
//     hours > 1701 && hours <= 1800 ? "nice gloaming" : 
//     hours > 1801 && hours <= 2100 ? "good evening" : 
//     hours > 2101 && hours <= 2400 ? "late night" : 
//     "error");
    
//     var name = await Users.getNameUser(event.senderID);
    
//     }
//     // let msg = {body: `Hi ${name}, have a  ${session}`, mentions}
//     // api.sendMessage(msg, event.threadID, (e, info) => {
//     //   setTimeout(() => {
//     //     api.sendMessage({sticker: sticker}, event.threadID);
//     //   }, 100)
//     // }, event.messageID)

  
//     var msg = {
//       body: `Hi ${name}, Have a ${session} ❤️`,
//                 attachment: fs.createReadStream(__dirname + `/noprefix/hi.gif`)
//             }	
//     if (event.body.toLowerCase() == "hi"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//     if (event.body.toLowerCase() == "hello"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//    if (event.body.toLowerCase() == "helo"){
//         return api.sendMessage(msg,event.threadID,event.messageID);} 
//  if (event.body.toLowerCase() == "hallo"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//    if (event.body.toLowerCase() == "halo"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//    if (event.body.toLowerCase() == "hola"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//     if (event.body.toLowerCase() == "chào"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//     if (event.body.toLowerCase() == "hí"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//     if (event.body.toLowerCase() == "lô"){
//         return api.sendMessage(msg,event.threadID,event.messageID);}
//         };
// module.exports.run = async ({ event, api, Currencies, args, utils }) => {
// return api.sendMessage("Use the wrong way and then lie",event.threadID)
//           }

// module.exports.languages = {
//   "vi": {
//     "on": "Bật",
//     "off": "Tắt",
// 		"successText": `${this.config.name} thành công`,
// 	},
// 	"en": {
// 		"on": "on",
// 		"off": "off",
// 		"successText": "success!",
// 	}
// }

// module.exports.run = async ({ event, api, Threads, getText }) => {
//   let { threadID, messageID } = event;
//   let data = (await Threads.getData(threadID)).data;
// 	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
// 	else data["hi"] = true;
// 	await Threads.setData(threadID, {
// 		data
// 	});
// 	global.data.threadData.set(threadID, data);
// 	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
// }