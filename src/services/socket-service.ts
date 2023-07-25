import player_model from "../databases/mongo/models/player-model";
import playersDto from "../dtos/player-dto";
import {io} from "../socket/socket-server";
import IPlayer from "../interfaces/i-player";

export type SocketResponse = 'update_all' | 'update_one' | 'user_connected' | 'update_chat'| 'user_disconnected' | 'cant_attack' | 'cant_spell' | 'cant_revive' | 'error';

export default class SocketService {
    static async sendMessage(name: SocketResponse, users: string[], payload?: Object) {
        console.info('Emitting event: ' + name + ' to', users);
        if (users.length == 0) return;
        users.forEach((id) => (payload ? io.to(id).emit(name, payload) : io.to(id).emit(name)));
    }

    static async getAllSockets(): Promise<string[]> {
        return Object.values(Object.values(await player_model.find()).map((player) => {
            return playersDto(player);
        })).map((val) => {
            return val.socket_id
        });
    }

    static async getAllPlayers(): Promise<IPlayer[]> {
        return Object.values(await player_model.find()).map((player) => {
            return playersDto(player);
        });
    }

    static getSocketsButCurrent(players: IPlayer[], socket: string): string[] {
        return players.map((val) => {
            if (val.socket_id !== socket)
                return val.socket_id;
        });
    }

    static async applyResult(result: number, player: IPlayer) {
        player.hp = result;
        await player_model.updateOne({socket_id: player.socket_id}, {$set: {hp: result}});
        await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
        await this.sendMessage('update_one', [player.socket_id], player);
    }

    static async applySpell(result: number[], player: IPlayer) {
        player.statuses = result;
        await player_model.updateOne({socket_id: player.socket_id}, {$set: {statuses: result}});
        await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
        console.log('Upp one ' + player.socket_id + ' ' + Object.values(player));
        await this.sendMessage('update_one', [player.socket_id], player);
    }

    static async buffTimeout(player: IPlayer, status: number) {
        setTimeout(async () => {
            const userData = await player_model.findOne({socket_id: player.socket_id});
            if (!userData)
                return;
            userData.statuses[status] = 0;
            player.statuses = userData.statuses;
            await player_model.updateOne({socket_id: player.socket_id}, {$set: {statuses: userData.statuses}});
            await this.sendMessage('update_all', await this.getAllSockets(), await this.getAllPlayers());
            console.log('Undo buff ' + player.socket_id + ' ' + Object.values(player));
            await this.sendMessage('update_one', [player.socket_id], player)
        }, 10 * 1000);
    }
}