/** Create Env File 
 *  
 * @brief Lightweight utility, designed to generate the environment variables 
 * of this project. 
 * 
 */

/** Get Project Directory File path */
const path = require('path');
const directoryPath = path.dirname(path.dirname(__dirname));
/** Load Environment Variables */
const dotenv = require('dotenv');

/** Module Defintions */
const fs = require('fs');
const reader = require('readline-sync');

/** Private Types */
const ENV_FILE_PATH = ".env";

/** Environemnt Arugment Schema */
let environmentArgs = {
  "discordAccessToken" : {
    "alias" : "DISCORD_TOKEN",
    "value" : ""
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
    fs.writeFileSync(path,"", (err) => {
        if (err) throw err;
        else
        {
           console.log("Created Env file");
        }
    });

    for (const [ _ , value] of Object.entries(environmentArguments)) 
    {
        fs.appendFileSync(path, `${value.alias}=\"${value.value}\"`, (err) => {
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
function getEnvironmentVariable(variableName)
{
    return process.env[variableName];
}

/**
 * @brief sets the environment 
 * 
 * @param {*} variableName   name of the environment variable (alias)
 * @param {*} variableValue  value of the environment variable
 * @returns 
 */
function setEnvironmentVariable(variableName,variableValue)
{
    let status = false;
    for (const [ name , value] of Object.entries(environmentArgs)) 
    {
        if (value.alias == variableName)
        {
            environmentArgs[name].value = variableValue;
            status = true;
            console.log("Env Variable set Disord token " + variableValue);
            break;
        }
    }
    return status;
}

/** SaveEnv
 * 
 * Saves the environment variable 
 * 
 */
function saveEnv()
{
    createEnvironmentFile(environmentArgs,ENV_FILE_PATH);
}

function reloadEnv() 
{
    const environmentFilePath = directoryPath + '\\.env';
    
    if (fs.existsSync(environmentFilePath))
    {
        console.log("Found .env File");
    }
    else
    {
        createEnvironmentFile(environmentArgs,environmentFilePath);
    }

    const envConfig = dotenv.parse(fs.readFileSync(environmentFilePath));
    for (const key in envConfig) 
    {
        process.env[key] = envConfig[key];
    }
}

/** Function Calls */
reloadEnv();

if (require.main === module) {
    main();
}

module.exports = { getEnvironmentVariable , reloadEnv , setEnvironmentVariable, saveEnv}
