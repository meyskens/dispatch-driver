import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

// Used in route handlers to catch async exceptions as if they were synchronous.
const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.get("/", (req, res) => {
    res.send("Duspatch.sh driver server")
})

app.listen(80, () => console.log("Listening on port 80"))
