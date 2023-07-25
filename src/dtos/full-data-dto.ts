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
    }
}

export default playersFullDto;