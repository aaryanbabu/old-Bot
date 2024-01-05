module.exports.config = {
    name: 'instagram',
    version: '1.1.1',
    hasPermssion: 0,
    credits: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭',
    description: 'Informatin of Instagram user',
    commandCategory: 'Information',
    usages: '< infouser|image|video|postuser >',
    cooldowns: 2,
    dependencies: {
        'image-downloader': '',
    }
};
     const fs = require("fs");
const {
    image
} = require('image-downloader');
const {
    createReadStream, unlinkSync, mkdirSync, rmdirSync
} = require('fs-extra');
const {
    get
} = require('axios');
const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1: +n;
module.exports.run = async function({
    api, event, args
}) {
    try {
        switch (args[0]) {
            case 'infouser': {
                const res = await get(`https://APITHANHALIsharon.shar0n.repl.co/instagram/infouser?apikey=ThanhAliVip_1234567890&ig=${args[1]}`),d=__dirname + '/cache/instagram_.png';
                if(z=res.data[0].name, !!z || z == '𝗜𝗡𝗩𝗔𝗟𝗜𝗗_𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘') return api.sendMessage(`→ 𝐔𝐬𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`, event.threadID, event.messageID);
                api.sendMessage({
                    body: infoUser(res.data[0]), attachment: await stream_(res.data[0].profile_pic_url_hd,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            case 'image': {
                const res = await get(`https://APITHANHALIsharon.shar0n.repl.co/instagram/downloadpost?apikey=ThanhAliVip_1234567890&url=${args[1]}`),d=__dirname + '/cache/instagram_.png';
                api.sendMessage({
                    body: infoImage(res.data,true), attachment: await stream_(res.data.display_url,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            case 'video': {
                const res = await get(`https://APITHANHALIsharon.shar0n.repl.co/instagram/downloadpost?apikey=ThanhAliVip_1234567890&url=${args[1]}`),d=__dirname + '/cache/instagram_.mp4';
                api.sendMessage({
                    body: infoVideo(res.data,true), attachment: await stream_(res.data.video_url,d)
                }, event.threadID, ()=>unlinkSync(d),event.messageID);
            }; break;
            case 'searchuser': {
                const res = await get(`https://APITHANHALIsharon.shar0n.repl.co/instagram/searching?apikey=ThanhAliVip_1234567890&ig=${args[1]}`);
                runSearchUser(api, event, res.data.users, 6, +args[2]||0x2-1);
            }; break;
            case 'postuser': {
                const res = await get(`https://APITHANHALIsharon.shar0n.repl.co/instagram/postuser?apikey=ThanhAliVip_1234567890&username=${args[1]}`);
                runPostUser(api, event, res.data.data.user, 6, +args[2]||0x1,true,event.senderID);
            }; break;
            default: api.sendMessage({body :`==== 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐓𝐈𝐎𝐍𝐒 ====\n\n→ 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐢𝐧𝐟𝐨𝐮𝐬𝐞𝐫 < 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞 >: 𝐕𝐢𝐞𝐰 𝐮𝐬𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧\n→ 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐢𝐦𝐚𝐠𝐞 < 𝐜𝐨𝐩𝐲 𝐥𝐢𝐧𝐤 >: 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐩𝐡𝐨𝐭𝐨\n→ 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐯𝐢𝐝𝐞𝐨 < 𝐜𝐨𝐩𝐲 𝐥𝐢𝐧𝐤 >: 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐯𝐢𝐝𝐞𝐨\n→ 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐩𝐨𝐬𝐭𝐮𝐬𝐞𝐫 < 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞 >: 𝐕𝐢𝐞𝐰 𝐩𝐞𝐨𝐩𝐥𝐞'𝐬 𝐩𝐨𝐬𝐭𝐬 𝐮𝐬𝐞`,attachment: fs.createReadStream(__dirname + `/cache/ins.jpg`) }, event.threadID,event.messageID);
            };
        }catch(err) {
            api.sendMessage(`${err}`, event.threadID, event.messageID)
        };
    };
    module.exports.handleReply = async function({
        handleReply: $, api, event
    }){
        try {
      if(event.senderID != $.author) return;
     if ($.case == 'searchUser') if(['trang', 'list'].includes(event.args[0].toLowerCase())) runSearchUser(api, event, $.data, 6, +event.args[1],$.type,$.author); else return api.sendMessage(`Phản hồi < trang + STT | list + STT >`, event.threadID, event.messageID);
     if ($.case == 'post') if (['trang', 'list'].includes(event.args[0].toLowerCase())) runPostUser(api, event, $.data, 6, event.args[1]); else if(isFinite(event.args[0])) {
         const {node={}}=$.data[$.type?'edge_felix_video_timeline':'edge_owner_to_timeline_media'].edges[event.args[0]-0x1],d=__dirname + `/cache/instagram_.${$.type?'mp4':'jpg'}`;
         api.sendMessage({
         body: $.type?infoVideo(node,false):infoImage(node,false), attachment: await stream_(node[$.type?'video_url':'display_url'],d)
     }, event.threadID, ()=>unlinkSync(d),event.messageID)
     };
        }catch(err){
            api.sendMessage(`${err}`, event.threadID, event.messageID);
        };
    };
    module.exports.handleReaction = function({
        handleReaction: $, api, event
    }){
      if (event.userID!=$.author)return;
      runPostUser(api, event, $.data, 6, 0x2-1, $.type?false:true,$.author);
    };
    async function stream_(url, dest) {
        await image({
            url, dest
        });
        return createReadStream(dest);
    };
    function check(a) {
        return a.replace(/null/g, 'No data').replace(/false/g, 'are not').replace(/true/g, 'Have').replace(/undefined/g, 'Unknown');
    };
    function infoUser(a) {
        return check(`=== 𝐔𝐬𝐞𝐫 𝐚𝐜𝐜𝐨𝐮𝐧𝐭𝐬 ====\n━━━━━━━━━━━━━━━━━━\n\n→ 𝐍𝐚𝐦𝐞: ${a.full_name}\n→ 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${a.username}\n→ 𝐁𝐢𝐨𝐠𝐫𝐚𝐩𝐡𝐲: ${a.biography}\n→ 𝐋𝐢𝐧𝐤: ${a.bio_links.join(', ')}\n→ 𝐄𝐱𝐭𝐞𝐫𝐧𝐚𝐥 𝐥𝐢𝐧𝐤𝐬: ${a.external_url}\n→ 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬: ${a.follower_count}\n→ 𝐖𝐚𝐭𝐜𝐡𝐢𝐧𝐠: ${a.following_count}\n→ 𝐍𝐮𝐦𝐛𝐞𝐫 𝐨𝐟 𝐩𝐨𝐬𝐭𝐬: ${a.media_count}\n→ 𝐏𝐫𝐢𝐯𝐚𝐭𝐞 𝐚𝐜𝐜𝐨𝐮𝐧𝐭: ${a.is_private}\n→ 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐯𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧: ${a.is_verified}`);
    };
    function infoImage(a,b) {
       return check(`=== 𝐏𝐡𝐨𝐭𝐨 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 ====\n━━━━━━━━━━━━━━━━━━\n\n→ 𝐇𝐞𝐚𝐝𝐥𝐢𝐧𝐞: ${x=a.edge_media_to_caption.edges, x.length == 0 ? null: x[0].node.text}\n→ 𝐋𝐢𝐤𝐞𝐬: ${a.edge_media_preview_like.count}\n→ 𝐂𝐨𝐦𝐦𝐞𝐧𝐭𝐬: ${a[!b?'edge_media_to_comment':'edge_media_to_parent_comment'].count}${b?`\n→ 𝐍𝐚𝐦𝐞: ${a.owner.full_name}\n→ 𝗜𝗗: ${a.owner.username}\n→ 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬: ${a.owner.edge_followed_by.count}`:``}`);
    };
    function infoVideo(a,b) {
        return check(`=== 𝐕𝐢𝐝𝐞𝐨 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 ====\n━━━━━━━━━━━━━━━━━━\n\n→ 𝐇𝐞𝐚𝐝𝐥𝐢𝐧𝐞: ${x=a.edge_media_to_caption.edges, x.length == 0 ? null: x[0].node.text}\n→ 𝐋𝐢𝐤𝐞𝐬: ${a.edge_media_preview_like.count}\n→ 𝐕𝐢𝐞𝐰𝐬: ${a.video_view_count}${b?`\n→ 𝐕𝐢𝐝𝐞𝐨 𝐩𝐥𝐚𝐲𝐬: ${a.video_play_count}\n→ 𝐂𝐨𝐦𝐦𝐞𝐧𝐭𝐬: ${a.edge_media_to_parent_comment.count}`:``}\n→ 𝐓𝐢𝐦𝐞: ${a.video_duration.toFixed()}s${b?`\n→ 𝐍𝐚𝐦𝐞: ${a.owner.full_name}\n→ 𝗜𝗗: ${a.owner.username}\n→ 𝐍𝐮𝐦𝐛𝐞𝐫 𝐨𝐟 𝐟𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬: ${a.owner.edge_followed_by.count}`:``}`);
    };



   async function runSearchUser(a,b,c,d,e,g){
       var txt = '', i=(d*e)-d,at=new Array(),l=c.length,dir=__dirname+`/cache/instagram_dir_${b.messageID}`;mkdirSync(dir);
       for(;i++<(l<=d*e?l:d*e);){txt += `${i}. ${c[i].user.full_name}\n • UserName: ${c[i].user.username}\n\n`;at.push(await stream_(c[i].user.profile_pic_url,dir+`/instagram_${i}.jpg`));};
       txt += `____\n Trang[${e}/${roof(c.length/d)}]\nReply [trang | list + STT]`; 
       a.sendMessage({body:check(txt),attachment:at}, b.threadID, (err, data) => {global.client.handleReply.push({
           name: 'instagram', messageID: data.messageID, author: b.senderID, data: c, 'case': 'searchUser'
       }) ;rmdirSync(dir, {recursive: true})},b.messageID);
    };




 async function runPostUser(a,b,c,d,e,g,h){
       var txt='',i=(d*e)-d,n=c[g?'edge_felix_video_timeline':'edge_owner_to_timeline_media'].edges,l=n.length,iv=g?'video':'image',o,at=[],dir=__dirname+`/cache/instagram_dir_${b.messageID}`;mkdirSync(dir);
       for (;i++<(l<=d*e?l:d*e);) {
       var x=n[i-1].node.edge_media_to_caption.edges||[];
       txt+=`${i}. ${!x||x==0||!x[0].node||!x[0].node.text?null:x[0].node.text}${g?`(${n[i-1].node.video_duration.toFixed()}s)`:``}\n`;at.push(await stream_(n[i-1].node['thumbnail_src'],dir+`/instagram_${i-1}.jpg`));
       };
       txt+=`\nPage < ${e}/${roof(n.length/d)} >\n\n- Release emotions to switch to the list${g?'image':'video'}\n- < Feedback > + < trang|list + STT > To transfer tabs\n- < Feedback + STT > let's see ${iv}`;
       a.sendMessage({body:check(txt),attachment:at}, b.threadID, (err, data) => {
       o={
           name: 'instagram', messageID: data.messageID, author: h, data: c, 'case': 'post', type: g
       }; global.client.handleReply.push(o),global.client.handleReaction.push(o);
       rmdirSync(dir, {recursive: true})
       }, b.messageID);
    }