import mongoose from "../db"

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: Object,
}, { collection: "users" })
UsersSchema.index({
    repo: 1,
})

const UsersModel = mongoose.model("users", UsersSchema, "users")

export const getUser = (id) => {
    return UsersModel.findOne({
        _id: mongoose.Schema.Types.ObjectId(id),
    }).exec()
}
