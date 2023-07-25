import {Socket} from "socket.io";
import IPlayer from "../interfaces/i-player";
import IMessage from "../interfaces/i-message";
import errorHandler from "../middleware/socket-middleware/errorhandler";
import ListenersService from "../services/listeners-service";

const startListeners = (socket: Socket) => {
    console.info('Message received from ' + socket.id);

    socket.on('handshake', errorHandler(async (user: IPlayer, callback: (player: IPlayer, players: IPlayer[]) => void) => {
        await ListenersService.handshake(socket, user, callback);
    }, socket.id));

    socket.on('disconnect', errorHandler(async () => {
        await ListenersService.disconnect(socket);
    }, socket.id));

    socket.on('attack', errorHandler(async (winger: IPlayer, victim: IPlayer) => {
        await ListenersService.attack(socket, winger, victim);
    }, socket.id));

    socket.on('revive', errorHandler(async (player: IPlayer) => {
        await ListenersService.revive(socket, player);
    }, socket.id));

    socket.on('spell', errorHandler(async (player: IPlayer, victim?: IPlayer) => {
        await ListenersService.spell(socket, player, victim);
    }, socket.id));

    socket.on('message', errorHandler(async (message: IMessage) => {
        await ListenersService.message(socket, message);
    }, socket.id));
}

export default startListeners;

