import {
  domainSchemaType,
  nftListSchemaType,
  nftSchemaType,
} from "@/config/schema.zod";

// export const getNewDomains = (
//   apiRes: nftListSchemaType["nfts"] | undefined,
//   dbRes: domainSchemaType[]
// ) => {
//   if (!apiRes?.length) return; // If user hasn't bought any Nft, terminate.
//   if (!dbRes?.length) {
//     const results = apiRes.map((item) => item);
//     return results;
//   }
//   const ownedNfts = dbRes.map((item) => item.name);
//   const newNfts = apiRes?.filter((item) => !ownedNfts.includes(item.name));
//   return newNfts;
// };
export const getNewDomains = <
  T extends { name: string },
  K extends { name: string },
>(
  apiRes: T[] | undefined,
  dbRes: K[]
) => {
  if (!apiRes?.length) return; // If user hasn't bought any Nft, terminate.
  if (!dbRes?.length) {
    // const results = apiRes.map((item) => item);
    // return results;
    return apiRes;
  }
  const ownedNfts = dbRes.map((item) => item.name);
  const newNfts = apiRes.filter((item) => !ownedNfts.includes(item.name));
  return newNfts;
};

// const apiRes:Object[] = new Array()
export const apiRes = [
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

export const dbRes = [
  {
    name: "Nft1",
    collection: "GNS",
  },
  {
    name: "Nft2",
    collection: "GNS",
  },
];

// const newDomains = filterDomains(apiRes, dbRes);
// console.log(newDomains); // expectation: result should contain Nft3 and Nft4
