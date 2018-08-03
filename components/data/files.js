import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const FilesSchema = new mongoose.Schema({
    name: String,
    path: String,
    content: String, // base64 encoded
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "files" })
FilesSchema.index({
    app: 1,
})

const FilesModel = mongoose.model("files", FilesSchema, "files")

export const getForApp = (app) => {
    return FilesModel.find({
        app: ObjectId(app),
    })
}

export const getForAppAndID = (app, id) => {
    return FilesModel.find({
        _id: ObjectId(id),
        app: ObjectId(app),
    })
}

export const addForApp = (appID, entry) => {
    entry.app = ObjectId(appID)
    return (new FilesModel(entry)).save()
}

export const update = (id, entry) => {
    return FilesModel.update({ _id: ObjectId(id) }, entry).exec()
}

export const remove = (id) => {
    return FilesModel.remove({ _id: ObjectId(id) }).exec()
}