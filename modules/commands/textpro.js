const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "textpro",
  version: "1.0",
  hasPermssion: 0,
  credits: `Priyansh Rajput`, 
  description: "Make your own logo using textpro",
usePrefix: true,
  commandCategory: "logo",
  usages: "Textpro list (page number) or textpro (logo) (text)",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `Logo list - Page 1:\n1. Premium-king\n2. Sand\n3. Sky\n4. Wallpant\n5. Beachv2\n6. Painting\n7. Black-metal\n8. Sketch\n9. Glitch-neon\n10. War\n11. Ghost-green\n12. Candyv2\n13. Christmusv2\n14. Metalv2\n15. Relics\n16. 3d-dragon\n17. Rust-metal\n18. Woodv2\n19. Beachv3\n20. Neon-love\n21. Neon-heart\n22. Birthday\n23. Dot-font\n24. Eid\n25. Sunset\n26. Skyfont\n27. Bluish\n28. Beachfont\n29. Ghostfont\n30. Greenleaf\n ✨Logo list made by 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷\n\nPAGE 1 - 3`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `Logo list - Page 2:\n31. Black-diamond\n32. Blackpinkv2\n33. Rainbow-sky\n34. Ring-light\n35. Goldenv2\n36. Sparkle\n37. Golden\n38. Newpurple\n39. Wood\n40. Goldv2\n41. woodv2\n42. Marble\n43. Bloodboard\n44. Drugs\n45. Chritsmus\n46. Foog\n47. Neon-rainbow\n48. Green-leaser\n50. Lightbubble\n51. Leaser-neon\n52. 3d-box\n53. Thunderv2\n54. Fish\n55. Jewerly\n56. Jewerlyv2\n57. Blue-mat\n58. Stone-wood\n59. Jokerlogo\n60. Wolflogo\n61. Premium\n ✨Logo list made by 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷\n\nPAGE 2 - 3`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `Logo list - Page 3:\n62. Ghost-theme\n63. Rainbow-king\n64. Pink-king\n65. 2024gif\n66. 2024\n67. Mat-neon\n68. Awesome\n69. Icev2\n70. Painitngv2\n71. Neon-pink\n72. Neonv2\n73. Thunder\n74. Strawberryv2\n75. Blackpink\n76. Font\n77. Pinkcandy\n78. Gold-font\n79. Silver\n80. Purple\n81. Strawberry\n82. Rainbow-drop\n83. Rainbow-box\n84. Purple-shiny\n85. Agni\n86. Green-diamond\n87. Bronze\n88. Balloon\n89. Balloonv2\n90. Unknown\n91. Ring\n92. Pinkv4\n ✨Logo list made by 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(`Invalid page number! Please use "list 1" or "list 2" or "list 3 in the total of list there are 92 textpro logo for now.".`, threadID, messageID);
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `Invalid command format! Use:Textpro list (page number) or textpro (logo) (text)`,
      threadID,
      messageID
    );
  }
  
  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;
  
  switch (type) {
    case "premium-king":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=87&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "sand":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=89&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "sky":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=93&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "wallpant":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=95&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "beachv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=96&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "painting":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=97&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "black-metal":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=91&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "sketch":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=101&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "glitch-neon":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=105&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "war":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=110&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ghost-green":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=111&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "candyv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=116&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "christmusv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=117&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "metalv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=121&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "relics":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=122&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "3d-dragon":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=207&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "3d":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=206&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "rust-metal":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=205&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "woodv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=204&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "beachv3":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=202&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "neon-love":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=201&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "neon-heart":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=200&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "birthday":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=198&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "dot-font":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=197&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "eid":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=194&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "sunset":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=193&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "skyfont":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=192&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "bluish":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=191&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "beachfont":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=190&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ghostfont":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=189&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "greenleaf":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=183&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "black-diamond":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=175&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "blackpinkv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=168&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "rainbow-sky":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=166&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ring-light":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=161&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "goldenv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=154&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "sparkle":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=182&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "golden":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=8&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "newpurple":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=10&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "wood":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=13&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "goldv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=16&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "woodv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=17&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "marble":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=20&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "bloodboard":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=21&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "drugs":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=22&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "christmus":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=24&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "foog":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=26&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "neon-rainbow":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=27&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "green-leaser":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=28&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "lightbubble":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=29&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "leaser-neon":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=32&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "3d-box":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=33&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "thunderv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=34&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "fish":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=39&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "jewerly":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=44&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "jewerlyv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=45&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "blue-mat":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=58&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "stone-wood":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=66&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "jokerlogo":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=67&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "wolflogo":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=68&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "premium":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=70&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ghost-theme":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=71&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "rainbow-king":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=74&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "pink-king":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=76&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "2024gif":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=78&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "2024":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=79&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "mat-neon":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=80&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "Awesome":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=85&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
      case "icev2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=94&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "paintingv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=98&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "neon-pink":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=100&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "neonv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=106&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "thunder":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=108&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "strawberryv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=109&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "blackpink":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=184&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "font":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=177&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "pinkcandy":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=2&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "gold-font":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=4&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "silver":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=5&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "purple":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=43&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "strawberry":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=40&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "rainbow-drop":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=42&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "rainbow-box":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=47&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "purple-shiny":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=50&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "agni":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=54&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "green-diamond":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=56&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "bronze":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=59&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "balloon":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=60&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ballonv2":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=61&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "unknown":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=84&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "ring":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=196&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
    case "pinkv4":
      apiUrl = `https://kxlpfl-3000.csb.app/api/textpro?number=165&text=${name}`;
      message = "✨Here's your Logo created by\n  𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 using Textpro 🌷";
      break;
      default:
      return api.sendMessage(`Invalid logo type! Use .textpro list 1 to see the list of textpro logos.`, threadID, messageID);
  }

  api.sendMessage("Processing your textpro image, please wait...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
