const { Discord, MessageActionRow, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Show the avatar of an discord member",
	options: [{ name: "member", description: "Select an member.", type: ApplicationCommandOptionType.User, required: true }],
		
    run: async (client, interaction) => { const config = await client.read.readYML("./addons/Core/config.yml");
	const user = interaction.options.getUser('member') || interaction.member.user;
		
	let embed = new EmbedBuilder()
	.setDescription(config.avatarCommandTitle.replace("<tag>", `${user}`).replace("<username>", `${user.username}`))
	.setColor(config.embedColor)
	.setImage(user.displayAvatarURL({ dynamic: true, size: 512}))
     interaction.reply({ ephemeral: true, embeds: [embed] })
			
}}
