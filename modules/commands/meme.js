module.exports.config = {
    name: "meme",
    version: "9.9.3",
    hasPermision: 0,
    credit: "Choru",
    description: "image",
    commandCategory: "random-img",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://meme-api.com/gimme`);
	console.log(res.data);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({ body:`hyuuj`
            },
                attachment: fs.createReadStream(__dirname + `/cache/image.jpg`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.jpg`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/image.jpg`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
}