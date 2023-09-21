const { supportServer } = require("../../../config.json");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "support",
  description: "Join the discord support server",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Click to join the support server.](${supportServer})`);

    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
      .setLabel("Server Link")
      .setStyle("Link")
      .setURL(`${supportServer}`)
    ]);


    return interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });
  }
};