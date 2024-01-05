var cred = "Priyansh Rajput";
module.exports.config = {
    name: "avatar",
    version: "1.0.0",
    hasPermision: 0,
    credits: `${cred}`,
    description: "Create banner",
    usages: "[name | sunnane]",
    commandCategory: "...",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
      if ((this.config.credits) != `${cred}`) { return api.sendMessage(`ulol change credits pa `, event.threadID, event.messageID)}
const content = args.join(" ").split("|").map(item => item = item.trim());
let name = content[0]
let subname = content[1]
	let callback = function() {
            return api.sendMessage({attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(`https://ai.new911.repl.co/api/tools/artist=${name}&song=${subname}`)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
}