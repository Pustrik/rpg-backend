"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_model_1 = __importDefault(require("../databases/mongo/models/player-model"));
const player_dto_1 = __importDefault(require("../dtos/player-dto"));
const socket_server_1 = require("../socket/socket-server");
class SocketService {
    static async sendMessage(name, users, payload) {
        console.info('Emitting event: ' + name + ' to', users);
        if (users.length == 0)
            return;
        users.forEach((id) => (payload ? socket_server_1.io.to(id).emit(name, payload) : socket_server_1.io.to(id).emit(name)));
    }
    static async getAllSockets() {
        return Object.values(Object.values(await player_model_1.default.find()).map((player) => {
            return (0, player_dto_1.default)(player);
        })).map((val) => {
            return val.socket_id;
        });
    }
    static async getAllPlayers() {
        return Object.values(await player_model_1.default.find()).map((player) => {
            return (0, player_dto_1.default)(player);
        });
    }
    static getSocketsButCurrent(players, socket) {
        return players.map((val) => {
            if (val.socket_id !== socket)
                return val.socket_id;
        });
    }
    static async applyResult(result, player) {
        player.hp = result;
        await player_model_1.default.updateOne({ socket_id: player.socket_id }, { $set: { hp: result } });
        await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
        await this.sendMessage('update_one', [player.socket_id], player);
    }
    static async applySpell(result, player) {
        player.statuses = result;
        await player_model_1.default.updateOne({ socket_id: player.socket_id }, { $set: { statuses: result } });
        await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
        console.log('Upp one ' + player.socket_id + ' ' + Object.values(player));
        await this.sendMessage('update_one', [player.socket_id], player);
    }
    static async buffTimeout(player, status) {
        setTimeout(async () => {
            const userData = await player_model_1.default.findOne({ socket_id: player.socket_id });
            if (!userData)
                return;
            userData.statuses[status] = 0;
            player.statuses = userData.statuses;
            await player_model_1.default.updateOne({ socket_id: player.socket_id }, { $set: { statuses: userData.statuses } });
            await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
            console.log('Undo buff ' + player.socket_id + ' ' + Object.values(player));
            await this.sendMessage('update_one', [player.socket_id], player);
        }, 10 * 1000);
    }
}
exports.default = SocketService;
//# sourceMappingURL=socket-service.js.map