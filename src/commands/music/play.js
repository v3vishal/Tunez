const { useMainPlayer } = require("discord-player");

module.exports = {
  name: "play",
  description: "Plays tunez that you give! Supports YT and Spotify.",
  category: "music",
  usage: "Play a song in a VC you are in.",
  options: [{
    name: "song",
    description: "The song name/url, you want to play.",
    type: 3,
    required: true
  }],
  async execute(bot, interaction) {
    const string = await interaction.options.getString("song", true);
    const player = useMainPlayer();
    const channel = interaction.member?.voice?.channel;
    if(!channel) return bot.say.warnMessage(interaction, "abey join a channel, dumbo");
    await interaction.deferReply();
    try {
      const { track } = await player.play(channel, string, {
          nodeOptions: {
              // nodeOptions are the options for guild node (aka your queue in simple word)
              metadata: {
              channel: interaction.channel,
              client: interaction.guild?.members?.me,
              requestedBy: interaction.member?.username
              } // we can access this metadata object using queue.metadata later on
          }
      });
      return interaction.followUp(`**${track.title}** enqueued!`);
  } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
  }
  }
};