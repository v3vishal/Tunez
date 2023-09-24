const { useMainPlayer } = require('discord-player');
const { DJS, EmbedBuilder } = require('discord.js');
module.exports = {
  name: "queue",
  description: "Shows the queue.",
  category: "music",
  async execute(bot, interaction) {
    const player = useMainPlayer();
    const queue = player.nodes.get(interaction.guild.id);

    if (!queue || !queue.node.isPlaying()) return bot.say.errorMessage(interaction, "I\'m currently not playing in this guild.");

    if (!queue.tracks) return bot.say.warnMessage(interaction, "There is currently no song in the queue.");
    try {
    const list = (queue.tracks.filter(track => track.url !== queue.node.isPlaying().url).map((track, i) => {
      return `\`${i + 1}.\` [${track.title}](${track.url})`
      }).slice(0, 10).join('\n'));
      if (list == null) {
        list = ''
      }
    const embedd = bot.say.baseEmbed()
	.setColor(0x0099FF)
      .setTimestamp()
      .setAuthor({name: `${interaction.guild.name}${queue.repeatMode === 2 ? ' (looped)' : ''}`, iconURL:`${interaction.guild.iconURL()}` })
      .setDescription(
        `Currently playing: [${queue.currentTrack.title}](${queue.currentTrack.url})\nNext in queue:\n${list}`
      )
      .setFooter({
        text: `${queue.tracks.size} tracks in queue.`
                 });
      interaction.reply({ ephemeral: false, embeds: [embedd] })
        } catch(error){
      console.log(error.stack)
      console.log(`${error} - ${error.name} - ${error.message}`);
      interaction.reply(`\`${error}\` happened. sry :/`)
        }
  }
};