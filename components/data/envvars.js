import mongoose from "../db"

const ObjectId = mongoose.Types.ObjectId
const EnvVarSchema = new mongoose.Schema({
    name: String,
    key: String,
    value: String,
    hide: Boolean,
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apps",
    },
}, { collection: "envvars" })
EnvVarSchema.index({
    app: 1,
    user: 1,
})

const EnvVarModel = mongoose.model("envvars", EnvVarSchema, "envvars")