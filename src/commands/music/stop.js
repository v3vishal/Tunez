const { Player } = require('discord-player');

module.exports = {
  name: "stop",
  description: "Stops the playback.",
  category: "music",
  execute(bot, interaction) {
    const player = new Player(bot);
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.node.isPlaying())
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    queue.node.stop(true);

    return bot.say.successMessage(interaction, "Stopped the music.");
  }
};