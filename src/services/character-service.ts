import {Thief} from "../entityes/thief";
import {Warrior} from "../entityes/warrior";
import {Mage} from "../entityes/mage";
import IClassPDB from "../../interfaces/i-class-pdb";
import ClassesRepo from "../repositories/postgres/classes-repo";

export enum CharClass {
    WARRIOR,
    MAGE,
    THIEF,
    SIZE
}

const createCharacter = async (char: CharClass): Promise<Warrior | Mage | Thief> => {
    const classInfo: IClassPDB = await ClassesRepo.getById(char);
    switch (char) {
        case CharClass.WARRIOR:
            return new Warrior(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        case CharClass.MAGE:
            return new Mage(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        case CharClass.THIEF:
            return new Thief(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        default:
            return new Warrior(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
    }
}

export class CharacterFactory {
    async create() {
        try {
            const characters: Array<Warrior | Mage | Thief> = [];
            for (let key = 0; key < CharClass.SIZE; key++) {
                characters.push(await createCharacter(Number(key)));
            }
            return characters;
        } catch (e) {
            console.log(e);
        }
    }
}