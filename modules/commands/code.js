module.exports.config = {
    name: "code",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "read/write/cre/edit/del/rename",
    commandCategory: "code detect",
    usages: "",
    cooldowns: 2,
    dependencies: {
    }
};

module.exports.run = async({ api, event, args }) => {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const cheerio = global.nodemodule["cheerio"];
  const permission = ["100037743553265", ];
	if (!permission.includes(event.senderID)) return api.sendMessage("callad There's This  Code Breaker Boss:))", event.threadID, event.messageID);

    if (args.length == 0) return api.sendMessage("Syntax Error", event.threadID);
    var path = __dirname + '/';
    if (args[0] == "edit") {
        var newCode = event.body.slice(
            8 + args[1].length + args[0].length,
            event.body.length
        );
        console.log(newCode);
        fs.writeFile(
            `${__dirname}/${args[1]}.js`,
            newCode,
            "utf-8",
            function(err) {
                if (err)
                    return api.sendMessage(
                        `*An Error is occurred when applying new code to "${args[1]}.js".`
                    );
                api.sendMessage(
                    `new code applied  "${args[1]}.js".`,
                    event.threadID,
                    event.messageID
                );
            }
        );
    } else if (args[0] == "read") {
        var data = await fs.readFile(
            `${__dirname}/${args[1]}.js`,
            "utf-8",
            (err, data) => {
                if (err)
                    return api.sendMessage(
                        `error An occurred please try again later  when reading the command "${args[1]}.js".`,
                        event.threadID,
                        event.messageID
                    );
                api.sendMessage(data, event.threadID, event.messageID);
            }
        );
    }
    else if (args[0] == "-r") {
        var data = await fs.readFile(
            `${__dirname}/${args[1]}.js`,
            "utf-8",
            (err, data) => {
                if (err)
                    return api.sendMessage(
                        `*Error! An error occurred please try again later  when reading the command  "${args[1]}.js".`,
                        event.threadID,
                        event.messageID
                    );
                api.sendMessage(data, event.threadID, event.messageID);
            }
        );
    } else if (args[0] == "cre") {
        if (args[1].length == 0) return api.sendMessage("Unnamed  modules", event.threadID);
        if (fs.existsSync(`${__dirname}/${args[1]}.js`))
            return api.sendMessage(
                `${args[1]}.js đã tồn tại.`,
                event.threadID,
                event.messageID
            );
        fs.copySync(__dirname + "/example.js", __dirname + "/" + args[1] + ".js");
        return api.sendMessage(`successfully Created file "${args[1]}.js".`,
            event.threadID,
            event.messageID
        );
    }
     else if (args[0] == "del") {
        fs.unlink(`${__dirname}/${args[1]}.js`);
        return api.sendMessage(`unused  file config "${args[1]}.js".`, event.threadID, event.messageID)
    } 
    else if (args[0] == "rename") {
        fs.rename(`${__dirname}/${args[1]}.js`, `${__dirname}/${args[2]}.js`, function(err) {
            if (err) throw err;
            return api.sendMessage(
                `File renamed successfully "${args[1]}.js" wall "${args[2]}.js".`,
                event.threadID,
                event.messageID)
        });
    }
}