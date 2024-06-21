export declare const getNewDomains: <T extends {
    name: string;
}, K extends {
    name: string;
}>(apiRes: T[] | undefined, dbRes: K[]) => T[] | undefined;
export declare const apiRes: {
    name: string;
    collection: string;
}[];
export declare const dbRes: {
    name: string;
    collection: string;
}[];
