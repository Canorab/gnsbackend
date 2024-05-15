"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({ choices: ["development", "test", "production", "staging"] }),
    ACCESS_TOKEN_SECRET: (0, envalid_1.str)(),
    REFRESH_TOKEN_SECRET: (0, envalid_1.str)(),
    DATABASE_URI: (0, envalid_1.str)(),
    PORT: (0, envalid_1.str)(),
    CONTRACT: (0, envalid_1.str)(),
    INFURA_KEY: (0, envalid_1.str)(),
    OPENSEA_API_KEY: (0, envalid_1.str)(),
    ETHEREUM_NETWORK: (0, envalid_1.str)(),
    POLYGON_NETWORK: (0, envalid_1.str)(),
    MORALIS_API_KEY: (0, envalid_1.str)(),
});
exports.default = env;
