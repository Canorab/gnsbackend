"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftListSchema = exports.nftSchema = exports.fetchDomainsSchema = exports.getUserDomainsSchema = exports.domainSchema = exports.getUserSchema = exports.userDeleteSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userRegSchema = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
exports.userRegSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string({ required_error: "First Name is  required !" })
            .trim()
            .min(2, { message: "Requires atleast 2 characters" }),
        lastName: zod_1.z
            .string({ required_error: "Last Name is  required !" })
            .trim()
            .min(2, { message: "Requires atleast 2 characters 1" }),
        username: zod_1.z
            .string({ required_error: "Username is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 3 characters" }),
        password: zod_1.z
            .string({ required_error: "Password is  required !" })
            .trim()
            .min(8, { message: "Requires at least 8 characters" }),
        email: zod_1.z
            .string({ required_error: "Email is  required !" })
            .email({ message: "Invalid email address" }),
        wallet: zod_1.z
            .string({ required_error: "Wallet Address is Required" })
            .trim()
            .min(10, { message: "Invalid Wallet Address" }),
        referrerId: zod_1.z
            .string({ required_error: "Referrer Id is Required" })
            .trim()
            .min(24, { message: "Requires atleast 24 characters" })
            .optional(),
        referrerUsername: zod_1.z
            .string({ required_error: "Referrer Username is Required" })
            .trim()
            .min(4, { message: "Referrer username is Required" }),
        roles: zod_1.z.array(zod_1.z.string()).default(["user"]),
        terms: zod_1.z
            .boolean({ required_error: "You must accept the terms" })
            .default(false),
        active: zod_1.z
            .boolean({ required_error: "User's active status must not be empty" })
            .default(true),
    }),
});
exports.userLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({ required_error: "Username is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 3 characters" }),
        password: zod_1.z
            .string({ required_error: "Password is  required !" })
            .trim()
            .min(8, { message: "Requires at least 8 characters" }),
    }),
});
exports.userUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "User Entity ID is  required !" })
            .trim()
            .min(24, { message: "Requires atleast 24 characters" })
            .optional(),
        username: zod_1.z
            .string({ required_error: "Username is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 4 characters" }),
        password: zod_1.z
            .string({ required_error: "Password is  required !" })
            .trim()
            .min(8, { message: "Requires at least 8 characters" })
            .optional(),
        active: zod_1.z
            .boolean({ required_error: "User's active status must not be empty" })
            .default(true),
    }),
});
exports.userDeleteSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "User Entity ID is  required !" })
            .trim()
            .min(24, { message: "Requires atleast 24 characters" }),
    }),
});
exports.getUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({ required_error: "User Entity ID is  required !" })
            .trim()
            .min(24, { message: "Requires atleast 24 characters" }),
    }),
    body: zod_1.z.object({
        wallet: zod_1.z
            .string({ required_error: "Wallet Address is Required" })
            .trim()
            .min(10, { message: "Invalid Wallet Address" }),
        username: zod_1.z
            .string({ required_error: "Username is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 3 characters" }),
    }),
});
const domainCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.instanceof(mongodb_1.ObjectId, {
            params: { required_error: "Entity ID is  required !" },
        }),
        firstName: zod_1.z
            .string({ required_error: "First Name is  required !" })
            .trim()
            .min(2, { message: "Requires atleast 2 characters" }),
        lastName: zod_1.z
            .string({ required_error: "Last Name is  required !" })
            .trim()
            .min(2, { message: "Requires atleast 2 characters 1" }),
        username: zod_1.z
            .string({ required_error: "Username is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 3 characters" }),
        name: zod_1.z
            .string({ required_error: "Domain value is  required !" })
            .trim()
            .min(4, { message: "Requires atleast 3 characters" }),
        image_url: zod_1.z.string({ required_error: "Domain image url expected !" }),
        wallet: zod_1.z
            .string({ required_error: "Wallet Address is Required" })
            .trim()
            .min(10, { message: "Invalid Wallet Address" }),
        data: zod_1.z.object({
            name: zod_1.z.string({ required_error: "Domain Name expected !" }),
            description: zod_1.z.string({
                required_error: "Domain description expected !",
            }),
            image_url: zod_1.z.string({ required_error: "Domain image url expected !" }),
            identifier: zod_1.z.string({
                required_error: "Domain identifier is expected !",
            }),
        }),
    }),
});
exports.domainSchema = zod_1.z.object({
    userId: zod_1.z.instanceof(mongodb_1.ObjectId, {
        params: { required_error: "Entity ID is  required !" },
    }),
    firstName: zod_1.z
        .string({ required_error: "First Name is  required !" })
        .trim()
        .min(2, { message: "Requires atleast 2 characters" }),
    lastName: zod_1.z
        .string({ required_error: "Last Name is  required !" })
        .trim()
        .min(2, { message: "Requires atleast 2 characters 1" }),
    username: zod_1.z
        .string({ required_error: "Username is  required !" })
        .trim()
        .min(4, { message: "Requires atleast 3 characters" }),
    name: zod_1.z
        .string({ required_error: "Domain value is  required !" })
        .trim()
        .min(4, { message: "Requires atleast 3 characters" }),
    image_url: zod_1.z.string({ required_error: "Domain image url expected !" }),
    wallet: zod_1.z
        .string({ required_error: "Wallet Address is Required" })
        .trim()
        .min(10, { message: "Invalid Wallet Address" }),
    data: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Domain Name expected !" }),
        description: zod_1.z.string({
            required_error: "Domain description expected !",
        }),
        image_url: zod_1.z.string({ required_error: "Domain image url expected !" }),
        identifier: zod_1.z.string({
            required_error: "Domain identifier is expected !",
        }),
    }),
});
exports.getUserDomainsSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.instanceof(mongodb_1.ObjectId, {
            params: { required_error: "Entity ID is  required !" },
        }),
        wallet: zod_1.z
            .string({ required_error: "Wallet Address is Required" })
            .trim()
            .min(10, { message: "Invalid Wallet Address" }),
    }),
});
exports.fetchDomainsSchema = zod_1.z.object({
    body: zod_1.z.object({
        wallet: zod_1.z
            .string({ required_error: "Wallet Address is Required" })
            .trim()
            .min(10, { message: "Invalid Wallet Address" }),
        slug: zod_1.z.string({ required_error: "Wallet Address is Required" }).trim(),
    }),
});
exports.nftSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Greeting text required !" })
        .trim()
        .min(1, { message: "Invalid Greeting text" }),
    identifier: zod_1.z.string({ required_error: "Identifier  is required !" }).trim(),
    collection: zod_1.z.string({ required_error: "Collection  is required !" }).trim(),
    contract: zod_1.z.string({ required_error: "Contract iis required !" }).trim(),
    token_standard: zod_1.z
        .string({ required_error: "Token Standard string required !" })
        .trim(),
    description: zod_1.z.string({ required_error: "Description is required !" }).trim(),
    image_url: zod_1.z.string({ required_error: "Image Url not found !" }).trim(),
    metadata_url: zod_1.z.string({ required_error: "Metadata Url not found !" }).trim(),
    opensea_url: zod_1.z.string({ required_error: "Opensea Url not found!" }).trim(),
    updated_at: zod_1.z.string(),
    is_disabled: zod_1.z.boolean().default(false),
    is_nsfw: zod_1.z.boolean().default(false),
});
exports.nftListSchema = zod_1.z.object({
    nfts: zod_1.z.array(zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Greeting text required !" })
            .trim()
            .min(1, { message: "Invalid Greeting text" }),
        identifier: zod_1.z
            .string({ required_error: "Identifier  is required !" })
            .trim(),
        collection: zod_1.z
            .string({ required_error: "Collection  is required !" })
            .trim(),
        contract: zod_1.z.string({ required_error: "Contract iis required !" }).trim(),
        token_standard: zod_1.z
            .string({ required_error: "Token Standard string required !" })
            .trim(),
        description: zod_1.z
            .string({ required_error: "Description is required !" })
            .trim(),
        image_url: zod_1.z.string({ required_error: "Image Url not found !" }).trim(),
        metadata_url: zod_1.z
            .string({ required_error: "Metadata Url not found !" })
            .trim(),
        opensea_url: zod_1.z
            .string({ required_error: "Opensea Url not found!" })
            .trim(),
        updated_at: zod_1.z.string(),
        is_disabled: zod_1.z.boolean().default(false),
        is_nsfw: zod_1.z.boolean().default(false),
    })),
});
