const { getEnvironmentVariable , reloadEnv, setEnvironmentVariable, saveEnv } = require("./createEnvFile")

const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

/** Include root directory - so server can host files from tools*/
app.use(express.static(__dirname));

/** 
 *  Front page - Configuration
 */
app.get("/",async (req,res) => {
    let result = await reloadEnv();
    if (result = true)
    {
        res.sendFile('./environment.html', {root: __dirname });
    }
});

/** Quick Ping Method */
app.get("/ping", (req, res) => {
  const pingAlive = {"status" : "alive"}
  res.json(pingAlive);
});

/** Get method for Environment Variable */
app.get("/env-variable", (req,res) => {
    let envVariable= req.query.variable;

    if(envVariable)
    {
        let myVariable = getEnvironmentVariable(envVariable);
        res.json({"response" : myVariable});
    }
    else
    {
        res.json({"response" : "No Variable asked"});
    }
});

/** Post method for environment variables */
app.post("/env-variable", (req,res) => {
    let envVariable = req.query.variable;
    let data        = req.query.data;
    let resp = setEnvironmentVariable(envVariable,data);
    console.log(data)

    if (resp == true)
    {
        res.json({"response" : "Message Set successfully"});
    }
    else
    {
        res.json({"response" : "Error, Invalid variable"});
    }
});

/* Save to file */
app.get("/save", (req,res) => {
    saveEnv();
    res.json({"response" : "Complete"})
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
  console.log("Access webserver on http://localhost:3000")
});
