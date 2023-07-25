"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_model_1 = __importDefault(require("../../databases/mongo/models/player-model"));
class SessionRepo {
    static async clear() {
        await player_model_1.default.deleteOne();
    }
    ;
}
exports.default = SessionRepo;
//# sourceMappingURL=session-repo.js.map