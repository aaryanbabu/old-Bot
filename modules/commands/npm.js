module.exports.config = {
  name: "npm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "0",
  description: "View package",
  commandCategory: "Tool",
  usages: "npm",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var cc = args.join(" ");
  const res = await axios.get(`https://registry.npmjs.org/${cc}`)
  const a = res.data.author.name;
  const b = res.data.name;
  const c = res.data.description;
  const d = res.data["dist-tags"].latest;
  const e = res.data.keywords;
  const f = res.data.maintainers[0].name;
  const g = res.data.time.created;
  const h = res.data.repository.type;
  
  if (!cc) return api.sendMessage(`[⚜️] ➜ Please enter the package name to find!`, event.threadID, event.messageID);
  if (cc == undefined) return api.sendMessage(`[⚜️] ➜ Package does not exist`,event.threadID, event.messageID)
  return api.sendMessage({ body: `[💙]━━『 PACKAGE INFORMATION 』━━[💙]\n\n==== 𝗣𝗮𝗰𝗸𝗮𝗴𝗲: ${cc} ====\n[⚜️] ➜ 𝗔𝘂𝘁𝗵𝗼𝗿: ${a}\n[⚜️] ➜ Name: ${b}\n[⚜️] ➜ Describe: ${c}\n[⚜️] ➜ Version: ${d}\n[⚜️] ➜ 𝗞𝗲𝘆𝗪𝗼𝗿𝗱𝘀: ${e}\n[⚜️] ➜ Time Created: ${g}\n[⚜️] ➜ Repository Type: ${h}\n[⚜️] ➜ Maintainers: ${f}\n[⚜️] ➜ 𝗟𝗶𝗻𝗸: https://www.npmjs.com/package/${cc}` }, event.threadID, event.messageID);
};