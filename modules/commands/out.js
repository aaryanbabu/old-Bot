module.exports.config = {
  name: "leave",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Priyansh Rajput",
  description: "out box",
  commandCategory: "System",
  usages: "[tid]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  const permission = ["100037743553265", "100037743553265"];
  if (!permission.includes(event.senderID))
  return api.sendMessage("Ye Command Meera Ko Alove Hai Bas out 😼", event.threadID, event.messageID);
  var id;
  if (!args.join(" ")) {
    id = event.threadID;
  } else {
    id = parseInt(args.join(" "));
  }
  return api.sendMessage('Obey the bow master 💌', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}