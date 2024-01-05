const axios = require('axios');

module.exports.config = {
    name: "token",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kim Joseph DG Bien",
    description: "Facebook Token Getter",
    commandCategory: "tool",
    usages: "[user/uid/email] [password]",
    cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
    const username = args[0];
    const password = args[1];
    const prefix = global.config.PREFIX;

    if (!username || !password) {
        return api.sendMessage(`Usage: ${prefix}token [user/uid/email] [password]\nExample: ${prefix}token user123 pass123`, event.threadID);
    }

    try {
        const loadingMessage = await api.sendMessage("getting token...", event.threadID);

        const response = await axios.get(`https://hiroshi.hiroshiapi.repl.co/facebook/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        const data = response.data;

        if (data.status) {
            const tokenEAAV7 = data.data.access_token_eaad6v7 || 'N/A';
            const tokenEAAAAU = data.data.access_token || 'N/A';

            const resultMessage = `𝗘𝗔𝗔𝗗𝟲𝗩𝟳: ${tokenEAAV7}\n𝗘𝗔𝗔𝗔𝗔𝗨𝗔𝗭𝗔𝟴: ${tokenEAAAAU}`;

            api.sendMessage({ body: resultMessage }, event.threadID, () => api.unsendMessage(loadingMessage.messageID));
        } else {
            api.sendMessage(`Failed to get a token. Reason: ${data.message}`, event.threadID, () => api.unsendMessage(loadingMessage.messageID));
        }
    } catch (error) {
        api.sendMessage("An error occurred while fetching the token.", event.threadID, () => api.unsendMessage(loadingMessage.messageID));
    }
};