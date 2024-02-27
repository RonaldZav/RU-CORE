const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
console.log(`
.
.           Developed by RonaldZav
.       Redistribution is not permitted.
.
`);

class RonaldZav extends Client {
  constructor() {
    super({
      failIfNotExists: true,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
      },
      intents: [
        GatewayIntentBits.Guilds,
		    GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
		    GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
      ],
    });
    this.commands = new Collection();

    this.slashCommands = new Collection();
    this.config = require("./config.js");
    this.prefix = this.config.prefix;
    this.aliases = new Collection();
    this.commands = new Collection();
    this.logger = require("./utils/logger.js");
    this.read = require("./utils/read.js");
    if (!this.token) this.token = this.config.token;

    this.rest.on("rateLimited", (info) => { this.logger.log(info, "log"); });

		["commands", "events"].forEach((handler) => { require(`./handlers/${handler}`)(this); });
  }
  
  connect() { return super.login(this.token); }

}

module.exports = RonaldZav;
