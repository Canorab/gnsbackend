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
import { domainCreateType } from "../config/schema.zod";
type DomainDocument = Document & domainCreateType["body"];
declare const _default: Model<DomainDocument, {}, {}, {}, Document<unknown, {}, DomainDocument> & Document<any, any, any> & {
    data: {
        name: string;
        image_url: string;
        description: string;
        identifier: string;
    };
    firstName: string;
    lastName: string;
    username: string;
    wallet: string;
    userId: import("bson").ObjectId;
    name: string;
    image_url: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default _default;
