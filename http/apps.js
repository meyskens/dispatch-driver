import * as apps from "~/components/data/apps"

export default function({ app, wrap }) {
    app.get("/dash/apps", wrap(async (req, res) => {
        res.send(await apps.getAppsForUser(req.user._id))
    }))
}