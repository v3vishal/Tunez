const glob = require("glob");
const { Player } = require("discord-player");

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");
  bot.logger.info("EVENTS", `${eventFiles.length} events in queue...`);
  const player = new Player(bot);
  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);

    let type = "bot";
    if (file.includes("player.")) type = "player";

    if (!event.execute) {
      throw new TypeError(`[ERROR] execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR] name is required for events! (${file})`);
    }

    
    if (type === "player") {
      player.on(event.name, event.execute.bind(null, bot));
    } else if (event.once) {
      bot.once(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    bot.logger.debug(`EVT DEBUG`, `Event ${event.name}.js loaded`);

  });
};