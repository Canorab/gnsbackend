import {
  GetUserType,
  UserDeleteType,
  UserType,
  UserUpdateType,
} from "@/config/schema.zod";
import { NextFunction, Request, RequestHandler, Response } from "express";

import UserModel from "@/models/user";
import { Web3 } from "web3";
import env from "@/env";
import { getBalance } from "@/helpers/web3Helpers";

/**
 * A conrtoller method for fetching all exsting users from mongodb
 * @param req
 * @param res
 * @param next
 * @method GET
 * @returns
 */
export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * * Implement the below in the pre-find hook of the UserModel
   */
  //1. Retreive all users docs from the users collection
  const users = await UserModel.find().select("-password").lean();
  if (!users?.length)
    return res.status(400).json({ message: "No users found !" });

  //2. Map through the returned array and for each user object, get the user.wallet field
  // users.map(async (user) => {
  //   if (user.wallet) {
  //     const balance = await getBalance(user.wallet);
  //     console.log(`Nft Balance: ${balance}`);
  //   }
  // });

  // const newDomains = filterDomains(apiRes, dbRes);
  // console.log(newDomains); // expectation: result should contain Nft3 and Nft4

  //3. Using web3js, communicate with the NFT contract and call the getBalance method
  //4. The above will return the current Nft count of the wallet
  //5. use it to update the domainsCount field of the user and save to Mongodb
  //6: outside of the map callback, you can now retrieve all users and assign to the res object

  // const web3 = new Web3(`https://mainnet.infura.io/v3/${env.INFURA_KEY}`);
  //  const {wallet, contract} = req.body

  // Final updated response
  res.json(users);
};

/**
 * A controller method for fetching a single user doc from mongodb
 * @param req
 * @param res
 * @method GET
 * @returns
 */

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  // Connect to the blockchain using web3js and retrieve the user's current
  // domainsCount, then update the user's mongodb doc with the new domainsCount value
  // Before retrieving the updated doc.
  // Also fetch the user's nfts from opensea and update the domains collection with the user's
  // new nfts  (i.e the user's nfts that doesn't already exist in mongodb)
  /**
   * * Implement the above in the pre-findOne hook of the UserModel.
   * */

  // const { id }: GetUserType["params"] = req.params;
  const { id } = req.params;
  // const { wallet }: GetUserType["body"] = req.body;

  const user = await UserModel.findById(id).select("-password").lean().exec();
  if (!user) return res.status(409).json({ message: "User not found" });

  res.json(user);
};

/**
 * A controller method for fetching a single user's referrals. I.e docs from the users collecton which has this user n their referrerUsername field.
 * @param req
 * @param res
 * @method GET
 * @returns
 */

export const getUserReferrals: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;

  const users = await UserModel.find({ referrerUsername: username })
    .select("-password")
    .lean()
    .exec();
  if (!users?.length)
    return res.status(409).json({ message: "User has no referrals" });

  res.json(users);
};

/**
 * A controller method for adding a single new user
 * @param req
 * @param res
 * @method POST
 * @returns
 */

export const addUser: RequestHandler = async (req: Request, res: Response) => {
  //   userSchema.parse(req.body);

  const {
    username,
    firstName,
    lastName,
    password,
    email,
    domainsCount,
    wallet,
    referrerId,
    referrerUsername,
    roles,
    active,
    terms,
  }: UserType["body"] = req.body;

  /* Connect the blockchain using web3js and retrieve the domain count associated 
  with the user's wallet (req.wallet)
Then assign it to the domainCount field before creating a new userModel doc.
*/
  const duplicate = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Username taken, try another one !" });

  const user = await UserModel.create({
    firstName,
    lastName,
    username,
    password,
    email,
    domainsCount,
    wallet,
    referrerId,
    referrerUsername,
    roles,
    active,
    terms,
  });

  res.json({ message: "User created successfully !", body: user });
};

/**
 * Controller method for updating a single existing user
 * @param req
 * @param res
 * @method PATCH
 * @returns
 */
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  //1. Retrieve id, Username (user's Mongodb Doc ID) from  the request body, terminate if it doesn't exist
  // const { id, username, domains, password, active }: UserUpdateType = req.body;
  const { id } = req.params;
  const {
    // id,
    username,
    domainsCount,
    password,
    active,
  }: UserUpdateType["body"] = req.body;

  //2. Fetch a user from Mongodb using the provided Id, terminate if no record was found
  const user = await UserModel.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found !" });
  if (!user?.active)
    return res.status(401).json({ message: "Banned User. Contact Admin!" });

  //3. Check for duplicate user by using the username provided above to fetch a new user
  // Then check if the newly found user's doc Id is equal to the first found user's doc Id
  // If both users doesn't have a matching doc Id, it means a single person have 2 accounts
  // Therefore, terminate with an error.
  const duplicate = await UserModel.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate User Found !" });

  //4. Implement a switch statement to check the value of res.body and then assigning
  // values from the provided data in res.body to the various fields of the first found user
  // or generated data in the case of password.

  if (domainsCount) user.domainsCount = domainsCount; //parseInt(domains);
  if (active) user.active = active;
  if (password) user.password = password;

  //5. Save the  changes to the firstly found mongodb user
  const updatedUser = await user.save();
  // console.log(updatedUser);
  res.json({
    message: `Updated User ${updatedUser.username} !`,
    body: updatedUser,
  });
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  // const { id }: UserDeleteType["body"] = req.body;
  const user = await UserModel.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found !" });

  const result = await user.deleteOne();

  const reply = `User ${user.username} with ID ${user.id} is deleted !`;
  res.json({ mesage: reply, body: result });
};

