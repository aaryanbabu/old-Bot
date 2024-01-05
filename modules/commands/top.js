module.exports.config = {
    name: "top",
    version: "1.1.1",
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPermssion: 0,
    description: "See top money, level... in the box or the sever?",
    usages: "[boxmoney|boxlevel|money|level] + list length(no default is 10)",
    commandCategory: "Box chat",
    cooldowns: 5
};
module.exports.run = async function({
    api: a,
    event: e,
    args: g,
    Currencies,
    Users
}) {
    const {
        threadID: t,
        messageID: m,
        senderID: s,
        participantIDs: pI
    } = e
    var arr = [],
        newArr = [],
        msg = "",
        type = g[0],
        leng = parseInt(g[1]) - 1
    const allType = ["boxmoney", "boxlevel", "money", "level"]
    if (!allType.includes(type)) return a.sendMessage(`➝ 𝗘𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 𝗧𝗢𝗣 𝘆𝗼𝘂 𝘄𝗮𝗻𝘁 𝘁𝗼 𝘃𝗶𝗲𝘄:\n━━━━━━━━━━━━━━━\n${allType.join(", ")}`, t, m)
    if (isNaN(leng) && leng) return a.sendMessage(`➝ 𝗟𝗶𝘀𝘁 𝗹𝗲𝗻𝗴𝘁𝗵 𝗺𝘂𝘀𝘁 𝗯𝗲 𝟭 𝗱𝗶𝗴𝗶𝘁`, t, m)
    switch (type) {
        case "boxmoney": {
            for (const id of pI) {
                let money = (await Currencies.getData(id)).money || 0
                arr.push({
                    id: id,
                    money: money
                })
            }
            arr.sort(S("money"))
            for (const i in arr) {
                newArr.push({
                    stt: i,
                    id: arr[i].id,
                    money: arr[i].money
                })
            }
            msg = `==== [ 𝗧𝗢𝗣 𝟭𝟬 𝗕𝗜𝗟𝗟𝗜𝗢𝗡𝗔𝗜𝗥𝗘𝗦 ] ====\n━━━━━━━━━━━━━━━\n`.toUpperCase()
            for (const i in newArr) {
                let name = (await Users.getData(newArr[i].id)).name || ""
                msg += `${i < 5 ? ICON(i) : `${i}.`} ${name}\n➝ 𝗠𝗢𝗡𝗘𝗬: ${CC(newArr[i].money)}$\n`
                if (i == leng && i < newArr.length || i == 10) break
            }
            let find = newArr.find(i => i.id == s)
            msg += TX("money", find.stt, find.money)
            a.sendMessage(msg, t, m)
        }
        break
    case "boxlevel": {
        for (const id of pI) {
            let exp = (await Currencies.getData(id)).exp || 0
            arr.push({
                id: id,
                exp: exp
            })
        }
        arr.sort(S("exp"))
        for (const i in arr) {
            newArr.push({
                stt: i,
                id: arr[i].id,
                exp: arr[i].exp
            })
        }
        msg = `== [ 𝗧𝗢𝗣 𝟭𝟬 𝗟𝗘𝗩𝗘𝗟 𝗚𝗥𝗢𝗨𝗣 ] ==\n━━━━━━━━━━━━━━━\n`.toUpperCase()
        for (const i in newArr) {
            let name = (await Users.getData(newArr[i].id)).name || ""
            msg += `${i < 5 ? ICON(i) : `${i}.`} ${name}\n• 𝗟𝗘𝗩𝗘𝗟: ${LV(newArr[i].exp)}\n`
            if (i == leng && i < newArr.length || i == 10) break
        }
        let find = newArr.find(i => i.id == s)
        msg += TX("level", find.stt, find.exp)
        a.sendMessage(msg, t, m)
    }
    break
    case "level": {
        let get = await Currencies.getAll(['userID', 'exp'])
        get.sort(S("exp"))
        for (const i in get) {
            arr.push({
                stt: i,
                id: get [i].userID,
                exp: get [i].exp
            })
        }
        msg = `= [ 𝗧𝗢𝗣 𝟭𝟬 𝗟𝗘𝗩𝗘𝗟 𝗦𝗘𝗩𝗘𝗥 ] =\n━━━━━━━━━━━━━━━\n`.toUpperCase()
        for (const i in arr) {
            let name = (await Users.getData(arr[i].id)).name || ""
            msg += `${i < 5 ? ICON(i) : `${i}.`} ${name}\n• 𝗟𝗘𝗩𝗘𝗟: ${LV(arr[i].exp)}\n`
            if (i == leng && i < arr.length || i == 10) break
        }
        let find = arr.find(i => i.id == s)
        msg += TX("level", find.stt, find.exp)
        a.sendMessage(msg, t, m)
    }
    break
    case "money": {
        let get = await Currencies.getAll(['userID', 'money'])
        get.sort(S("money"))
        for (const i in get) {
            arr.push({
                stt: i,
                id: get [i].userID,
                money: get [i].money
            })
        }
        msg = `==== [ 𝗧𝗢𝗣 𝟭𝟬 𝗕𝗜𝗟𝗟𝗜𝗢𝗡𝗔𝗜𝗥𝗘𝗦 ] ====\n━━━━━━━━━━━━━━━\n`.toUpperCase()
        for (const i in arr) {
            let name = (await Users.getData(arr[i].id)).name || ""
            msg += `${i < 5 ? ICON(i) : `${i}.`} ${name}\n• 𝗠𝗢𝗡𝗘𝗬: ${CC(arr[i].money)}$\n`
            if (i == leng && i < arr.length || i == 10) break
        }
        let find = arr.find(i => i.id == s)
        msg += TX("money", find.stt, find.money)
        a.sendMessage(msg, t, m)
    }
    break
    }
}

function LV(x) {
    return Math.floor((Math.sqrt(1 + (4 * x) / 3) + 1) / 2)
}

function CC(n) {
    return n.toLocaleString('en-US', {
        minimumFractionDigits: 2
    })
}

function ICON(i) {
    return i == 0 ? "🏆" : i == 1 ? "🥇" : i == 2 ? "🥈" : i == 3 ? "🥉" : i == 4 ? "💎" : ""
}

function S(k) {
    return function(a, b) {
        let i = 0;
        if (a[k] > b[k]) {
            i = 1
        } else if (a[k] < b[k]) {
            i = -1
        }
        return i * -1
    }
}

function TX(tx, i, x) {
  return `━━━━━━━━━━━━━━━\n${i >= 11 ? `➝ 𝗬𝗼𝘂 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆 𝗵𝗼𝗹𝗱 𝘁𝗵𝗲 𝘀𝗲𝗰𝗼𝗻𝗱 𝗽𝗼𝘀𝗶𝘁𝗶𝗼𝗻: ${i}\n➝ ${tx == "money" ? `𝗠𝗢𝗡𝗘𝗬: ${CC(x)}$` : `𝗟𝗘𝗩𝗘𝗟: ${LV(x)}`}` : i >= 1 && i <= 4 ? "➝ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆 𝗶𝗻 𝘁𝗵𝗲 𝗧𝗢𝗣 𝟭𝟬 𝗹𝗶𝘀𝘁 " : i == 0 ? "➝ 𝗬𝗼𝘂 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆 𝗵𝗼𝗹𝗱 𝘁𝗵𝗲 𝗧𝗢𝗣 𝟭 𝗽𝗼𝘀𝗶𝘁𝗶𝗼𝗻" : "➝ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆 𝗶𝗻 𝘁𝗵𝗲 𝗧𝗢𝗣 𝟭𝟬 𝗹𝗶𝘀𝘁"}`
}