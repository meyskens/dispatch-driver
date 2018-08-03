import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const EnvVarsSchema = new mongoose.Schema({
    name: String,
    key: String,
    value: String,
    hide: Boolean,
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "envvars" })
EnvVarsSchema.index({
    app: 1,
    user: 1,
    key:1,
})

const EnvVarsModel = mongoose.model("envvars", EnvVarsSchema, "envvars")

export const getForApp = (app) => {
    return EnvVarsModel.find({
        app: ObjectId(app),
    })
}

export const getForAppAndKey = (app, key) => {
    return EnvVarsModel.findOne({
        app: ObjectId(app),
        key,
    })
}

export const getForAppAndID = (app, id) => {
    return EnvVarsModel.find({
        _id: ObjectId(id),
        app: ObjectId(app),
    })
}

export const addForApp = (appID, entry) => {
    entry.app = ObjectId(appID)
    return (new EnvVarsModel(entry)).save()
}

export const addOrOverwriteForApp = async (appID, entry) => {
    entry.app = ObjectId(appID)

    const entryForKey = await getForAppAndKey(appID, entry.key)
    if (entryForKey) {
        return EnvVarsModel.update({ _id: entryForKey._id }, entry).exec()
    }

    return (new EnvVarsModel(entry)).save()
}

export const update = (id, entry) => {
    return EnvVarsModel.update({ _id: ObjectId(id) }, entry).exec()
}

export const remove = (id) => {
    return EnvVarsModel.remove({ _id: ObjectId(id) }).exec()
}