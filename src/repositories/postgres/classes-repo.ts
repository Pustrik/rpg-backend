import getCurrentDate from "../../utills/current-time-utill";
import IClassPDB from "../../../interfaces/i-class-pdb";
import {Class} from "../../databases/postgres/models/class-model";

export default class ClassesRepo {

    static async add(id: number, name: string, health: number, damage: number, attack_type: number, ability: string): Promise<IClassPDB> {
        const userData = await Class.create({
            id: id,
            name: name,
            health: health,
            damage: damage,
            attack_type: attack_type,
            ability: ability,
            created_at: getCurrentDate(),
            updated_at: getCurrentDate()
        });
        return userData.toJSON();
    }

    static async getById(id: number): Promise<IClassPDB> {
        const classData = await Class.findOne({
            attributes: ['id', 'name', 'health', 'damage', 'attack_type', 'ability', 'created_at', 'updated_at'],
            where: {
                id: id
            }
        });
        return classData.toJSON();
    }

    static async update(id: number, name: string, health: number, damage: number, attack_type: number, ability: string) {
        const classData = await Class.update(
            {
                id: id,
                name: name,
                health: health,
                damage: damage,
                attack_type: attack_type,
                ability: ability,
                updated_at: getCurrentDate()
            },
            {
                where: {
                    id: id
                }
            }
        );
        return classData;
    };
}