import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const DatabasesSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "MongoDB",
            "PostgreSQL",
            "MariaDB",
            "Redis",
        ]
    },
    username: String,
    password: String,
    database: String,
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "databases" })
DatabasesSchema.index({
    app: 1,
    name: 1,
})

const DatabasesModel = mongoose.model("databases", DatabasesSchema, "databases")

export const getForAppAndName = (app, name) => {
    return DatabasesModel.findOne({
        app: ObjectId(app),
        name
    })
}

export const addForApp = (appID, entry) => {
    entry.app = ObjectId(appID)
    return (new DatabasesModel(entry)).save()
}

export const removeForApp = (appID, name) => {
    return DatabasesModel.remove({ name, app: ObjectId(appID) }).exec()
}