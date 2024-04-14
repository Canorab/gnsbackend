import { Document, Model, Schema, model } from "mongoose";

type DomainDocument = Document & {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  value: string;
};

const domainSchema = new Schema<DomainDocument, {}>(
  {
    userId: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const DomainModel = model("Domain", domainSchema);
export default DomainModel as Model<DomainDocument, {}>;
