const { Activity } = require("discord.js");
const { readdirSync } = require("fs");

module.exports ={
name: "ready",
run: async (client) => {
	
    client.logger.log(`Session started in ${client.user.username}`, "ready");
    client.logger.log(`Servers: ${client.guilds.cache.size}, Members: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, "ready");

}}