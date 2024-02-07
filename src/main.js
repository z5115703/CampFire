/** Get Project Directory File path */
const path = require('path');
const directoryPath = path.dirname(path.dirname(__filename));

require('dotenv').config(directoryPath);

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

// client.login(process.env.TOKEN);
console.log(process.env.DISCORD_TOKEN)