"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function playersDto(player) {
    return {
        socket_id: player.socket_id,
        username: player.username,
        hp: player.hp,
        statuses: player.statuses,
        class_id: player.class_id
    };
}
exports.default = playersDto;
//# sourceMappingURL=player-dto.js.map