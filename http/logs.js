import * as apps from "~/components/data/apps"
import * as logs from "~/components/data/logs"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/logs/:since", wrap(async (req, res) => {
        return res.json(await applogs.getForAppSince(req.params.id, req.params.since))
    }))
}