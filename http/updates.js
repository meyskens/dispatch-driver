import * as apps from "~/components/data/apps"
import * as updates from "~/components/data/updates"
import { NotFoundError } from "~/http/classes/notfound"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/updates", wrap(async (req, res) => {
        return res.json(await updates.getLastForApp(req.params.id))
    }))
}