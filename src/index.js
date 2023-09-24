require("./modules/checkValid");

const { Collection, Client, GatewayIntentBits } = require("discord.js");
const { useMainPlayer, Player } = require("discord-player");
const { YouTubeExtractor, SpotifyExtractor } = require('@discord-player/extractor');
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

bot.player = new Player(bot);

// enables extractors
const player = useMainPlayer();
player.extractors.register(YouTubeExtractor);
player.extractors.register(SpotifyExtractor);

require("./handler/EventHandler")(bot);
const mySecret = process.env['tocken']
bot.login(mySecret);
