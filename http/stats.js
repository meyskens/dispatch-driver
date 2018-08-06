import * as apps from "~/components/data/apps"
import * as logs from "~/components/data/logs"

const ONE_DAY = 24 * 60 * 60 * 1000; /* ms */

export default function({ app, wrap }) {
    app.get("/dash/stats/app-count", wrap(async (req, res) => {
        return res.json(await apps.getAppCountForUser(req.user._id))
    }))

    app.get("/dash/stats/app-request-count", wrap(async (req, res) => {
        const userapps = await apps.getAppsForUser(req.user._id)
        let count = 0;

        let yesterday = new Date(((new Date()).getTime() - ONE_DAY))

        for (let app of userapps) {
            count += await logs.countForAppSince(app._id, yesterday)
        }

        return res.json(count)
    }))

    app.get("/dash/stats/app-200-count", wrap(async (req, res) => {
        const userapps = await apps.getAppsForUser(req.user._id)
        let count = 0;

        let yesterday = new Date(((new Date()).getTime() - ONE_DAY))

        for (let app of userapps) {
            count += await logs.countStatusForAppSince("200", app._id, yesterday)
        }

        return res.json(count)
    }))
}