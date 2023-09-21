const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    //initializing commands
    require("../../handler/CommandHandler")(bot);
let ping = bot.ws.ping
const statuses = [
  `yt (and more soon)!`,
  `tunez in your server 🎵`,
  `many features!`,
  `${bot.guilds.cache.size} servers!`
]

let index = 0
setInterval(() => {
  if (index === statuses.length) index = 0;
  const status = statuses[index];
  bot.user.setPresence({ activities: [{ name: `${status}`, type: "PLAYING"}], status: 'idle' });
  index++;
}, 4000)
  }
};