const { Player } = require('discord-player');

module.exports = {
  name: "skip",
  description: "Skips the current song",
  category: "music",
  execute(bot, interaction) {
    const player = new Player(bot);
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.isPlaying())
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return bot.say.warnMessage(interaction, "No more songs in the queue to skip.");

    queue.skip();

    return bot.say.successMessage(interaction, "Skipped to the next song.");
  }
};