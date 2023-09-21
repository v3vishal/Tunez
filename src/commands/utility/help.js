const catDetails = require("../../data/categoryDetails.json");
const categories = require("../../data/categories.json");
const config = require("../../../config.json");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows the commands menu",
  category: "utility",
  options: [{
    name: "command",
    type: 3,
    description: "The command you’r looking for",
    required: false
  }],
  execute(bot, interaction) {
    const arg = interaction.options.getString("command", false);

    if (arg) {
      const cmd = bot.commands.get(arg);
      if (!cmd)
        return bot.say.warnMessage(interaction, `No command was found named \`${arg}\`.`);

      const cmdUsage = cmd.usage ? `\/${cmd.name} ${cmd.usage}` : `\/${cmd.name}`;

      const embed = bot.say.baseEmbed(interaction)
        .setAuthor(`${cmd.category} command: ${cmd.name}`, bot.user.displayAvatarURL())
        .addField(`${cmdUsage}`, `${cmd.description ?? "Not specified"}`)
        .setFooter("[] : optional • <> : required • | : or");

      return interaction.reply({ ephemeral: false, embeds: [embed] });
    }

    const cates = [];
    for (let i = 0; i < categories.length; i++) {
      const category = bot.commands.filter(({ category }) => category === categories[i])
        .map(({ name }) => name);
      cates.push(category);
    }

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Help Commands", bot.user.displayAvatarURL())
      .setFooter(`Type '\/help <command>' for more details on a command`);

    for (let j = 0; j < cates.length; j++) {
      const name = catDetails[categories[j]];

      if (categories[j] === "botowner" && !config.owners.includes(interaction.user.id)) continue;

      embed.addField(`${name}`, `\`\`\`${cates[j].join(", ")}\`\`\``);
    };

    const button1 = new ButtonBuilder()
      .setLabel("Support")
      .setStyle("Link")
      .setURL(`${config.supportServer}`);

    const button2 = new ButtonBuilder()
      .setLabel("Invite")
      .setStyle("Link")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=applications.commands%20bot`);

    const row = new ActionRowBuilder().addComponents([button1, button2]);


    return interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });
  }
};