"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function playersFullDto(player) {
    return {
        id: player.id,
        username: player.username,
        email: player.email,
        hp: player.Class.health,
        className: player.Class.name,
        classId: player.class_id,
        damage: player.Class.damage,
        attackType: player.Class.attack_type
    };
}
exports.default = playersFullDto;
//# sourceMappingURL=full-data-dto.js.map