const { PermissionsBitField, InteractionType, ActionRowBuilder, EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Embed } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      if (!command) return;

      const embed = new EmbedBuilder().setColor("Red");

      if (command.botPerms) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          embed.setDescription("I don't have enough permissions to do this!");
          return interaction.reply({ embeds: [embed] });
        }
      }

      if (command.userPerms) {
        if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          embed.setDescription("You don't have enough permissions to do this!");
          return interaction.reply({ embeds: [embed] });
        }
      }

      try {
        await command.run(client, interaction, "!");
      } catch (error) {
        if (interaction.replied) {
          await interaction.editReply({ content: "An error occurred! Please notify technical support" }).catch(() => {});
        } else {
          await interaction.reply({ ephemeral: true, content: "An error occurred! Please notify technical support" }).catch(() => {});
        }
        console.error(error);
      }
    };

  }
};
