declare const env: Readonly<{
    NODE_ENV: "development" | "test" | "production" | "staging";
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    DATABASE_URI: string;
    PORT: string;
    CONTRACT: string;
    INFURA_KEY: string;
    OPENSEA_API_KEY: string;
    ETHEREUM_NETWORK: string;
    POLYGON_NETWORK: string;
    MORALIS_API_KEY: string;
} & import("envalid").CleanedEnvAccessors>;
export default env;
