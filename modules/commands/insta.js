
module.exports.config = {
  name: 'insta',
  version: '1.1.1',
  hasPermssion: 0,
  credits: 'Raiden Shogun',
  description: 'Instagram widgets',
  commandCategory: 'What does it do?',
  usages: '< infouser|image|video|postuser >',
  cooldowns: 2,
  dependencies: {
    'image-downloader': ''
  }
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "instagram.jpg")) request("https://i.imgur.com/JBk7stP.png").pipe(fs.createWriteStream(dirMaterial + "instagram.jpg"));
}
const {
  image
} = require('image-downloader');
const moment = require('moment-timezone');
const {
  createReadStream, unlinkSync, mkdirSync, rmdirSync, writeFileSync
} = require('fs-extra');
const tinyURL = require('tinyurl');
const {
  get
} = require('axios');
const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1 : +n;
const fs = require("fs");

module.exports.run = async function ({
  api, event, args
}) {
  try {
    switch (args[0]) {
      case 'info': {
                const res = await get(`https://nvt.vantung3.repl.co/instagram/infouser?ig=${args[1]}`),d=__dirname + '/cache/instagram_.png';
                if(z=res.data[0].name, !!z || z == 'INVALID_USERNAME') return api.sendMessage(`User information not found`, event.threadID, event.messageID);
                api.sendMessage({
                    body: infoUser(res.data[0]), attachment: await stream_(res.data[0].profile_pic_url_hd,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
      case 'image': {
        const res = await get(`https://nvt.vantung3.repl.co/instagram/dlpost?url=${encodeURIComponent(args[1])}`);
        // console.log(res.data.edges);
        // d = __dirname + '/cache/instagram_.png'; edge_sidecar_to_children.edges[1].node.display_url
        // console.log(res.data);
        const allImage = await Promise.all(
          res.data.images.map(item => get(item, {
            responseType: 'stream'
          })
            .then(res => {
              res.data.path = `${Date.now()}.png`;
              return res.data;
            }))
        );

        api.sendMessage({
          body: infoImage(res.data, true),
          attachment: allImage
        }, event.threadID, event.messageID);
        break;
      }
      case 'video': {
        const res = await get(`https://nvt.vantung3.repl.co/instagram/dlpost?url=${encodeURIComponent(args[1])}`),
          d = __dirname + '/cache/instagram_.mp4';
        // console.log(res.data)
        api.sendMessage({
          body: infoVideo(res.data, true),
          attachment: await stream_(res.data.videos[0], d)
        }, event.threadID, () => unlinkSync(d), event.messageID);
        break;
      }
      /*case 'searchuser': {
          const res = await get(`https://${global.configApi.domain}/instagram/searchig?ig=${args[1]}`);
          runSearchUser(api, event, res.data.users, 6, +args[2]||0x2-1);
      break;
    }; */
      case 'postuser': {
        const res = await get(`https://apipremium-thanhali.thanhali.repl.co/instagram/getposts?apikey=ThanhAliVip_1234567890&username=${args[1]}`);
        // console.log(`https://${global.configApi.domain}/instagram/getposts?apikey=${global.configApi.apiKey}&username=${args[1]}`)
        runPostUser(api, event, res.data, 6, +args[2] || 0x1, false, event.senderID);
        break;
      }
      default: api.sendMessage({body:`🌸== [ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 ] ==🌸\n━━━━━━━━━━━━━\n\n/𝗶𝗻𝘀 𝗶𝗻𝗳𝗼 (username): View user information 👀\n\n/𝗶𝗻𝘀 𝗶𝗺𝗮𝗴𝗲 (Copy link) 📷: Upload photos\n\n/𝗶𝗻𝘀 𝘃𝗶𝗱𝗲𝗼 (Copy link): Transport video 🎞\n\n/𝗶𝗻𝘀 𝗽𝗼𝘀𝘁𝘂𝘀𝗲𝗿 (username): See user posts 📍`, attachment: fs.createReadStream(__dirname + `/noprefix/instagram.jpg`) }, event.threadID, event.messageID);
            };
        }catch(err) {
    // console.log(err);
    api.sendMessage(`${err}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({
  handleReply: $, api, event
}) {
  try {
    if (event.senderID != $.author) return;
    if ($.case == 'searchUser') if (['page', 'list'].includes(event.args[0].toLowerCase())) runSearchUser(api, event, $.data, 6, +event.args[1], $.type, $.author); else return api.sendMessage(`👉 Respond < page + 𝗦𝗧𝗧 | 𝗹𝗶𝘀𝘁 + 𝗦𝗧𝗧 >`, event.threadID, event.messageID);
    if ($.case == 'post') if (['page', 'list'].includes(event.args[0].toLowerCase())) runPostUser(api, event, $.data, 6, event.args[1]);
    else if (isFinite(event.args[0])) {
      const { node = {} } = $.data[$.type ? 'edge_felix_video_timeline' : 'edge_owner_to_timeline_media'].edges[event.args[0] - 1],
        d = __dirname + `/cache/fileeeee.${$.type ? 'mp4' : 'jpg'}`;
      const downloadeUrl = node[node.is_video ? 'video_url' : 'display_url'];
      const getFile = await get(downloadeUrl, {
        responseType: "stream"
      });
      // console.log(node, node.is_video)
      getFile.data.path = 'instagram.' + (node.is_video ? 'mp4' : 'jpg');
      // console.log(getFile.data.path)
      // writeFileSync(d, Buffer.from(getFile.data))
      api.sendMessage({
        body: $.type ? infoVideoInList(node, false) : infoVideoInList(node, false),
        attachment: getFile.data
      }, event.threadID, async (e) => {
        // console.log(e)
        // unlinkSync(d)
        if (e)
          return api.sendMessage(`An error occurred that the attachment could not be loaded.\nLink loaded: ${await tinyURL.shorten(downloadeUrl)}`, event.threadID, event.messageID);
      }, event.messageID);
    }
  } catch (err) {
    // console.log(err);
    api.sendMessage(`${err}`, event.threadID, event.messageID);
  }
};

module.exports.handleReaction = function ({
  handleReaction: $, api, event
}) {
  if (event.userID != $.author) return;
  runPostUser(api, event, $.data, 6, 0x2 - 1, $.type ? false : true, $.author);
};

async function stream_(url, dest) {
  await image({
    url, dest
  });
  return createReadStream(dest);
}
function check(a) {
  return a.replace(/null/g, 'No data available').replace(/false/g, 'Not').replace(/true/g, 'Have').replace(/undefined/g, 'Unknown');
}
function infoUser(a) {
        return check(`== [ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐈𝐍𝐅𝐎 ] ==\n━━━━━━━━━━━━━━\n\n👤 Name: ${a.full_name}\n📌 𝑰𝑫: ${a.username}\n🗨️ Biography: ${a.biography}\n🔗 Link: ${a.bio_links.join(', ')}\n📍 External links: ${a.external_url}\n👀 𝑭𝒐𝒍𝒍𝒐𝒘: ${a.follower_count}\n👥 𝑾𝒂𝒕𝒄𝒉𝒊𝒏𝒈: ${a.following_count}\n💻 𝑷𝒐𝒔𝒕: ${a.media_count}\n👁️‍🗨️ Private account: ${a.is_private}\n✅ Blue tick: ${a.is_verified}`);
    };
function infoImage(a, b) {
  // return check(`- Tiêu đề: ${x = a.edge_media_to_caption.edges, x.length == 0 ? null : x[0].node.text}\n- Lượt thích: ${a.edge_media_preview_like.count}\n- Lượt bình luận: ${a[!b ? 'edge_media_to_comment' : 'edge_media_to_parent_comment'].count}${b ? `\n- Tên: ${a.owner.full_name}\n- ID: ${a.owner.username}\n- Người theo dõi: ${a.owner.edge_followed_by.count}` : ``}`);

  return check(`== [ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐈𝐌𝐀𝐆𝐄 ] ==\n━━━━━━━━━━━━━━\n\n🗨️ 𝗖𝗮𝗽𝘁𝗶𝗼𝗻: ${a.caption}\n❤️ 𝗟𝗶𝗸𝗲: ${a.like_count}\n💭 𝗖𝗼𝗺𝗺𝗲𝗻𝘁: ${a.comment_count}\n⚜️ Name: ${a.owner.full_name}\n🌸 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${a.owner.username}`);
  // a.taken_at_timestamp
  // } \n - Tên: ${ a.user.full_name } \n - ID: ${ a.user.username } \n - Người theo dõi: ${ a.user.follower_count } `);
}
function infoVideo(a, b) {
  // return check(`- Tiêu đề: ${ x = a.edge_media_to_caption.edges, x.length == 0 ? null : x[0].node.text } \n - Lượt thích: ${ a.edge_media_preview_like.count } \n - Lượt xem: ${ a.video_view_count }${ b ? `\n- Lượt phát video: ${a.video_play_count}\n- Lượt bình luận: ${a.edge_media_to_parent_comment.count}` : `` } \n - Thời gian: ${ a.video_duration.toFixed() }s${ b ? `\n- Tên: ${a.owner.full_name}\n- ID: ${a.owner.username}\n- Người theo dõi: ${a.owner.edge_followed_by.count}` : `` } `);
  return check(`== [ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐕𝐈𝐃𝐄𝐎 ] ==\n━━━━━━━━━━━━━━\n\n🗨️ 𝗖𝗮𝗽𝘁𝗶𝗼𝗻: ${a.caption}\n❤️ 𝗟𝗶𝗸𝗲: ${a.like_count}\n💭 𝗖𝗼𝗺𝗺𝗲𝗻𝘁: ${a.comment_count}\n⚜️ Name: ${a.owner.full_name}\n🌸 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${a.owner.username}`);
}
function infoVideoInList(a) {
  return check(`== [ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐕𝐈𝐃𝐄𝐎 ] ==\n━━━━━━━━━━━━━━\n\n💭 𝗖𝗮𝗽𝘁𝗶𝗼𝗻: ${a.edge_media_to_caption.edges[0].node.text}\n👍 Likes: ${a.edge_liked_by.count}\n💬 Comments: ${a.edge_media_to_comment.count}\n👀 𝗩𝗶𝗲𝘄: ${a.video_view_count}`);
}
/* async function runSearchUser(a,b,c,d,e,g){
    var txt = '', i=(d*e)-d,at=new Array(),l=c.length,dir=__dirname+`/ cache / instagram_dir_${ b.messageID } `;mkdirSync(dir);
    for(;i++<(l<=d*e?l:d*e);){txt += `${ i }. ${ c[i].user.full_name } \n • UserName: ${ c[i].user.username } \n\n`;at.push(await stream_(c[i].user.profile_pic_url,dir+` / instagram_${ i }.jpg`));};
    txt += `____\n Trang[${ e } /${roof(c.length/d)}]\nReply[trang | list + STT]`; 
    a.sendMessage({body:check(txt),attachment:at}, b.threadID, (err, data) => {global.client.handleReply.push({
        name: 'instagram', messageID: data.messageID, author: b.senderID, data: c, 'case': 'searchUser'
    }) ;rmdirSync(dir, {recursive: true})},b.messageID);
 };*/
async function runPostUser(a, b, c, d, e, g, h) {
  try {
    let txt = '',
      i = (d * e) - d,
      n = c[g ? 'edge_felix_video_timeline' : 'edge_owner_to_timeline_media'].edges,
      l = n.length,
      iv = g ? 'video' : 'image',
      o,
      at = [],
      dir = __dirname + `/cache/instagram_dir_${b.messageID} `;
    mkdirSync(dir);

    for (; i++ < (l <= d * e ? l : d * e);) {
      const x = n[i - 1].node.edge_media_to_caption.edges || [];
      txt += `${i}. ${!x || x == 0 || !x[0].node || !x[0].node.text ? null : x[0].node.text}${g ? `(${n[i - 1].node.video_duration.toFixed()}s)` : ``} \n`; at.push(await stream_(n[i - 1].node['thumbnail_src'], dir + `/instagram_${i - 1}.jpg`));
    }
    txt += `\n--------------------------\n📝 You are now on the page < ${e} /${roof(n.length / d)} >\n\n🌸 Drop emotions if you want to move through the list ${g ? '𝗶𝗺𝗮𝗴𝗲' : '𝘃𝗶𝗱𝗲𝗼'} \n👉 ( Feedback ) + ( page|𝗹𝗶𝘀𝘁 + 𝗦𝗧𝗧 ) If you want to switch pages\n💜 ( Feedback + 𝗦𝗧𝗧 ) If you want to see ${iv}`;
    // console.log(txt)
    a.sendMessage({ body: check(txt), attachment: at }, b.threadID, (err, data) => {
      // console.log(err)
      o = {
        name: 'insta', messageID: data.messageID, author: h, data: c, 'case': 'post', type: g
      }; global.client.handleReply.push(o), global.client.handleReaction.push(o);
      rmdirSync(dir, { recursive: true });
    }, b.messageID);
  }
  catch (e) {
    console.log(e)
  }
}

// async function getStreamFile(url, path) {
//   const res = await axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   });
//   }
