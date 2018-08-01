import * as apps from "~/components/data/apps"
import * as updates from "~/components/data/updates"
import { NotFoundError } from "~/http/classes/notfound"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/updates", wrap(async (req, res) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        if (!app) {
            throw new NotFoundError("app not found")
        }
        return res.json(await updates.getLastForApp(app._id))
    }))
}