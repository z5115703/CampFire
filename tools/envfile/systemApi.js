const { getEnvironmentVariable } = require("./createEnvFile")

const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

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
        res.json({
            "response" : myVariable
        })
    }
    else
    {
        res.json({"response" : "No Variable asked"})
    }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});