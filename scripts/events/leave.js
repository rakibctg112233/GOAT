const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "left",
    version: "1.0",
    author: "〲MAMUNツ࿐",
    countDown: 0,
    role: 0,
    description: "Send image when someone leaves the group",
    category: "events"
  },

  // এই অংশটি খালি রাখা হয়েছে যাতে 'onStart is missing' এরর না আসে
  onStart: async function () {},

  onEvent: async function ({ api, event, usersData }) {
    if (event.logMessageType === "log:unsubscribe") {
      const { threadID, logMessageData } = event;
      const leftID = logMessageData.leftParticipantFbId;

      if (leftID == api.getCurrentUserID()) return;

      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.ensureDirSync(cacheDir);
      
      const imgPath = path.join(cacheDir, "leftkick.jpg");

      try {
        const name = await usersData.getName(leftID) || "User";

        if (!fs.existsSync(imgPath)) {
          const res = await axios.get("https://i.imgur.com/dsZQoHA.jpeg", { responseType: "arraybuffer" });
          fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));
        }

        const msg = {
          body: `Bismillah... Kick! 😹\n\nGoodbye ${name}, one less person to deal with!`,
          mentions: [{
            id: leftID,
            tag: name
          }],
          attachment: fs.createReadStream(imgPath)
        };

        return api.sendMessage(msg, threadID);
      } catch (error) {
        console.error("Error in left event:", error);
      }
    }
  }
};
