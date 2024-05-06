import { Document, Model, Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

import DomainModel from "./domain";
import { UserType } from "@/config/schema.zod";
import { getNewDomains } from "@/helpers/domainHelpers";
import { openseaGetUserNfts } from "@/helpers/web3Helpers";

// type UserDocument = Document & {
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   domains: number;
//   wallet: string;
//   referrerId: string;
//   referrerUsername: string;
//   //   role: "user" | "admin";
//   roles: string[];
//   active: boolean;
//   terms: boolean;
// };
type UserDocument = Document & UserType["body"];

type Methods = {
  comparePassword: (password: string) => Promise<boolean>;
};

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // domainsCount: {
    //   type: Number,
    //   // required: true,
    //   default: 0,
    // },
    wallet: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    referrerId: {
      // type: Schema.Types.ObjectId,
      type: String,
      // required: true,
      trim: true,
    },
    referrerUsername: {
      type: String,
      // required: true,
      trim: true,
    },
    roles: {
      type: [String],
      required: true,
      //   enum: ["user", "admin"],
      default: ["user"],
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    terms: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// userSchema.pre("find", async function () {
//   console.log(this.getQuery);
//   console.log(this.getFilter);
//   console.log(this.getOptions);
// });

// userSchema.pre("findOne", async function (next, query) {
//   // console.log(this.findOne());
//   // console.log(this);

//   next();
// });

// userSchema.post("findOne", async function (doc, next) {
//   console.log("Post Find results:", doc);
//   // console.log(this);
//   next();
// });

userSchema.post("save", async function (doc, next) {
  // Check if the newly created user (doc) has domains
  const userDomains = await DomainModel.find({ username: doc.username }).exec();

  // Pull up the domains
  /**
   * 1. Retrieve the the newly created user's wallet from doc.wallet
   * 2. use it to retrieve their NFT collection from opensea api and store in apiRes
   */
  const userNfts = await openseaGetUserNfts(doc.wallet);

  // Check if the user has new domains
  const newDomains = getNewDomains(userNfts, userDomains);
  if (newDomains?.length) {
    newDomains.map(async (item) => {
      const newDomainDoc = {
        userId: doc._id,
        username: doc.username,
        firstName: doc.firstName,
        lastName: doc.lastName,
        name: item.name,
        image_url: item.image_url,
        identfier: item.identifier,
        wallet: doc.wallet,
        data: {
          name: item.name,
          description: item.description,
          image_url: item.image_url,
          identifier: item.identifier,
        },
      };

      const response = await DomainModel.create(newDomainDoc);
      console.log(`New Domain Created:`, response);
    });
  }

  //* 3. map through the userNfts and
  //* 4. Construct a const newDomain object = {userd: doc._id, firstName: doc.firstName, value: item.name ...data:item} for each of the nft item.
  //* 5. From within the map function, insert the newDomain object into mongodb and save.

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const UserModel = model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;

// const user = {
//   "firstName": "Zufi",
//   "lastName": "Stainless",
//   "username": "zstain",
//   "password": "Password10",
//   "email": "zstain@mail.com",
//   "domainsCount": 0,
//   "wallet": "0x133beFb8Aba683081F7c07B4C5585B7b44da9035",
//   "referrerId": "661c0e8a0ff9644008f7b87d",
//   "referrerUsername": "Adminroot001",
//   "terms": true
// }
