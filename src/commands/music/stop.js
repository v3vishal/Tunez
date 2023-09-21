const { Player } = require('discord-player');

module.exports = {
  name: "stop",
  description: "Stops the playback.",
  category: "music",
  execute(bot, interaction) {
    const player = new Player(bot);
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.isPlaying())
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.stop(true);

    return bot.say.successMessage(interaction, "Stopped the music.");
  }
};