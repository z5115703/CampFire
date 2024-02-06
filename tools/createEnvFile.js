/** Create Env File 
 *  
 * @brief Lightweight utility, designed to generate the environment variables 
 * of this project. 
 * 
 */

/** Module Defintions */
const fs = require('fs');
const reader = require('readline-sync');

/** Private Types */
const ENV_FILE_PATH = ".env";

/** Environemnt Arugment Schema */
let environmentArgs = {
  "discordAccessToken" : {
    "alias" : "DISCORD_TOKEN",
    "value" : null
  },
};

/** Main Function */
function main()
{
    /** Request Environment Variables*/
    environmentArgs.discordAccessToken.value = reader.question('Discord Access Token : ', { hideEchoBack: true });

    /** Generate file from requested Variables */
    createEnvironmentFile(environmentArgs,ENV_FILE_PATH);
}

/** Methods */
createEnvironmentFile = (environmentArguments, path) => {
    // Overwrite File
    fs.writeFile(path,"", (err) => {
        if (err) throw err;
        else
        {
           console.log("Created Env file");
        }
    });

    for (const [ _ , value] of Object.entries(environmentArguments)) 
    {
        fs.appendFile(path, value.alias+"="+value.value, (err) => {
            if (err) throw err;
            else
            {
                console.log(`${value.alias} added to Environment Variables.`)
            }
        });
        //console.log(`${value.alias}: ${value.value}`);
    }
}

/** Function Calls */
main();