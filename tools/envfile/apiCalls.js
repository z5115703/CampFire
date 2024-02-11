
//** TESTING VALUES */
// const apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
// const discordTokenText = document.getElementById('discordToken');
//** END TESTING VALUES */

/**
 * @brief Sets the value of a text box based on the response of a REST API 
 * get request.
 * 
 * @param {*} elementId     Id of the element from the HTML page.
 * @param {*} apiUrl        url of the api
 */
async function setTextBoxFromApi(elementId,apiUrl) {
    try {
        const apiRequest = await getRequestFromApi(apiUrl);
        setTextBoxValue(elementId,apiRequest.response);
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * @brief Sets the value of a HTML text box element
 * 
 * @param {*} elementId Id of the element from the HTML page.
 * @param {*} data      Data to be set
 */
function setTextBoxValue(elementId,data)
{
    let documentElement = document.getElementById(elementId);
    documentElement.value = data;
}


/**
 * @brief Simple HTTP get request
 * 
 * @param {*} apiUrl URL of the API
 * @returns   Promise - On resolve, data of the Element
 */
async function getRequestFromApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function postEnvironmentVariable(requestData) {
    const environmentVariableApi = 'http://localhost:3000/env-variable'
    try {
        const apiRequest = await postRequestFromApi(environmentVariableApi,requestData);
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * @brief Simple HTTP post request
 * 
 * @param {*} apiUrl URL of the API
 * @param {*} request data
 * @returns   Promise - On resolve, data of the Element
 */
async function postRequestFromApi(apiUrl,requestData) 
{
    try 
    {
        const queryParams = new URLSearchParams(requestData);
        const urlWithParams = `${apiUrl}?${queryParams}`;
        console.log(urlWithParams);

        const response = await fetch(urlWithParams, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers here if required
            }
        });

        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
}


/** 
 * 
 * 
 */
function saveAllDataToDocument()
{
    // TODO: Create Map when we expand this? Better yet, we should define a .JSON file
    // With all the Schema to be shared across the server & browser code. 
    // NOTE: A design consideration we should have is to have a shared API between 
    // 
    let element = document.getElementById("discordToken"); 
    let value = element.value;
    console.log()

    const requestDataDiscordToken = {
        variable : "DISCORD_TOKEN",
        data     : value
    };

    
    let postResp = postEnvironmentVariable(requestDataDiscordToken);

    if (postResp)
    {
        // All promises have to be resolved before saving the data - so we can guarentee that all attributes have been
        // updated.
        getRequestFromApi("http://localhost:3000/save");
    }

}