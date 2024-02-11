/** Get Project Directory File path */
const path = require('path');
const directoryPath = path.dirname(__dirname);
const dotenv = require('dotenv');
const fs = require('fs');

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

function reloadEnv() 
{
    const envConfig = dotenv.parse(fs.readFileSync(directoryPath + '\\.env'));
    for (const key in envConfig) 
    {
        process.env[key] = envConfig[key];
    }
}

reloadEnv();

// client.login(process.env.TOKEN);
console.log(process.env.DISCORD_TOKEN)