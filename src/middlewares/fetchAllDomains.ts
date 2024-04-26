/**
 *  * Consider implementing in pre ("find") hook of the domainsModel
 * * This middleware should serve to update and sync every user's domains on the blockchain with mongodb
 * * This will mostly be put to use when admin is trying to view the domain list from their dashboard
 * 1. Fetch all users using .find()
 * 2. Map through the returned array of users
 * 3. For each user, retrieve their wallet(user.wallet) and Username(user.username) fields.
 * 4. Use the retrieved wallet address to fetch all Nfts of the wallet using the opensea api and store in const apiRes
 * 5. At the same time, use the retrieved username to pull up the user's existing domains from the mongodb domains collection and store in const dbRes
 * 6. Compare the 2 arrays and return only items from apiRes which doesn't exist in dbRes.
 * 7. Do a batch insert into mongodb (the domains collection) with the returned array. use insertMany()
 * Use with the getAllUsersDomains controller
 */
