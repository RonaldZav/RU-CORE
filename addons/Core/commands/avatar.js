const { Discord, MessageActionRow, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Show the avatar of an discord member",
	options: [{ name: "member", description: "Select an member.", type: ApplicationCommandOptionType.User, required: true }],
		
    run: async (client, interaction) => {
	const user = interaction.options.getUser('member') || interaction.member.user;
		
	let embed = new EmbedBuilder()
	.setDescription(`**${user}'s avatar**`)
	.setImage(user.displayAvatarURL({ dynamic: true, size: 512}))
     interaction.reply({ ephemeral: true, embeds: [embed] })
			
}}
