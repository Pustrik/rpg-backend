"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_model_1 = __importDefault(require("../databases/mongo/models/player-model"));
const character_service_1 = require("./character-service");
const full_data_dto_1 = __importDefault(require("../dtos/full-data-dto"));
const users_repo_1 = require("../repositories/postgres/users-repo");
const socket_service_1 = __importDefault(require("./socket-service"));
const api_exceptions_1 = __importDefault(require("../exteptions/api-exceptions"));
const messages_repo_1 = __importDefault(require("../repositories/redis/messages-repo"));
const factory = new character_service_1.CharacterFactory();
const characters = (async () => {
    return await factory.create();
})();
class ListenersService {
    static async handshake(socket, user, callback) {
        console.log('Handshake received from: ' + user.username);
        const reconnected = await socket_service_1.default.getAllSockets();
        if (reconnected.includes(socket.id)) {
            console.log('This user has reconnected');
            console.log('Sending callback for reconnect');
            callback(user, await socket_service_1.default.getAllPlayers());
            return;
        }
        const mesCache = await messages_repo_1.default.getCache();
        const playerData = (0, full_data_dto_1.default)(await users_repo_1.UsersRepo.getJoined(user.username));
        user.class_id = playerData.classId;
        user.socket_id = socket.id;
        user.hp = playerData.hp;
        await player_model_1.default.create({
            socket_id: socket.id,
            username: user.username,
            hp: user.hp,
            statuses: user.statuses,
            class_id: user.class_id
        });
        const players = await socket_service_1.default.getAllPlayers();
        console.log('Sending callback');
        callback(user, players);
        await socket_service_1.default.sendMessage('user_connected', socket_service_1.default.getSocketsButCurrent(players, socket.id), players);
        await socket_service_1.default.sendMessage('update_chat', await socket_service_1.default.getAllSockets(), mesCache);
    }
    static async disconnect(socket) {
        console.log('Disconnect received from: ' + socket.id);
        const user = player_model_1.default.findOne({ socket_id: socket.id });
        if (user) {
            await player_model_1.default.deleteOne({ socket_id: socket.id });
            await socket_service_1.default.sendMessage('user_disconnected', await socket_service_1.default.getAllSockets(), socket.id);
        }
    }
    static async attack(socket, winger, victim) {
        const result = characters[victim.class_id].gettingDamage(characters[winger.class_id].dealingDamage(), victim.hp, victim.statuses);
        console.log('Attack result ' + winger.username + ' on ' + victim.username + ' = ' + result);
        if (winger.hp <= 0)
            throw api_exceptions_1.default.wrongAction('cant_attack');
        await socket_service_1.default.applyResult(result, victim);
    }
    static async revive(socket, player) {
        const result = characters[player.class_id].revive(player.hp);
        console.log('Revive result ' + player.username + ' hp: ' + player.hp + ' = ' + result);
        await socket_service_1.default.applyResult(result, player);
    }
    static async spell(socket, player, victim) {
        if (player.hp <= 0 || victim && victim.hp <= 0)
            throw api_exceptions_1.default.wrongAction('cant_spell');
        if (victim) {
            const result = characters[player.class_id].useAbility(player.statuses, victim.statuses);
            console.log('Using spell: ' + player.username + ' on ' + victim.username);
            await socket_service_1.default.applySpell(result, victim);
            await socket_service_1.default.buffTimeout(victim, 1);
            return;
        }
        const result = characters[player.class_id].useAbility(player.statuses);
        console.log('Using spell: ' + player.username);
        await socket_service_1.default.applySpell(result, player);
        await socket_service_1.default.buffTimeout(player, 0);
    }
    static async message(socket, message) {
        await messages_repo_1.default.write(message);
        const mesCache = await messages_repo_1.default.getCache();
        console.log('Received message: ' + message.username + ': ' + message.message);
        await socket_service_1.default.sendMessage('update_chat', await socket_service_1.default.getAllSockets(), mesCache);
    }
}
exports.default = ListenersService;
//# sourceMappingURL=listeners-service.js.map