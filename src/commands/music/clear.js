const { useMainPlayer } = require('discord-player');
module.exports = {
  name: "clear",
  description: "Clears the current queue.",
  category: "music",
  execute(bot, interaction) {
    const player = useMainPlayer();
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.node.isPlaying())
      return bot.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "There is currently no song in the queue.");

    queue.clear();

    return bot.say.successMessage(interaction, "Cleared the queue.");
  }
};