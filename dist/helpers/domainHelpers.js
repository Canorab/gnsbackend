"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRes = exports.apiRes = exports.getNewDomains = void 0;
const getNewDomains = (apiRes, dbRes) => {
    if (!(apiRes === null || apiRes === void 0 ? void 0 : apiRes.length))
        return;
    if (!(dbRes === null || dbRes === void 0 ? void 0 : dbRes.length)) {
        const results = apiRes.map((item) => item);
        return results;
    }
    const ownedNfts = dbRes.map((item) => item.name);
    const newNfts = apiRes === null || apiRes === void 0 ? void 0 : apiRes.filter((item) => !ownedNfts.includes(item.name));
    return newNfts;
};
exports.getNewDomains = getNewDomains;
exports.apiRes = [
    {
        name: "Nft1",
        collection: "GNS",
    },
    {
        name: "Nft2",
        collection: "GNS",
    },
    {
        name: "Nft3",
        collection: "GNS",
    },
    {
        name: "Nft4",
        collection: "GNS",
    },
];
exports.dbRes = [
    {
        name: "Nft1",
        collection: "GNS",
    },
    {
        name: "Nft2",
        collection: "GNS",
    },
];
