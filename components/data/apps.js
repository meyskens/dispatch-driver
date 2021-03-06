import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const AppsSchema = new mongoose.Schema({
    name: String,
    internalName: String,
    repo: String,
    domain: String,
    altDomains: [ String ],
    image: String,
    replicas: Number,
    forceHTTPS: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, { collection: "apps" })
AppsSchema.index({
    repo: 1,
    user: 1,
})

const AppsModel = mongoose.model("apps", AppsSchema, "apps")

export const get = (id) => {
    return AppsModel.findOne({
        _id: ObjectId(id),
    }).exec()
}

export const getAppCountForUser = (user) => {
    return AppsModel.countDocuments({
        user: ObjectId(user),
    }).exec()
}

export const getAppWithUserAndId = (user, id) => {
    return AppsModel.findOne({
        user: ObjectId(user),
        _id: ObjectId(id),
    }).exec()
}

export const getAppForRepo = (repo) => {
    return AppsModel.findOne({
        repo,
    }).exec()
}

export const getAppForInternalName = (internalName) => {
    return AppsModel.findOne({
        internalName,
    }).exec()
}

export const getAppsForUser = (user) => {
    return AppsModel.find({
        user,
    }).exec()
}

export const add = (user, entry) => {
    entry.user = ObjectId(user)
    return (new AppsModel(entry)).save()
}

export const update = (id, entry) => {
    return AppsModel.update({ _id: ObjectId(id), }, entry).exec()
}

export const removeForUserAndId = (user, id) => {
    return AppsModel.remove({
        user: ObjectId(user),
        _id: ObjectId(id),
    }).exec()
}