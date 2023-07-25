"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDB = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const session_repo_1 = __importDefault(require("../../repositories/mongo/session-repo"));
mongoDB.set('strictQuery', false);
dotenv_1.default.config();
class MongoDB {
    constructor() {
    }
    async connect() {
        await mongoDB.connect(process.env.MONGODB_URL)
            .then(async () => {
            console.log('Connected to mongoDB');
            await session_repo_1.default.clear();
        })
            .catch((e) => console.log('Cant connect to mongoDB: ' + e));
    }
}
exports.default = new MongoDB();
//# sourceMappingURL=mongo-db.js.map