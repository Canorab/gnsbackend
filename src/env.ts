import { cleanEnv, email, json, str } from "envalid";

const env = cleanEnv(process.env, {
  //   API_KEY: str(),
  //   ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  //   EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' }),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  DATABASE_URI: str(),
  PORT: str(),
  CONTRACT: str(),
  INFURA_KEY: str(),
  OPENSEA_API_KEY: str(),
  ETHEREUM_NETWORK: str(),
  POLYGON_NETWORK: str(),
  MORALIS_API_KEY: str(),
});

export default env;
