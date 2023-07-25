import * as mongoose from "mongoose";

const playerModel = mongoose.Schema;
const player = new playerModel({
    socket_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hp: {
        type: Number,
        required: true
    },
    statuses: {
        type: Array<number>
    },
    class_id: {
        type: Number
    }
});

const player_model = mongoose.model('player', player);
export default player_model;