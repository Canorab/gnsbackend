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
    value: {
      type: String,
      trim: true,
      required: true,
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

const DomainModel = model("Domain", domainSchema);
export default DomainModel as Model<DomainDocument, {}>;
