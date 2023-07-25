"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mage = void 0;
const characters_1 = require("./characters");
const api_exceptions_1 = __importDefault(require("../exteptions/api-exceptions"));
class Mage extends characters_1.Character {
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
            dmg_type: this.dmgType
        };
    }
    gettingDamage(damage, hp) {
        if (hp <= 0)
            throw api_exceptions_1.default.wrongAction('cant_attack');
        return (hp - damage.damage < 0) ? 0 : hp - damage.damage;
    }
    revive(hp) {
        if (hp <= 0)
            return this.getHp();
        throw api_exceptions_1.default.wrongAction('cant_revive');
    }
    useAbility(ownStatuses, enemyStatuses) {
        if (ownStatuses[1] != 0 || enemyStatuses[1] != 0)
            throw api_exceptions_1.default.wrongAction('cant_spell');
        enemyStatuses[1] = 1;
        return enemyStatuses;
    }
}
exports.Mage = Mage;
//# sourceMappingURL=mage.js.map