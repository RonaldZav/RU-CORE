const { PermissionsBitField, InteractionType, ActionRowBuilder, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Embed } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');
const { config } = require("dotenv");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => { const conf = client.read.readYML("./addons/Core/config.yml");
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      if (!command) return;

      const embed = new EmbedBuilder().setColor("Red");

      if (command.botPerms) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          embed.setDescription(conf.outPermsBot);
          return interaction.reply({ embeds: [embed] });
        }
      }

      if (command.userPerms) {
        if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          embed.setDescription(conf.outPermsUser);
          return interaction.reply({ embeds: [embed] });
        }
      }

      try {
        await command.run(client, interaction, "!");
      } catch (error) {
        if (interaction.replied) {
          await interaction.editReply({ content: conf.internalError }).catch(() => {});
        } else {
          await interaction.reply({ ephemeral: true, content: conf.internalError }).catch(() => {});
        }
        console.error(error);
      }
    };

  }
};
