import fs from "fs"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import expressJWT from "express-jwt"
import jwt from "jsonwebtoken"

const app = express()
if (!process.env.DISABLE_CORS) {
    app.use(cors())
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

// Used in route handlers to catch async exceptions as if they were synchronous.
const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.get("/", (req, res) => {
    res.send("Dispatch.sh driver server")
})

const modules = fs.readdirSync("./http/")
for (let module of modules) {
    console.info("Loading file: " + module);
    const file = fs.statSync(`./http/${module}`) 
    if (file.isDirectory()) {
        continue
    }
    try {
        require(`./http/${module}`)({ app, wrap, expressJWT, jwt });
    } catch (error) {
        console.log(error, `Failed to load ${module}.`);
        process.exit(1);
    }
}

app.listen(8080, () => console.log("Listening on port 80"))
