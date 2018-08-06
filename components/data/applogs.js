import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const AppLogsSchema = new mongoose.Schema({
    internalName: String, // Internal Name is used here instead of app id to lower load on database since Helmet is only aware of this name
    pod: String,
    container: String,
    line: String,
    time: Date,
}, { collection: "app_logs" })
AppLogsSchema.index({
    app: 1,
    time: 1,
})

const AppLogsModel = mongoose.model("app_logs", AppLogsSchema, "app_logs")

export const getForInternalNameSince = (internalName, since) => {
    return AppLogsModel.find({
        internalName,
        time: { $gte: new Date(since) }
    }).exec()
}

export const getForInternalNameBetween = (internalName, start, end) => {
    return AppLogsModel.find({
        internalName,
        time: { $gte: new Date(start), $lt: new Date(end) }
    }).exec()
}

export const getForInternalName = (internalName, start, end) => {
    return AppLogsModel.find({
        internalName,
    }).exec()
}