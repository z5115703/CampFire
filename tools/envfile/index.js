
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
        setTextBoxValue(elementId,apiRequest.name);
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