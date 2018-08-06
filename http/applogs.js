import * as apps from "~/components/data/apps"
import * as applogs from "~/components/data/applogs"

export default function({ app, wrap }) {
    app.get("/dash/app/:id/app-logs/:start/:end", wrap(async (req, res) => {
        const app = await apps.get(req.params.id)
        return res.json(await applogs.getForInternalNameBetween(app.internalName, req.params.start, req.params.end))
    }))
}