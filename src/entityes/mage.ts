import {DamageType, Character} from "./characters";
import ApiError from "../exteptions/api-exceptions";

export class Mage extends Character{
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
            dmg_type: this.dmgType
        };
    }
    public gettingDamage(damage: any, hp: number): number {
        if(hp <= 0)
            throw ApiError.wrongAction('cant_attack');
        return (hp - damage.damage < 0)?0:hp - damage.damage;
    }
    public revive(hp: number): number {
        if(hp <= 0)
            return this.getHp();
        throw ApiError.wrongAction('cant_revive');
    }
    public useAbility(ownStatuses: number[], enemyStatuses: number[]): number[] {
        if(ownStatuses[1] != 0 || enemyStatuses[1] != 0)
            throw ApiError.wrongAction('cant_spell');
        enemyStatuses[1] = 1;
        return enemyStatuses;
    }
}