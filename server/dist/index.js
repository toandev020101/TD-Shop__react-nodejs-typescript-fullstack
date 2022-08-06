"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    dotenv_1.default.config();
    await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'TDShop',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [user_1.User],
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`SERVER STARTED ON http://localhost:${PORT}`));
};
main().catch((err) => console.log('ERROR STARTING SERVER: ', err));
//# sourceMappingURL=index.js.map