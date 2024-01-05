module.exports.config = {
  name: "song",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "𝙉𝘼𝙐𝙂𝙃𝙏𝙔 ツ",
  description: "Play a song",
  commandCategory: "utility",
  usages: "[title]",
  prefix: true,
  cooldowns: 20,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/KOLKATA").format("HH:mm:ss");
  var timestart = Date.now();
  
  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("Please put a song", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`Finding "${song}". Please wait...`, event.threadID);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "videoandaudio" });

    const fileName = `${event.senderID}.mp4`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath))
    .on("close", async () => {
          var stream = await ytdl.getInfo(link)
          var result = {
              title: stream.videoDetails.title,
              dur: Number(stream.videoDetails.lengthSeconds),
              viewCount: stream.videoDetails.viewCount,
              likes: stream.videoDetails.likes,
              uploadDate: stream.videoDetails.uploadDate,
              sub: stream.videoDetails.author.subscriber_count,
              author: stream.videoDetails.author.name,
              timestart: timestart
        }
        resolveFunc(result)
    });

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 36214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('35mb', event.threadID);
      }

      const message = {
        body: `🎵 
Title: ${video.title}
⏱️ Artist: ${video.author.name}\n${stream.viewCount}\n⏳ → 𝗧𝗶𝗺𝗲 𝗧𝗮𝗸𝗲𝗻́: ${Math.floor((Date.now()- data.timestart)/1000)} 𝗦𝗲𝗰𝗼𝗻𝗱𝘀`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};

