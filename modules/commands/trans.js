module.exports.config = {
  name: "trans",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Priyansh Rajput ",
  description: "Text translation",
  commandCategory: "media",
  usages: `${global.config.PREFIX}trans (hi,en,vi,ur,etc)`,
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const request = global.nodemodule["request"];
  const targetLanguage = args[0];
  const content = args.slice(1).join(" ");

  if (content.length === 0 && event.type !== "message_reply")
    return global.utils.throwError(this.config.name, event.threadID, event.messageID);

  let translateThis, lang;

  if (event.type === "message_reply") {
    translateThis = event.messageReply.body;
    lang = targetLanguage || global.config.language;
  } else {
    translateThis = content;
    lang = targetLanguage || global.config.language;
  }

  return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
    if (err)
      return api.sendMessage("An error has occurred!", event.threadID, event.messageID);

    const retrieve = JSON.parse(body);
    let text = '';
    retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
    const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];

    api.sendMessage(`❯ Translation: ${text}\n - Translated from ${fromLang} to ${lang}`, event.threadID, event.messageID);
  });
};