import mongoose from "../db"

const AppsSchema = new mongoose.Schema({
    name: String,
    repo: String,
    values: Object,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, { collection: "apps" })
AppsSchema.index({
    repo: 1,
})

const AppsModel = mongoose.model("apps", AppsSchema, "apps")

export const get = (id) => {
    return AppsModel.findOne({
        _id: mongoose.Schema.Types.ObjectId(id),
    }).exec()
}

export const getAppForRepo = (repo) => {
    return AppsModel.findOne({
        repo,
    }).exec()
}
