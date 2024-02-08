/** Create Env File 
 *  
 * @brief Lightweight utility, designed to generate the environment variables 
 * of this project. 
 * 
 */

/** Get Project Directory File path */
const path = require('path');
const directoryPath = path.dirname(path.dirname(path.dirname(__filename)));
/** Load Environment Variables */
require('dotenv').config(directoryPath);

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

function environmentVariableTest()
{
    const env = getEnvironmentVariable("DISCORD_TOKEN");
    console.log(env);
}

/** Methods */
/** 
 * createEnvironmentFile 
 * 
 * @breif Iteratively creates an environmnet file based on a given JSON structure.
 * 
 * @param environmentArgs   environment arguments - json structure
 * @param path              env file path.
 * 
 * @returns No return
 */ 
function createEnvironmentFile(environmentArguments, path){
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

/** getEnvironmentVariable
 * 
 * @brief Returns the value of a given environment variable 
 * 
 * @param {*} variableName Name of environment variable 
 * @returns environment variable value - string.
 */
function getEnvironmentVariable(variableName){
    return process.env[variableName]
}

/** Function Calls */

//main();
environmentVariableTest();
// document.getElementById("discordToken").value = getEnvironmentVariable[environmentArgs.discordAccessToken.alias];