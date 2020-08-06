const express = require('express')
const getDiscs = require("./getDiscs").default
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

if(isNaN(parseInt(process.argv[2])) || isNaN(parseInt(process.argv[3]))) {
    console.log("Give min and max weight after node index.js! Min and max must be inte")
    process.exit()
}

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/discs', (req, res) => {
    let urls = JSON.parse(req.body.data); 
    getDiscs(urls);
    res.status(200).send("OK")
})

app.listen(port, () => {
  console.log(`Listening to port :${port}`)
})
