export const filterDomains = (apiRes, dbRes) => {
  for (let i = 0; i > dbRes.length; i++) {
    const ownedNft = dbRes[i];
    apiRes.map((items) => items.name !== ownedNft.name);
  }
};
