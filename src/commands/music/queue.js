const { Player } = require('discord-player');
module.exports = {
  name: "queue",
  description: "Shows the queue.",
  category: "music",
  async execute(bot, interaction) {
    const player = new Player(bot);
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.node.isPlaying()) return bot.say.errorMessage(interaction, "I\'m currently not playing in this guild.");

    if (!queue.tracks.length) return bot.say.warnMessage(interaction, "There is currently no song in the queue.");

    const list = (queue.tracks.filter(track => track.url !== queue.node.isPlaying().url).map((track, i) => {
      return `\`${i + 1}.\` [${track.title}](${track.url}) » \`${track.requestedBy.username}\`)`
      }).slice(0, 10).join('\n'))

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor({name: `${interaction.guild.name}${queue.loopMode ? ' (looped)' : ''}`, icon_url: interaction.author.displayAvatarURL({dynamic: true}), url: `https://github.com/v3vishal/Tunez-OS`})
      .setDescription(
        `Current Track: [${queue.currentTrack.title}](${queue.currentTrack.url}) » ${queue.currentTrack.requestedBy.username}\`\n\n${list}`
      )
      .setFooter(
        `${queue.tracks.size} tracks in queue.`
      );

    return interaction.reply({ ephemeral: false, embeds: [embed] }).catch(console.error);
  }
};