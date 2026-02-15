const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    version: "2.5.3",
    author: "ST | Sheikh Tamim",
    role: 0,
    countDown: 20,
    shortDescription: {
      en: "Owner & bot information"
    },
    longDescription: {
      en: "Show detailed information about the bot, owner, uptime and socials"
    },
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {

    const ownerName = "STARBOY Milon";
    const ownerAge = "N/A";
    const ownerFB = "https://www.facebook.com/share/17uGq8qVZ9/";
    const ownerNumber = "+88019XXXXXXX";
    const status = "Active";

    const botName = global.GoatBot?.config?.nickNameBot || "GoatBot";
    const prefix = global.GoatBot?.config?.prefix || "/";

    // 🧠 TOTAL COMMANDS
    const totalCommands = global.GoatBot?.commands?.size || 0;

    const images = [
      "https://files.catbox.moe/t2lti9.mp4"
    ];
    const image = images[Math.floor(Math.random() * images.length)];

    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    return message.reply({
      body: `
╔═《 ✨ 𝗢𝗪𝗡𝗘𝗥 & 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ✨ 》═╗

⭓ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲   : 『 𝗥𝗔𝗙𝗜 𝗕𝗢𝗧 』
⭓ ☄️ 𝗣𝗿𝗲𝗳𝗶𝘅      : 『 ! 』
⭓ 🧠 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀    : 『 ${totalCommands} 』
⭓ ⚡ 𝗨𝗽𝘁𝗶𝗺𝗲      : 『 ${uptimeString} 』
⭓ 🗓️ 𝗗𝗮𝘁𝗲        : 『 ${date} 』
⭓ ⏰ 𝗧𝗶𝗺𝗲        : 『 ${time} 』

⭓ 👑 𝗢𝘄𝗻𝗲𝗿      : 『 𝗦𝗶𝘆𝗮𝗺 𝗔𝗵𝗺𝗲𝗱 𝗥𝗮𝗳𝗶 』
⭓ 🎂 𝗔𝗴𝗲        : 『 17+』
⭓ ❤️ 𝗦𝘁𝗮𝘁𝘂𝘀     : 『 𝗦𝗶𝗻𝗴𝗲𝗹 』
⭓ 📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽  : 『880 1815843985 』
⭓ 🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸  : 『 facebook.id=61585437908438 』

╚══════════════════════════╝
`,
      attachment: await global.utils.getStreamFromURL(image)
    });
  }
};
