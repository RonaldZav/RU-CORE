const { readdirSync } = require('fs');

module.exports = (client) => {
    const addonsAvailable = readdirSync("./addons/");

    for (const addonFolder of addonsAvailable) {

      const eventsFiles = readdirSync(`./addons/${addonFolder}/events/`).filter(file => file.endsWith(".js"));

      for (const file of eventsFiles) {
        const event = require(`../../addons/${addonFolder}/events/${file}`);

        if (!event.name || !event.run) { console.error(`Corrupt file: ${file}`);
        continue; }

        client.on(event.name, (...args) => event.run(client, ...args));

      }

    }
}