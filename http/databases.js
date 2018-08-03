import * as apps from "~/components/data/apps"
import generator from "generate-password"
import * as databases from "~/components/data/databases"
import * as envvars from "~/components/data/envvars"
import BadRequestError from "~/http/classes/badrequest"

export default function ({ app, wrap }) {

    // MongoDB

    app.get("/dash/app/:id/mongodb", wrap(async (req, res) => {
        return res.json(await databases.getForAppAndName(req.params.id, "MongoDB") !== null)
    }))

    app.post("/dash/app/:id/mongodb", wrap(async (req, res) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        const db = await databases.getForAppAndName(req.params.id, "MongoDB")
        if (db) {
            throw new BadRequestError("Database already exists")
        }

        const entry = {
            name: "MongoDB",
            username: "app",
            password: generator.generate({
                length: Math.floor(Math.random() * 10) + 20, // generate a random length between 20 and 30 for extra security
                numbers: true
            })
        }

        await await databases.addForApp(req.params.id, entry)

        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MongoDB Host",
            key: "MONGODB_HOST",
            value: `${app.internalName}-mongodb:27017`,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MongoDB Username",
            key: "MONGODB_USER",
            value: entry.username,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MongoDB Password",
            key: "MONGODB_PASS",
            value: entry.password,
            hide: true,
        })

        return res.json({ status: "ok" })
    }))

    app.delete("/dash/app/:id/mongodb", wrap(async (req, res) => {
        return res.json(await databases.removeForApp(req.params.id, "MongoDB"))
    }))

    // PostgreSQL

    app.get("/dash/app/:id/postgresql", wrap(async (req, res) => {
        return res.json(await databases.getForAppAndName(req.params.id, "PostgreSQL") !== null)
    }))

    app.post("/dash/app/:id/postgresql", wrap(async (req, res) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        const db = await databases.getForAppAndName(req.params.id, "PostgreSQL")
        if (db) {
            throw new BadRequestError("Database already exists")
        }

        const entry = {
            name: "PostgreSQL",
            username: "app",
            password: generator.generate({
                length: Math.floor(Math.random() * 10) + 20, // generate a random length between 20 and 30 for extra security
                numbers: true
            }),
            database: "app",
        }

        await await databases.addForApp(req.params.id, entry)

        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "PostgreSQL Host",
            key: "POSTGRES_HOST",
            value: `${app.internalName}-postgresql`,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "PostgreSQL Username",
            key: "POSTGRES_USER",
            value: entry.username,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "PostgreSQL Password",
            key: "POSTGRES_PASS",
            value: entry.password,
            hide: true,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "PostgreSQL Database",
            key: "POSTGRES_DB",
            value: entry.database,
            hide: true,
        })

        return res.json({ status: "ok" })
    }))

    app.delete("/dash/app/:id/postgresql", wrap(async (req, res) => {
        return res.json(await databases.removeForApp(req.params.id, "PostgreSQL"))
    }))

    // MariaDB

    app.get("/dash/app/:id/mariadb", wrap(async (req, res) => {
        return res.json(await databases.getForAppAndName(req.params.id, "MariaDB") !== null)
    }))

    app.post("/dash/app/:id/mariadb", wrap(async (req, res) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        const db = await databases.getForAppAndName(req.params.id, "MariaDB")
        if (db) {
            throw new BadRequestError("Database already exists")
        }

        const entry = {
            name: "MariaDB",
            username: "app",
            password: generator.generate({
                length: Math.floor(Math.random() * 10) + 20, // generate a random length between 20 and 30 for extra security
                numbers: true
            }),
            database: "app",
        }

        await await databases.addForApp(req.params.id, entry)

        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MariaDB Host",
            key: "MARIADB_HOST",
            value: `${app.internalName}-mariadb`,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MariaDB Username",
            key: "MARIADB_USER",
            value: entry.username,
            hide: false,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MariaDB Password",
            key: "MARIADB_PASS",
            value: entry.password,
            hide: true,
        })
        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "MariaDB Database",
            key: "MARIADB_DB",
            value: entry.database,
            hide: true,
        })

        return res.json({ status: "ok" })
    }))

    app.delete("/dash/app/:id/mariadb", wrap(async (req, res) => {
        return res.json(await databases.removeForApp(req.params.id, "MariaDB"))
    }))

    // Redis

    app.get("/dash/app/:id/redis", wrap(async (req, res) => {
        return res.json(await databases.getForAppAndName(req.params.id, "Redis") !== null)
    }))

    app.post("/dash/app/:id/redis", wrap(async (req, res) => {
        const app = await apps.getAppWithUserAndId(req.user._id, req.params.id)
        const db = await databases.getForAppAndName(req.params.id, "Redis")
        if (db) {
            throw new BadRequestError("Database already exists")
        }

        const entry = {
            name: "Redis",
        }

        await await databases.addForApp(req.params.id, entry)

        await envvars.addOrOverwriteForApp(req.params.id, {
            name: "Redis Host",
            key: "REDIS_HOST",
            value: `${app.internalName}-redis`,
            hide: false,
        })

        return res.json({ status: "ok" })
    }))

    app.delete("/dash/app/:id/redis", wrap(async (req, res) => {
        return res.json(await databases.removeForApp(req.params.id, "Redis"))
    }))

}