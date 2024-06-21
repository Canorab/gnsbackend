import { Document, Model, Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

import DomainModel from "./domain";
import { UserType } from "@/config/schema.zod";
import { getNewDomains } from "@/helpers/domainHelpers";
import { openseaGetUserNfts } from "@/helpers/web3Helpers";

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

userSchema.post("save", async function (doc, next) {
  // Check if the newly created user (doc) has domains
  const userDomains = await DomainModel.find({ username: doc.username }).exec();

  const userNfts = await openseaGetUserNfts(doc.wallet);

  // Check if the user has new domains
  const newDomains = getNewDomains(userNfts, userDomains);
  if (newDomains?.length) {
    newDomains.map(async (item) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    });
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const UserModel = model("User", userSchema);
// Check for duplicate field
// UserModel.on("error", function (err) {
//   console.log(err);
// });

export default UserModel as Model<UserDocument, {}, Methods>;
