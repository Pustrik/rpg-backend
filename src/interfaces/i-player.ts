interface IPlayer {
    socket_id: string,
    username: string,
    hp: number,
    statuses: Array<number>,
    class_id: number
}

export default IPlayer;