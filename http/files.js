import * as apps from "~/components/data/apps"
import * as files from "~/components/data/files"
import { NotFoundError } from "~/http/classes/notfound"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/files", wrap(async (req, res) => {
        return res.json(await files.getForApp(req.params.id))
    }))

    app.post("/dash/app/:id/file", wrap(async (req, res) => {
        return res.json(await files.addForApp(req.params.id, req.body))
    }))

    app.patch("/dash/app/:id/file/:fileid", wrap(async (req, res) => {
        const file = await files.getForAppAndID(req.params.id, req.params.fileid)
        if (!file) {
            throw new NotFoundError("File not found")
        }
        await files.update(req.params.fileid, req.body)
        return res.json({ "status": "ok" })
    }))

    app.delete("/dash/app/:id/file/:fileid", wrap(async (req, res) => {
        const file = await files.getForAppAndID(req.params.id, req.params.fileid)
        if (!file) {
            throw new NotFoundError("File not found")
        }
        await files.remove(req.params.fileid)
        return res.json({ "status": "ok" })
    }))
}