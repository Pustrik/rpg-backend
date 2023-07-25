import * as mongoose from "mongoose";

const userModel = mongoose.Schema;
const user = new userModel({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const user_model = mongoose.model('user', user);

export default user_model;