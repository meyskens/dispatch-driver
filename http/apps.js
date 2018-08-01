import * as apps from "~/components/data/apps"
import * as users from "~/components/data/users"
import { NotFoundError } from "~/http/classes/notfound"

export default function({ app, wrap }) {
    app.get("/dash/apps", wrap(async (req, res) => {
        res.json(await apps.getAppsForUser(req.user._id))
    }))

    app.post("/dash/apps", wrap(async (req, res) => {
        const user = await users.get(req.user._id)

        if (!req.body) {
            throw new BadRequestError("No data")
        }
        if (!req.body.name) {
            throw new BadRequestError("No name given")
        }
        if (!req.body.repo) {
            throw new BadRequestError("No repo given")
        }

        req.body.internalName = req.body.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
        req.body.repo = user.repoUser + "/" + req.body.repo

        if (await apps.getAppForRepo(req.body.repo)) {
            throw new BadRequestError("Repo already exists")
        }
        if (await apps.getAppForInternalName(req.body.internalName)) {
            throw new BadRequestError("Internal name already exists")
        }

        res.json(await apps.add(user._id, req.body))
    }))

    app.get("/dash/app/:id", wrap(async (req, res) => {
        return res.json(await apps.getAppWithUserAndId(req.user._id, req.params.id))
    }))

    app.patch("/dash/app/:id", wrap(async (req, res) => {
        const currentEntry = await apps.getAppWithUserAndId(req.user._id, req.params.id)

        if (!currentEntry) {
            throw new NotFoundError("app not found")
        }

        if (req.body.repo && req.body.repo != currentEntry.repo && apps.getAppForRepo(req.body.repo )) {
            throw new BadRequestError("Repo already used")
        }

        req.body.user = currentEntry.user // not allowing patches on this

        await apps.update(currentEntry._id, req.body)

        res.json({status: "ok"})
    }))
}