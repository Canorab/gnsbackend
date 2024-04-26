import { Document, Model, Schema, model } from "mongoose";

import { domainCreateType } from "@/config/schema.zod";

// type DomainDocument = Document & {
//   userId: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   value: string;
// };
type DomainDocument = Document & domainCreateType["body"];

const domainSchema = new Schema<DomainDocument, {}>(
  {
    userId: {
      // type: String,
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    wallet: {
      type: String,
      trim: true,
      required: true,
    },
    data: {
      type: Object,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// domainSchema.pre("find", (next) => {});

const DomainModel = model("Domain", domainSchema);
export default DomainModel as Model<DomainDocument, {}>;
