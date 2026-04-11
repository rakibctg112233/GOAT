const moment = require("moment-timezone");

module.exports.config = {
  name: "autotimer",
  version: "5.1",
  role: 0,
  author: "ꜰᴀʀʜᴀɴ-ᴋʜᴀɴ", // 🔒 লক করা
  description: "⏰ প্রতি ঘণ্টায় অটো টেক্সট মেসেজ পাঠাবে (Video Removed)",
  category: "AutoTime",
  countDown: 3,
};

module.exports.onLoad = async function ({ api }) {
  // 🔒 Author নাম চেক
  if (module.exports.config.author !== "ꜰᴀʀʜᴀɴ-ᴋʰᴀɴ") {
    console.error("❌ Author নাম পরিবর্তন করা হয়েছে। ফাইল চলবে না।");
    return process.exit(1);
  }

  const timerData = {
    "12:00 AM": "⌚┆এখন রাত ১২টা বাজে❥︎খাউয়া দাউয়া করে নেউ,🍽️🍛",
    "01:00 AM": "⌚┆এখন রাত ১টা বাজে❥︎সবাই শুয়ে পড়ো,🌌💤",
    "02:00 AM": "⌚┆এখন রাত ২টা বাজে❥︎প্রেম না কইরা ঘুমা,😾🌠",
    "03:00 AM": "⌚┆এখন রাত ৩টা বাজে❥︎যারা ছ্যাকা খাইছে তারা জেগে আছে,🫠🌃",
    "04:00 AM": "⌚┆এখন রাত ৪টা বাজে❥︎ফজরের প্রস্তুতি নাও,🌄",
    "05:00 AM": "⌚┆এখন সকাল ৫টা বাজে❥︎নামাজ পড়ছো তো?🌅☀️",
    "06:00 AM": "⌚┆এখন সকাল ৬টা বাজে❥︎ঘুম থেকে উঠো সবাই,🌞☕",
    "07:00 AM": "⌚┆এখন সকাল ৭টা বাজে❥︎ব্রেকফাস্ট করে নাও,🍞",
    "08:00 AM": "⌚┆এখন সকাল ৮টা বাজে❥︎কাজ শুরু করো মন দিয়ে,🌤️✨",
    "09:00 AM": "⌚┆এখন সকাল ৯টা বাজে❥︎চল কাজে মন দিই!🕘",
    "10:00 AM": "⌚┆এখন সকাল ১০টা বাজে❥︎তোমাদের মিস করছি,🌞☀️",
    "11:00 AM": "⌚┆এখন সকাল ১১টা বাজে❥︎কাজ চালিয়ে যাও!😌",
    "12:00 PM": "⌚┆এখন দুপুর ১২টা বাজে❥︎ভালোবাসা জানাও সবাইকে,❤️",
    "01:00 PM": "⌚┆এখন দুপুর ১টা বাজে❥︎জোহরের নামাজ পড়ে নাও,🙇🤲",
    "02:00 PM": "⌚┆এখন দুপুর ২টা বাজে❥︎খাবার খেয়েছো তো?🍛",
    "03:00 PM": "⌚┆এখন বিকাল ৩টা বাজে❥︎কাজে ফোকাস করো,🧑‍🔧☀️",
    "04:00 PM": "⌚┆এখন বিকাল ৪টা বাজে❥︎আসরের নামাজ পড়ে নাও,🙇🥀",
    "05:00 PM": "⌚┆এখন বিকাল ৫টা বাজে❥︎একটু বিশ্রাম নাও,🙂‍↕️🌆",
    "06:00 PM": "⌚┆এখন সন্ধ্যা ৬টা বাজে❥︎পরিবারকে সময় দাও,😍🌇",
    "07:00 PM": "⌚┆এখন সন্ধ্যা ৭টা বাজে❥︎এশার নামাজ পড়ো,❤️🌃",
    "08:00 PM": "⌚┆এখন রাত ৮টা বাজে❥︎আজকের কাজ শেষ করো,🧖🙂‍↔️",
    "09:00 PM": "⌚┆এখন রাত ৯টা বাজে❥︎ঘুমের প্রস্তুতি নাও,😴🌙",
    "10:00 PM": "⌚┆এখন রাত ১০টা বাজে❥︎ঘুমাতে যাও,😴🙂‍↕️",
    "11:00 PM": "⌚┆এখন রাত ১১টা বাজে❥︎ভালোবাসা রইলো,🥰🌌"
  };

  let lastSentTime = "";

  const checkTimeAndSend = async () => {
    const now = moment().tz("Asia/Dhaka").format("hh:mm A");

    if (now !== lastSentTime && timerData[now]) {
      lastSentTime = now;

      const todayDate = moment().tz("Asia/Dhaka").format("DD-MM-YYYY");

      const msg =
`◢◤━━━━━━━━━━━━━━━━◥◣
🕒 ᴛɪᴍᴇ: ${now}
${timerData[now]}
━━━━━━━━━━━━━━━━━━━━
📅 ᴅᴀᴛᴇ: ${todayDate}
◥◣━━━━━━━━━━━━━━━━◢◤`;

      try {
        const allThreads = await api.getThreadList(1000, null, ["INBOX"]);
        const groups = allThreads.filter(t => t.isGroup);

        await Promise.all(
          groups.map(thread =>
            api.sendMessage(msg, thread.threadID)
          )
        );

        console.log("✅ Message sent:", now);
      } catch (e) {
        console.error("❌ Error:", e);
      }
    }
  };

  setInterval(checkTimeAndSend, 30000);
};

module.exports.onStart = () => {};
