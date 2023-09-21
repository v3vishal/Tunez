const { Player } = require('discord-player');
module.exports = {
  name: "null",
  description: "null",
  category: "music",
  usage: "null",
  options: [{
    name: "null",
    description: "null",
    type: 3,
    required: true
  }],
  async execute(bot, interaction) {
    /*try {
      const player = new Player(bot);
      const string = await interaction.options.getString("song", true);
      const guildQueue = player.nodes.get(interaction.guild.id);

      const channel = interaction.member?.voice?.channel;

      if (!channel)
        return bot.say.warnMessage(interaction, "You have to join a voice channel first.");

      if (guildQueue) {
        if (channel.id !== interaction.guild.me?.voice?.channelId)
          return bot.say.warnMessage(interaction, "I'm already playing in a different voice channel!");
      } else {
        if (!channel.viewable)
          return bot.say.warnMessage(interaction, "I need **\`VIEW_CHANNEL\`** permission.");
        if (!channel.joinable)
          return bot.say.warnMessage(interaction, "I need **\`CONNECT_CHANNEL\`** permission.");
        if (!channel.speakable)
          return bot.say.warnMessage(interaction, "I need **\`SPEAK\`** permission.");
        if (channel.full)
          return bot.say.warnMessage(interaction, "Can't join, the voice channel is full.");
      }

      let result = await bot.player.search(string, { requestedBy: interaction.user }).catch(() => { });
      if (!result || !result.tracks.length)
        return bot.say.errorMessage(interaction, `No result was found for \`${string}\`.`);

      let queue;
      if (guildQueue) {
        queue = guildQueue;
        queue.metadata = interaction;
      } else {
        queue = await bot.player.createQueue(interaction.guild, {
          metadata: interaction
        });
      }
      
      try {
      console.log(`Channel: ${channel}`);
        if (!queue.connection) await queue.play(channel, {});
      } catch (error) {
        bot.logger.error("JOIN", error);
        bot.player.deleteQueue(interaction.guild.id);
        return bot.say.errorMessage(interaction, `Could not join your voice channel!\n\`${error}\``);
      }

      result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

      if (!queue.playing) await queue.play();
    } catch (e) {
      console.log(e)
      
    }
    */
  }
};