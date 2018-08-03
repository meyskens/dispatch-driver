import * as envvars from "~/components/data/envvars"
import { NotFoundError } from "~/http/classes/notfound"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/envvars", wrap(async (req, res) => {
        return res.json(await envvars.getForApp(req.params.id))
    }))

    app.post("/dash/app/:id/envvar", wrap(async (req, res) => {
        return res.json(await envvars.addForApp(req.params.id, req.body))
    }))

    app.patch("/dash/app/:id/envvar/:envvarid", wrap(async (req, res) => {
        const file = await envvars.getForAppAndID(req.params.id, req.params.envvarid)
        if (!file) {
            throw new NotFoundError("Env var not found")
        }
        await envvars.update(req.params.envvarid, req.body)
        return res.json({ "status": "ok" })
    }))

    app.delete("/dash/app/:id/envvar/:envvarid", wrap(async (req, res) => {
        const file = await envvars.getForAppAndID(req.params.id, req.params.envvarid)
        if (!file) {
            throw new NotFoundError("Env var not found")
        }
        await envvars.remove(req.params.envvarid)
        return res.json({ "status": "ok" })
    }))
}