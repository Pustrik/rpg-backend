import IPlayer from '../../interfaces/i-player';
import IMessage from '../../interfaces/i-message';
import player_model from '../databases/mongo/models/player-model';
import {Socket} from 'socket.io';
import {CharacterFactory} from './character-service';
import playersFullDto from "../dtos/full-data-dto";
import {UsersRepo} from "../repositories/postgres/users-repo";
import SocketService from "./socket-service";
import ApiError from "../exteptions/api-exceptions";
import MessagesRepo from "../repositories/redis/messages-repo";

const factory = new CharacterFactory();
const characters = (async () => {
    return await factory.create()
})();
export default class ListenersService {
    static async handshake(socket: Socket, user: IPlayer, callback: (player: IPlayer, players: IPlayer[]) => void) {
        console.log('Handshake received from: ' + user.username);

        const reconnected = await SocketService.getAllSockets();
        if (reconnected.includes(socket.id)) {
            console.log('This user has reconnected');
            console.log('Sending callback for reconnect');
            callback(user, await SocketService.getAllPlayers());
            return;
        }
        const mesCache: IMessage[] = await MessagesRepo.getCache();

        const playerData = playersFullDto(await UsersRepo.getJoined(user.username));
        user.class_id = playerData.classId
        user.socket_id = socket.id;
        user.hp = playerData.hp;
        await player_model.create({
            socket_id: socket.id,
            username: user.username,
            hp: user.hp,
            statuses: user.statuses,
            class_id: user.class_id
        });
        const players = await SocketService.getAllPlayers();
        console.log('Sending callback');
        callback(user, players);
        await SocketService.sendMessage('user_connected', SocketService.getSocketsButCurrent(players, socket.id), players);
        await SocketService.sendMessage('update_chat', await SocketService.getAllSockets(), mesCache);
    }

    static async disconnect(socket: Socket) {
        console.log('Disconnect received from: ' + socket.id);
        const user = player_model.findOne({socket_id: socket.id});
        if (user) {
            await player_model.deleteOne({socket_id: socket.id});
            await SocketService.sendMessage('user_disconnected', await SocketService.getAllSockets(), socket.id);
        }
    }

    static async attack(socket: Socket, winger: IPlayer, victim: IPlayer) {
        const result = characters[victim.class_id].gettingDamage(characters[winger.class_id].dealingDamage(), victim.hp, victim.statuses);
        console.log('Attack result ' + winger.username + ' on ' + victim.username + ' = ' + result);
        if (winger.hp <= 0)
            throw ApiError.wrongAction('cant_attack');
        await SocketService.applyResult(result, victim);
    }

    static async revive(socket: Socket, player: IPlayer) {
        const result = characters[player.class_id].revive(player.hp);
        console.log('Revive result ' + player.username + ' hp: ' + player.hp + ' = ' + result);
        await SocketService.applyResult(result, player);
    }

    static async spell(socket: Socket, player: IPlayer, victim?: IPlayer) {
        if (player.hp <= 0 || victim && victim.hp <= 0)
            throw ApiError.wrongAction('cant_spell');

        if (victim) {
            const result = characters[player.class_id].useAbility(player.statuses, victim.statuses);
            console.log('Using spell: ' + player.username + ' on ' + victim.username);
            await SocketService.applySpell(result, victim);
            await SocketService.buffTimeout(victim, 1);
            return;
        }

        const result = characters[player.class_id].useAbility(player.statuses);
        console.log('Using spell: ' + player.username);
        await SocketService.applySpell(result, player);
        await SocketService.buffTimeout(player, 0);
    }

    static async message(socket: Socket, message: IMessage) {
        await MessagesRepo.write(message);
        const mesCache: IMessage[] = await MessagesRepo.getCache();
        console.log('Received message: ' + message.username + ': ' + message.message);
        await SocketService.sendMessage('update_chat', await SocketService.getAllSockets(), mesCache);
    }
}