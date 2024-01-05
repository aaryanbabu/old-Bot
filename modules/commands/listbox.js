module.exports.config = {
    name: 'listbox',
    version: '1.0.0',
    credits: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭',
    hasPermssion: 2,
    description: '[Ban/Unban/Remove] List thread bot joined',
    commandCategory: 'Admin',
    usages: '[Pages/All]',
    cooldowns: 5
};

module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {
    const { threadID, messageID } = event;
    if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
    var arg = event.body.split(" ");
    //var idgr = handleReply.groupid[arg[1] - 1];
    //var groupName = handleReply.groupName[arg[1] - 1];
    switch (handleReply.type) {
        case "reply":
            {
                if (arg[0] == "ban" || arg[0] == "Ban") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "------- Execution Board -------\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];

                        const data = (await Threads.getData(idgr)).data || {};
                        data.banned = 1;
                        data.dateAdded = time;
                        var typef = await Threads.setData(idgr, { data });
                        global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
                        msg += '🌸 Condition: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`» Notification from admin «\n\n\nYour team has just been banned by the admin, please show your apologies before it's too late 😈`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`===== [ 𝗕𝗔𝗡 𝗕𝗢𝗫 ] =====\n━━━━━━━━━━━━━\n\n${msg}`, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }

                if (arg[0] == "unban" || arg[0] == "Unban" || arg[0] == "ub" || arg[0] == "Ub") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "------- Unban Enforcement -------\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];

                        const data = (await Threads.getData(idgr)).data || {};
                        data.banned = 0;
                        data.dateAdded = null;
                        var typef = await Threads.setData(idgr, { data });
                        global.data.threadBanned.delete(idgr, 1);
                        msg += '🌸 Condition: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`» Notification from Admin «\n\nAdmin has just unboarded your team, please use the bot smarter 😘`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`==== [ 𝗨𝗡𝗕𝗔𝗡 𝗕𝗢𝗫 ] ====\n━━━━━━━━━━━━━\n\n${msg}`, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }

                if (arg[0] == "out" || arg[0] == "Out") {
                    var arrnum = event.body.split(" ");
                    var msg = "";
                    var modules = "------- Execution Out -------\n"
                    var nums = arrnum.map(n => parseInt(n));
                    nums.shift();
                    for (let num of nums) {
                        var idgr = handleReply.groupid[num - 1];
                        var groupName = handleReply.groupName[num - 1];
                        var typef = api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
                        msg += '🌸 Condition: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                        console.log(modules, msg)
                    }
                    api.sendMessage(`» Notification from Admin «\n\nGoodbye and no see you again, when we are more conscious, we will meet again 👋`, idgr, () =>
                        api.sendMessage(`${global.data.botID}`, () =>
                            api.sendMessage(`==== [ 𝗢𝗨𝗧 𝗕𝗢𝗫 ] ====\n━━━━━━━━━━━━━\n\n${msg} `, threadID, () =>
                                api.unsendMessage(handleReply.messageID))));
                    break;
                }
            }
    }
};
module.exports.run = async function({ api, event, args }) {
    switch (args[0]) {
        case "all":
            {
                var inbox = await api.getThreadList(100, null, ['INBOX']);
                let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
                var listthread = [];
                var listbox = [];
                /////////
                for (var groupInfo of list) {
                    //let data = (await api.getThreadInfo(groupInfo.threadID));
                    //const listUserID = event.participantIDs.filter(ID => ID);
                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name || "Unnamed",
                        messageCount: groupInfo.messageCount
                    });
                }
                /////////
                var listbox = listthread.sort((a, b) => {
                    if (a.messageCount > b.messageCount) return -1;
                    if (a.messageCount < b.messageCount) return 1;
                });
                /////////  
                var groupid = [];
                var groupName = [];
                var page = 1;
                page = parseInt(args[0]) || 1;
                page < -1 ? page = 1 : "";
                var limit = 50;
                var msg = "== [ GROUP LIST ] ==\n━━━━━━━━━━━━━\n\n";
                var numPage = Math.ceil(listbox.length / limit);

                for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                    if (i >= listbox.length) break;
                    let group = listbox[i];
                    msg += `${i + 1}. ${group.name}\n🔰 𝗧𝗜𝗗: ${group.id}\n📩 Number of messages: ${group.messageCount}\n`;
                    groupid.push(group.id);
                    groupName.push(group.name);
                }
                msg += `\n-------- Page ${page}/${numPage} --------\nUse ${global.config.PREFIX}listbox all + số trang\n\n`

                api.sendMessage(msg + '👉 Reply Out, Ban, Unban + sequence number, can rep multiple numbers, separated by spaces if you want Out, Ban, Unban that group', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        groupName,
                        type: 'reply'
                    })
                )
            }
            break;

        default:
            try {
                var inbox = await api.getThreadList(100, null, ['INBOX']);
                let list = [...inbox].filter(group =>  group.isSubscribed && group.isGroup);
                var listthread = [];
                var listbox = [];
                /////////
                for (var groupInfo of list) {
                    //let data = (await api.getThreadInfo(groupInfo.threadID));
                    //const listUserID = event.participantIDs.filter(ID => ID);
                    listthread.push({
                        id: groupInfo.threadID,
                        name: groupInfo.name || "Unnamed",
                        messageCount: groupInfo.messageCount
                    });

                } //for
                var listbox = listthread.sort((a, b) => {
                    if (a.messageCount > b.messageCount) return -1;
                    if (a.messageCount < b.messageCount) return 1;
                });
                var groupid = [];
                var groupName = [];
                var page = 1;
                page = parseInt(args[0]) || 1;
                page < -1 ? page = 1 : "";
                var limit = 15;
                var msg = "== [ GROUP LIST ] ==\n━━━━━━━━━━━━━\n\n";
                var numPage = Math.ceil(listbox.length / limit);

                for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                    if (i >= listbox.length) break;
                    let group = listbox[i];
                    msg += `${i + 1}. ${group.name}\n🔰 𝗧𝗜𝗗: ${group.id}\n📩 Number of messages: ${group.messageCount}\n\n`;
                    groupid.push(group.id);
                    groupName.push(group.name);
                }
                msg += `\n-------- Page ${page}/${numPage} --------\nUse ${global.config.PREFIX}listbox + Pages/All\n\n`

                api.sendMessage(msg + '👉 Reply Out, Ban, Unban + sequence number, can rep multiple numbers, separated by spaces if you want Out, Ban, Unban that group', event.threadID, (e, data) =>
                    global.client.handleReply.push({
                        name: this.config.name,
                        author: event.senderID,
                        messageID: data.messageID,
                        groupid,
                        groupName,
                        type: 'reply'
                    })
                )
            } catch (e) {
                return console.log(e)
            }
    }
};
