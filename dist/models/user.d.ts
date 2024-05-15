/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Model } from "mongoose";
import { UserType } from "../config/schema.zod";
type UserDocument = Document & UserType["body"];
type Methods = {
    comparePassword: (password: string) => Promise<boolean>;
};
declare const _default: Model<UserDocument, {}, Methods, {}, Document<unknown, {}, UserDocument> & Omit<Document<any, any, any> & {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    wallet: string;
    referrerUsername: string;
    roles: string[];
    terms: boolean;
    active: boolean;
    referrerId?: string | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, "comparePassword"> & Methods, any>;
export default _default;
