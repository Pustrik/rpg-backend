import player_model from "../../databases/mongo/models/player-model";

export default class SessionRepo {
    static async clear() {
        await player_model.deleteOne();
    };
}