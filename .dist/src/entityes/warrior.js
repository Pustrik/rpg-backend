"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const characters_1 = require("./characters");
const api_exceptions_1 = __importDefault(require("../exteptions/api-exceptions"));
class Warrior extends characters_1.Character {
    constructor(name, health, damage, dmgType, ability) {
        super();
        this.class = name;
        this.hp = health;
        this.damage = damage;
        this.dmgType = dmgType;
        this.ability = ability;
    }
    getHp() {
        return this.hp;
    }
    dealingDamage() {
        return {
            damage: this.damage,
            dmgType: this.dmgType
        };
    }
    gettingDamage(damage, hp, statuses) {
        if (hp <= 0)
            throw api_exceptions_1.default.wrongAction('cant_attack');
        if (statuses[0] == 0)
            return (hp - damage.damage < 0) ? 0 : hp - damage.damage;
        if (damage.dmgType == characters_1.DamageType.MAGICAL)
            return (hp - damage.damage < 0) ? 0 : hp - damage.damage;
        throw api_exceptions_1.default.wrongAction('cant_attack');
    }
    revive(hp) {
        if (hp <= 0)
            return this.getHp();
        throw api_exceptions_1.default.wrongAction('cant_revive');
    }
    useAbility(ownStatuses) {
        if (ownStatuses[0] != 0 || ownStatuses[1] != 0)
            throw api_exceptions_1.default.wrongAction('cant_spell');
        ;
        ownStatuses[0] = 1;
        return ownStatuses;
    }
}
exports.Warrior = Warrior;
//# sourceMappingURL=warrior.js.map