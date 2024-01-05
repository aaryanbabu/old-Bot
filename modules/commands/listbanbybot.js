module.exports.config = {
  name: "listban",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "View the list of boards of the group or of the user",
  commandCategory: "System",
  usages: "[thread/user]",
  cooldowns: 5
};
module.exports.handleReply = async function ({ api, args, Users, handleReply, event, Threads }) {
  const { threadID, messageID } = event;
  let name = await Users.getNameUser(event.senderID);
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  switch (handleReply.type) {
    case "unbanthread":
      {
        var arrnum = event.body.split(" ");
        var msg = "";
        var uidS = "";
        var strS = "";
        var modules = "👾------ 𝐔𝐧𝐛𝐚𝐧 ------👾\n"
        var nums = arrnum.map(n => parseInt(n));
        for (let num of nums) {
          var myString = handleReply.listBanned[num - 1];
          var str = myString.slice(3);
          let uidK = myString.split(":");
          const uid = (uidK[uidK.length - 1]).trim();

          const data = (await Threads.getData(uid)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Threads.setData(uid, { data });
          var typef = global.data.threadBanned.delete(uid, 1);
          msg += typef + ' ' + myString + "\n";
          uidS += ' ' + uid + "\n";
          strS += ' ' + str + "\n";
        }
        //console.log(modules, msg);
        api.sendMessage(`»Notification from Admin ${name}«\n\n-Your ${strS} group has just received an admin amnesty \n\n-Bots can be used now`, uidS, () =>
          api.sendMessage(`${global.data.botID}`, () =>
            api.sendMessage(`★★Enforcement 𝐔𝐧𝐛𝐚𝐧(𝐭𝐫𝐮𝐞/𝐟𝐚𝐥𝐬𝐞)★★\n\n${msg}`, event.threadID, () =>
              api.unsendMessage(handleReply.messageID))));
      }
      break;

    case 'unbanuser':
      {
        var arrnum = event.body.split(" ");
        var msg = "";
        var uidS = "";
        var strS = "";
        var modules = "👾------ 𝐔𝐧𝐛𝐚𝐧 ------👾\n"
        var nums = arrnum.map(n => parseInt(n));

        for (let num of nums) {
          var myString = handleReply.listBanned[num - 1];
          var str = myString.slice(3);
          let uidK = myString.split(":");
          const uid = (uidK[uidK.length - 1]).trim();

          const data = (await Users.getData(uid)).data || {};
          data.banned = 0;
          data.reason = null;
          data.dateAdded = null;
          await Users.setData(uid, { data });
          var typef = global.data.userBanned.delete(uid, 1);
          msg += typef + ' ' + myString + "\n";
          uidS += ' ' + uid + "\n";
          strS += ' ' + str + "\n";

        }
        //console.log(modules, msg);
        //api.sendMessage(`»Thông báo từ Admin ${name}«\n\n ${strS} \n\nBạn Đã Được Gỡ Ban để có thể tiếp tục sử dụng bot`, uidS, () =>
        // api.sendMessage(`${global.data.botID}`, () =>
        api.sendMessage(`★★Enforcement 𝐔𝐧𝐛𝐚𝐧(𝐭𝐫𝐮𝐞/𝐟𝐚𝐥𝐬𝐞)★★\n\n${msg}`, event.threadID, () =>
          api.unsendMessage(handleReply.messageID));
      }
      break;
  }
};

module.exports.run = async function ({ event, api, Users, args, Threads }) {
  const { threadID, messageID } = event;
  var listBanned = [], listbanViews = [];
  i = 1, j = 1;
  var dataThread = [];
  //var nameThread = [];
  switch (args[0]) {
    case "thread":
    case "t":
    case "-t":
      {
        const threadBanned = global.data.threadBanned.keys();
        //console.log(threadBanned)
        for (const singleThread of threadBanned) {
          const nameT = await global.data.threadInfo.get(singleThread).threadName || "Name does not exist";
          const reason = await global.data.threadBanned.get(singleThread).reason;
          const date = await global.data.threadBanned.get(singleThread).dateAdded;
          //const data = (await api.getThreadInfo(singleThread));
          //const nameT = data.name;
          var modules = "ThreadBan: "
          //console.log(modules, nameT)
          listBanned.push(`${i++}. ${nameT}\n🔰𝗧𝗜𝗗: ${singleThread}`);
          
          listbanViews.push(`${j++}. ${nameT}\n🔰𝗧𝗜𝗗: ${singleThread}\n📋Reason: ${reason}\n⏱𝗧𝗶𝗺𝗲: ${date}`);
          
        };

        return api.sendMessage(listbanViews.length != 0 ? api.sendMessage(`🎀 Currently includes ${listbanViews.length} group banned\n\n${listbanViews.join("\n\n")}` +
          "\n\nReply to this message + sequence number, can rep multiple numbers, separated by spaces if you want to unban the corresponding thread",
          threadID, (error, info) => {
            client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: 'unbanthread',
              listBanned
            });
          },
          messageID
        ) : "There are currently no groups banned 😻", threadID, messageID);
      }
    case "user":
    case "u":
    case "-u":
      {
        const userBanned = global.data.userBanned.keys();
        //console.log(userBanned)
        var modules = "UserBan: "
        for (const singleUser of userBanned) {
          const name = global.data.userName.get(singleUser) || await Users.getNameUser(singleUser);

          const reason = await global.data.userBanned.get(singleUser).reason;
          const date = await global.data.userBanned.get(singleUser).dateAdded;

          listbanViews.push(`${i++}. ${name} \n🔰𝗨𝗜𝗗: ${singleUser}\n📋Reason: ${reason}\n⏱𝗧𝗶𝗺𝗲: ${date}`);

          listBanned.push(`${j++}. ${name} \n🔰𝗨𝗜𝗗: ${singleUser}`);
          
          //console.log(modules, name)
        }
        return api.sendMessage(listbanViews.length != 0 ? api.sendMessage(`🌸 Currently includes ${listbanViews.length} banned user\n\n${listbanViews.join("\n\n")}` +
          "\n\nReply to this message + sequence number, can rep multiple numbers, separated by spaces if you want to unban the corresponding thread",
          threadID, (error, info) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: 'unbanuser',
              listBanned
            });
          },
          messageID
        ) : "There are currently no banned 😻 users", threadID, messageID);
      }

    default:
      {
        return global.utils.throwError(this.config.name, threadID, messageID);
      }
  }
          }