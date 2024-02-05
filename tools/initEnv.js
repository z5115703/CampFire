/** Import Javascript Modules */
const fs = require('fs');

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

var discordTokenEnvArg = '';
const FILE_SYSTEM_PATH = ".env";

readline.question(`Enter Discord Token : `, name => {
    discordTokenEnvArg = "DISCORD_TOKEN=" + "\"" + name + "\"";
    fs.writeFile(FILE_SYSTEM_PATH, discordTokenEnvArg, (err) => {
        if (err) throw err;
        else
        {
           console.log(".env file cread - Access token Updated")
        }
     })
    readline.close();
});
