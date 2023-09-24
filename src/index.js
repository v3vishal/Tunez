require("./modules/checkValid");

const { Collection, Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

const { botToken } = require("../config.json");
const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ],
  allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

bot.commands = new Collection();

bot.logger = Logger;
bot.utils = Util;
bot.say = Embeds;

bot.player = new Player(bot, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 100
});

require("./handler/EventHandler")(bot);

bot.login(botToken);
