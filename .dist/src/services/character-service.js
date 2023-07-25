"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterFactory = exports.CharClass = void 0;
const thief_1 = require("../entityes/thief");
const warrior_1 = require("../entityes/warrior");
const mage_1 = require("../entityes/mage");
const classes_repo_1 = __importDefault(require("../repositories/postgres/classes-repo"));
var CharClass;
(function (CharClass) {
    CharClass[CharClass["WARRIOR"] = 0] = "WARRIOR";
    CharClass[CharClass["MAGE"] = 1] = "MAGE";
    CharClass[CharClass["THIEF"] = 2] = "THIEF";
    CharClass[CharClass["SIZE"] = 3] = "SIZE";
})(CharClass = exports.CharClass || (exports.CharClass = {}));
const createCharacter = async (char) => {
    const classInfo = await classes_repo_1.default.getById(char);
    switch (char) {
        case CharClass.WARRIOR:
            return new warrior_1.Warrior(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        case CharClass.MAGE:
            return new mage_1.Mage(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        case CharClass.THIEF:
            return new thief_1.Thief(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
        default:
            return new warrior_1.Warrior(classInfo.name, classInfo.health, classInfo.damage, classInfo.attack_type, classInfo.ability);
    }
};
class CharacterFactory {
    async create() {
        try {
            const characters = [];
            for (let key = 0; key < CharClass.SIZE; key++) {
                characters.push(await createCharacter(Number(key)));
            }
            return characters;
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.CharacterFactory = CharacterFactory;
//# sourceMappingURL=character-service.js.map