import * as mongoose from "mongoose";

const tokenModel = mongoose.Schema;
const token = new tokenModel({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true,
    },
    refresh_token: {
        type: String,
        required: true
    },
});

const token_model = mongoose.model('token', token);

export default token_model;