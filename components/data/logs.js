import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const LogsSchema = new mongoose.Schema({
    size: Number,
    uri: String,
    status: String,
    hostname: String, 
    time: { 
        type: Date, 
        expires: "720h",
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "logs" })
LogsSchema.index({
    app: 1,
    time: 1,
})

const LogsModel = mongoose.model("logs", LogsSchema, "logs")

export const getForAppSince = (app, since) => {
    return LogsModel.find({
        app: ObjectId(app),
        time: { $gte: new Date(since) }
    }).exec()
}

export const countStatusForAppSince = (status, app, since) => {
    return LogsModel.count({
        app: ObjectId(app),
        status,
        time: { $gte: new Date(since) }
    }).exec()
}

export const countForAppBetween = (status, app, start, end) => {
    return LogsModel.count({
        app: ObjectId(app),
        time: { $gte: new Date(start), $lt: new Date(end)  }
    }).exec()
}