import mongoose from "../db"
import bcrypt from "bcrypt"

const UsersSchema = new mongoose.Schema({
    name: String,
    repoUser: String,
    email: String,
    passwordHash: String,
}, { collection: "users" })
UsersSchema.index({
    repo: 1,
})

const UsersModel = mongoose.model("users", UsersSchema, "users")

const saltRounds = 10;

export const get = (id) => {
    return UsersModel.findOne({
        _id: mongoose.Schema.Types.ObjectId(id),
    }).exec()
}

export const getUserForEmail = (email) => {
    return UsersModel.findOne({
        email,
    }).exec()
}

export const createUser = async ({ name, email, password }) => {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    return (new UsersModel({ name, email, passwordHash })).save()
}

export const checkLogin = async (email, password) => {
    const user = await getUserForEmail(email)
    if (!user) {
        await bcrypt.compare(password, "$2b$10$3zPZXXXqVQjcFymS7Hww6.ONzvZ3KNP0tHZqXJs0Xa71ddzcoyTcK"); // this makes the request take as long as if a user was found to prevent brute force of users
        return false
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    
    if (match) {
        return user
    }
    
    return false
}