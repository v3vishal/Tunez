module.exports = {
  name: "test",
  description: "test command.",
  category: "music",
  usage: "testing many commands",
  options: [{
    name: "song",
    description: "The song name/url, you want to play.",
    type: 3,
    required: true
  }],
  async execute(bot, interaction) {
    try {
    const string = await interaction.options.getString("song", true);
    const aqueue = bot.player.getQueue(interaction.guild.id);
    const channel = interaction.member?.voice?.channel;
    let result = await bot.player.search(string, { requestedBy: interaction.user }).catch(() => { });
      if (!result || !result.tracks.length)
        return bot.say.errorMessage(interaction, `No result was found for \`${string}\`.`);
      let queue;
      if (aqueue) {
        queue = aqueue;
        queue.metadata = interaction;
      } else {
        queue = await bot.player.createQueue(interaction.guild, {
          metadata: interaction
        });
      }
    if(!channel) return bot.say.warnMessage(interaction, "abey join a channel, dumbo") 
      else {
        bot.say.successMessage(interaction, "Test initiated!");
              result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        await queue.connect(channel);
      await queue.play()
    }
    bot.say.successMessage(interaction, "Test successful!! " + `Playing ${string}`);
    } catch(err) {
      bot.say.errorMessage(interaction, `Error mil gaya :(\n
 \`${err}\``)
    }
  }
};