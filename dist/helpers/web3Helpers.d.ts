export declare const getBalance: (walletAddress: string) => Promise<number>;
export declare const openseaGetUserNfts: (address: string) => Promise<{
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
}[] | undefined>;
export declare const moralisGetUserNfts: (address: string) => Promise<void>;
