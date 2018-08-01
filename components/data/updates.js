import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema
const UpdatesSchema = new mongoose.Schema({
    tag: String,
    oldTag: String,
    time: Date,
    app: {
        type: Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "updates" })
UpdatesSchema.index({
    app: 1,
})

const UpdatesModel = mongoose.model("updates", UpdatesSchema, "updates")

export const getForApp = (app) => {
    return UpdatesModel.find({ app: new ObjectId(app) }).exec()
}

export const getLastForApp = (app, limit = 10) => {
    return UpdatesModel.find({ app: new ObjectId(app) }).sort("-time").limit(limit).exec()
}
