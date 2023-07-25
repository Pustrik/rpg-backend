import {Character, DamageType} from "./characters";
import ApiError from "../exteptions/api-exceptions";

export class Warrior extends Character{
    protected class: string;
    protected hp: number;
    protected damage: number;
    protected ability: string;
    protected dmgType: DamageType;

    constructor(name: string, health: number, damage: number, dmgType: DamageType, ability: string) {
            super();
            this.class = name;
            this.hp = health;
            this.damage = damage;
            this.dmgType = dmgType;
            this.ability = ability;
    }

    public getHp(): number {
        return this.hp;
    }
    public dealingDamage() {
        return {
            damage: this.damage,
            dmgType: this.dmgType
        };
    }
    public gettingDamage(damage: any, hp: number, statuses: number[]): number {
        if(hp <= 0)
            throw ApiError.wrongAction('cant_attack');
        if(statuses[0] == 0)
            return (hp - damage.damage < 0)?0:hp - damage.damage;
        if(damage.dmgType == DamageType.MAGICAL)
            return (hp - damage.damage < 0)?0:hp - damage.damage;
        throw ApiError.wrongAction('cant_attack');
    }
    public revive(hp: number): number {
        if(hp <= 0)
            return this.getHp();
        throw ApiError.wrongAction('cant_revive')
    }
    public useAbility(ownStatuses: number[]): number[] {
        if(ownStatuses[0] != 0 || ownStatuses[1] != 0)
            throw ApiError.wrongAction('cant_spell');;
        ownStatuses[0] = 1;
        return ownStatuses;
    }
}