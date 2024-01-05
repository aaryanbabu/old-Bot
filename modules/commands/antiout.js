module.exports.config = {
    name: "antiout",
    version: "1.0.0",
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPermssion: 1,
    description: "Turn off antiout",
    usages: "antiout on/off",
    commandCategory: "system",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`𝗗𝗼𝗻𝗲 ✔️ ${(data["antiout"] == true) ? "𝗢𝗻" : "𝗢𝗳𝗳"} 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹 𝗔𝗻𝘁𝗶𝗼𝘂𝘁 🍒🍬 ✅`, event.threadID);

}