import fs from "fs"
import * as apps from "~/components/data/apps"
import * as users from "~/components/data/users"
import BadRequestError from "~/http/classes/badrequest"
import AccessDeniedError from "~/http/classes/accessdenied"
import UnauthorizedError from "~/http/classes/unauthorized" 
import { NotFoundError } from "~/http/classes/notfound"

const publicKey = fs.readFileSync("./keys/publicKey.pem")
const cert = fs.readFileSync("./keys/signingKey.pem")

export default function ({ app, expressJWT, wrap, jwt }) {
    app.use("/dash", expressJWT({
        secret: publicKey,
        audience: "https://driver.dispatch.sh/dash",
        algorithms: ['RS256'],
    }))

    app.all("/dash/*", wrap(async (req, res, next) => {
        if (!req.query.app && !req.body.app) {
            return next()
        }

        // const appToCheck = req.query.app || req.body.app
        // const app = apps.get(appToCheck)
        // if (!app) {
        //     throw new BadRequestError("The app mentioned in the request isn't valid.")
        // }

        // if (app.user != req.user._id) {
        //     throw new AccessDeniedError("The app belongs to another user.")
        // }

        // req.app = app
        return next() // allow request to continue
    }))

    app.use("/dash/app/:id/", wrap(async (req, res, next) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        if (!app) {
            throw new NotFoundError("app not found")
        }

        return next()
    }))

    app.post("/authenticate", wrap(async (req, res) => {
        if ( !req.body.email || !req.body.password) {
            throw new BadRequestError("Missing data")
        }

        const user = await users.checkLogin(req.body.email, req.body.password)
        if (!user) {
            throw new UnauthorizedError("Wrong login")
        }

        const token = jwt.sign({
            email: user.email,
            name: user.name,
            _id: user._id.toString()
        }, cert, {
            expiresIn: "60m",
            audience: "https://driver.dispatch.sh/dash",
            algorithm: "RS256",
        })
    
        res.json({ token })
    }))

    app.post("/dash/keep-alive", wrap(async (req, res) => {
        const user = await users.get(req.user._id)
        const token = jwt.sign({
            email: user.email,
            name: user.name,
            _id: user._id.toString()
        }, cert, {
            expiresIn: "60m",
            audience: "https://driver.dispatch.sh/dash",
            algorithm: "RS256",
        })
        res.json({ token })
    }))
    
    app.get("/dash/me", wrap(async (req,res) => {
        const user = await users.get(req.user._id)
        user.passwordHash = ""
        res.json(user)
    }))
}
