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

export const add = (entry) => {
    entry.app = ObjectId(entry.app)
    return (new LogsModel(entry)).save()
}