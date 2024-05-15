import { domainSchemaType, nftListSchemaType } from "../config/schema.zod";
export declare const getNewDomains: (apiRes: nftListSchemaType["nfts"] | undefined, dbRes: domainSchemaType[]) => {
    name: string;
    image_url: string;
    description: string;
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    metadata_url: string;
    opensea_url: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
}[] | undefined;
export declare const apiRes: {
    name: string;
    collection: string;
}[];
export declare const dbRes: {
    name: string;
    collection: string;
}[];
