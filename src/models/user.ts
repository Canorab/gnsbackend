import { Document, Model, Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

type UserDocument = Document & {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  domains: number;
  wallet: string;
  referrerId: string;
  referrerUsername: string;
  //   role: "user" | "admin";
  roles: string[];
  active: boolean;
  terms: boolean;
};

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
    domains: {
      type: Number,
      required: true,
      default: 0,
    },
    wallet: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    referrerId: {
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

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const UserModel = model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