// module.exports = { getAllUsers, addUser };

// Aggregation Pipelines For User Stats

//1. getUserReferralsCount : This constroller should respond with a count of docs from the Users collection that has this user in their referrerUsername
//1b. This should serve both Total referrals and ReferralsToday (just filter response and use records where createdAt is today) or make another controller for it.
// 2. getUserTodayReferralCount - This controller should respond with the numbers of docs from the users collection whose referralUsername field
//has this user's username and whose createdAt field has a value of 24 hours or less.

//4. This should serve both the Domains and Domains Today

// Aggregation Pipeline for Admn Stats
/*
1. getAllUsersReferralsCount: This controller should simply respond with the numbers of docs from the Users collection.
2. getTodayUsersCount - This controller should respond with the numbers of docs from the Users collection whose createdAt field
has a value of 24 hours or less. 
*/

// 1. getAllUsersReferralsCount: This controller should simply respond with the numbers of docs from the Users collection.

export const getAllUsersCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const allUsersCount = await UserModel.aggregate().count("count");

  res.json(...allUsersCount);
};

// 2. getTodayUsersCount - This controller should respond with the numbers of docs from the Users collection whose createdAt field
// has a value of 24 hours or less.

export const getTodayUsersCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // const {date} = req.body // pass date value (current date using new Date()) from the frontend along with the request
  const todaySignups = await UserModel.aggregate([
    // {
    //   $match: {
    //     createdAt: new Date("2024-04-21T22:06:24.117Z"),
    //     // createdAt: new Date('<YYYY-mm-ddTHH:MM:ssZ>'),
    //   },
    // },
    {
      $match: {
        $expr:
          // { $lt: [{ $dateDiff: { startDate: "$_id", endDate: "$$NOW", unit: "hour" } }, 24 ]}
          {
            $lt: [
              {
                $dateDiff: {
                  startDate: "$_id",
                  endDate: "$$NOW",
                  unit: "hour",
                },
              },
              24,
            ],
          },
      },
    },
  ]).count("total");

  res.json(todaySignups);
};

// Aggregation Pipelines For User Stats

//3. getUserReferralDomainsCount: This controller should response with a list of docs in the Domains collection whose username field
// contains a user(username) that has this user in their referrerUsername field.
// or get the referrals of this user and then match domain docs containing each of the referrals usernames
/*
Step 1: Fetch the user's referrals
Step 2: Fetch the domains of each user in the above referral resultSet.
*/

export const getUserReferralsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  const userReferrals = await UserModel.aggregate([
    {
      $match: {
        referrerUsername: `${username}`,
      },
    },
  ]).count("total");

  res.json(userReferrals);
};
// Get all doc from the users collection which has this user's username in their referralUsername field and has a createdAt value of today (within 24 hours)
export const getTodayUserReferralsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  const userReferrals = await UserModel.aggregate([
    {
      $match: {
        referrerUsername: `${username}`,
        createdAt: new Date("2024-04-21T22:06:24.117Z"),
      },
    },
  ]).count("total");

  res.json(userReferrals);
};

export const getUserReferralDomainsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  const userReferralDomains = await UserModel.aggregate([
    { $match: { referrerUsername: `${username}` } },
    {
      $lookup: {
        from: "domains",
        localField: "username",
        foreignField: "username",
        as: "user_domains",
      },
    },
    {
      $unwind: "$user_domains",
    },
    // {
    //   $group: {
    //     _id: null,
    //     total: { $sum: 1 },
    //   },
    // },
  ]).count("total");

  res.json(userReferralDomains);
};

// Get the domains this user's referrals has minted within the last 24 hours (i.e today)
export const getTodayUserReferralDomainsCount: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.params;
  const userReferralDomains = await UserModel.aggregate([
    {
      $match: {
        referrerUsername: `${username}`,
        // createdAt: new Date("2024-04-21T22:06:24.926Z"),
      },
    },
    {
      $lookup: {
        from: "domains",
        // let: {createdAt: "$createdAt"},
        pipeline: [
          { $match: { createdAt: new Date("2024-04-21T22:06:24.926Z") } },
          // { $match: { createdAt: new Date("YYYY-mm-ddTHH:MM:ssZ") } },
        ],
        localField: "username",
        foreignField: "username",
        as: "referrals_domains",
      },
    },
    {
      $unwind: "$referrals_domains",
    },
  ]).count("total");

  res.json(userReferralDomains);
};

// Date string: <YYYY-mm-ddTHH:MM:ssZ>
