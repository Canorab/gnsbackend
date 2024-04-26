import { ObjectId } from "mongodb";
import { z } from "zod";

export const userRegSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "First Name is  required !" })
      .trim()
      .min(2, { message: "Requires atleast 2 characters" }),
    lastName: z
      .string({ required_error: "Last Name is  required !" })
      .trim()
      .min(2, { message: "Requires atleast 2 characters 1" }),
    username: z
      .string({ required_error: "Username is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 3 characters" }),
    password: z
      .string({ required_error: "Password is  required !" })
      .trim()
      .min(8, { message: "Requires at least 8 characters" }),
    email: z
      .string({ required_error: "Email is  required !" })
      .email({ message: "Invalid email address" }),
    domainsCount: z
      .number({ invalid_type_error: " Invalid value for Domains" })
      // .positive()
      .default(0),
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),
    // referrerId: z.instanceof(ObjectId, {
    //   params: { required_error: "Entity ID is  required !" },
    // }),
    referrerId: z
      .string({ required_error: "Referrer Id is Required" })
      .trim()
      .min(24, { message: "Requires atleast 24 characters" }),
    referrerUsername: z
      .string({ required_error: "Referrer Username is Required" })
      .trim()
      .min(4, { message: "Referrer username is Required" }),
    roles: z.array(z.string()).default(["user"]),
    terms: z
      .boolean({ required_error: "You must accept the terms" })
      .default(false),
    active: z
      .boolean({ required_error: "User's active status must not be empty" })
      .default(true),
  }),
});

export type UserType = z.infer<typeof userRegSchema>;

export const userLoginSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "Username is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 3 characters" }),
    password: z
      .string({ required_error: "Password is  required !" })
      .trim()
      .min(8, { message: "Requires at least 8 characters" }),
    // terms: z
    //   .boolean({ required_error: "You must accept the terms" })
    //   .default(false),
  }),
});

export type LoginType = z.infer<typeof userLoginSchema>;

export const userUpdateSchema = z.object({
  body: z.object({
    // id: z.instanceof(ObjectId, {
    //   params: { required_error: "Entity ID is  required !" },
    // }),
    id: z
      .string({ required_error: "User Entity ID is  required !" })
      .trim()
      .min(24, { message: "Requires atleast 24 characters" })
      .optional(),

    username: z
      .string({ required_error: "Username is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 4 characters" }),

    domainsCount: z
      .number({ invalid_type_error: " Invalid value for Domains" })
      .min(0)
      .optional(),

    password: z
      .string({ required_error: "Password is  required !" })
      .trim()
      .min(8, { message: "Requires at least 8 characters" })
      .optional(),

    active: z
      .boolean({ required_error: "User's active status must not be empty" })
      .default(true),
  }),
});

export type UserUpdateType = z.infer<typeof userUpdateSchema>;

export const userDeleteSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "User Entity ID is  required !" })
      .trim()
      .min(24, { message: "Requires atleast 24 characters" }),
  }),
});

export type UserDeleteType = z.infer<typeof userDeleteSchema>;

export const getUserSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "User Entity ID is  required !" })
      .trim()
      .min(24, { message: "Requires atleast 24 characters" }),
  }),
  body: z.object({
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),
  }),
});

export type GetUserType = z.infer<typeof getUserSchema>;

// Immutable Entity - should never be updated
const domainCreateSchema = z.object({
  body: z.object({
    // userId: z
    //   .string({ required_error: "User Entity ID is  required !" })
    //   .trim()
    //   .min(24, { message: "Requires atleast 24 characters" }),
    userId: z.instanceof(ObjectId, {
      params: { required_error: "Entity ID is  required !" },
    }),

    firstName: z
      .string({ required_error: "First Name is  required !" })
      .trim()
      .min(2, { message: "Requires atleast 2 characters" }),
    lastName: z
      .string({ required_error: "Last Name is  required !" })
      .trim()
      .min(2, { message: "Requires atleast 2 characters 1" }),
    username: z
      .string({ required_error: "Username is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 3 characters" }),
    name: z
      .string({ required_error: "Domain value is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 3 characters" }),
    image_url: z.string({ required_error: "Domain image url expected !" }),
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),
    data: z.object({
      name: z.string({ required_error: "Domain Name expected !" }),
      description: z.string({
        required_error: "Domain description expected !",
      }),
      image_url: z.string({ required_error: "Domain image url expected !" }),
      identifier: z.string({
        required_error: "Domain identifier is expected !",
      }),
    }),
    // .optional(),
  }),
});

export type domainCreateType = z.infer<typeof domainCreateSchema>;

export const domainSchema = z.object({
  userId: z.instanceof(ObjectId, {
    params: { required_error: "Entity ID is  required !" },
  }),

  firstName: z
    .string({ required_error: "First Name is  required !" })
    .trim()
    .min(2, { message: "Requires atleast 2 characters" }),
  lastName: z
    .string({ required_error: "Last Name is  required !" })
    .trim()
    .min(2, { message: "Requires atleast 2 characters 1" }),
  username: z
    .string({ required_error: "Username is  required !" })
    .trim()
    .min(4, { message: "Requires atleast 3 characters" }),
  name: z
    .string({ required_error: "Domain value is  required !" })
    .trim()
    .min(4, { message: "Requires atleast 3 characters" }),
  image_url: z.string({ required_error: "Domain image url expected !" }),
  wallet: z
    .string({ required_error: "Wallet Address is Required" })
    .trim()
    .min(10, { message: "Invalid Wallet Address" }),
  data: z.object({
    name: z.string({ required_error: "Domain Name expected !" }),
    description: z.string({
      required_error: "Domain description expected !",
    }),
    image_url: z.string({ required_error: "Domain image url expected !" }),
    identifier: z.string({
      required_error: "Domain identifier is expected !",
    }),
  }),
  // .optional(),
});

export type domainSchemaType = z.infer<typeof domainSchema>;

export const getUserDomainsSchema = z.object({
  body: z.object({
    // id: z
    //   .string({ required_error: "User Entity ID is  required !" })
    //   .trim()
    //   .min(24, { message: "Requires atleast 24 characters" }),
    userId: z.instanceof(ObjectId, {
      params: { required_error: "Entity ID is  required !" },
    }),
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),
  }),
});

export type GetUserDomainsType = z.infer<typeof getUserDomainsSchema>;

export const fetchDomainsSchema = z.object({
  body: z.object({
    // id: z
    //   .string({ required_error: "User Entity ID is  required !" })
    //   .trim()
    //   .min(24, { message: "Requires atleast 24 characters" }),
    // userId: z.instanceof(ObjectId, {
    //   params: { required_error: "Entity ID is  required !" },
    // }),
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),

    slug: z.string({ required_error: "Wallet Address is Required" }).trim(), //.regex(),

    // contract: z
    //   .string({ required_error: "Contract Address is Required" })
    //   .trim()
    //   .min(10, { message: "Invalid Contract Address" })
    //   .optional(),

    // rpcKey: z
    //   .string({ required_error: "Rpc key is Required" })
    //   .trim()
    //   .min(10, { message: "Invalid Rpc key" }),

    // apiKey: z
    //   .string({ required_error: "Opensea key is Required" })
    //   .trim()
    //   .min(10, { message: "Invalid Opensea key" }),
  }),
});

export type fetchDomainsSchemaType = z.infer<typeof fetchDomainsSchema>;

export const nftSchema = z.object({
  name: z
    .string({ required_error: "Greeting text required !" })
    .trim()
    .min(1, { message: "Invalid Greeting text" }),

  identifier: z.string({ required_error: "Identifier  is required !" }).trim(),
  collection: z.string({ required_error: "Collection  is required !" }).trim(),
  contract: z.string({ required_error: "Contract iis required !" }).trim(),
  token_standard: z
    .string({ required_error: "Token Standard string required !" })
    .trim(),
  description: z.string({ required_error: "Description is required !" }).trim(),
  image_url: z.string({ required_error: "Image Url not found !" }).trim(),
  metadata_url: z.string({ required_error: "Metadata Url not found !" }).trim(),
  opensea_url: z.string({ required_error: "Opensea Url not found!" }).trim(),
  updated_at: z.string(),
  is_disabled: z.boolean().default(false),
  is_nsfw: z.boolean().default(false),
});

export type nftSchemaType = z.infer<typeof nftSchema>;

export const nftListSchema = z.object({
  nfts: z.array(
    z.object({
      name: z
        .string({ required_error: "Greeting text required !" })
        .trim()
        .min(1, { message: "Invalid Greeting text" }),

      identifier: z
        .string({ required_error: "Identifier  is required !" })
        .trim(),
      collection: z
        .string({ required_error: "Collection  is required !" })
        .trim(),
      contract: z.string({ required_error: "Contract iis required !" }).trim(),
      token_standard: z
        .string({ required_error: "Token Standard string required !" })
        .trim(),
      description: z
        .string({ required_error: "Description is required !" })
        .trim(),
      image_url: z.string({ required_error: "Image Url not found !" }).trim(),
      metadata_url: z
        .string({ required_error: "Metadata Url not found !" })
        .trim(),
      opensea_url: z
        .string({ required_error: "Opensea Url not found!" })
        .trim(),
      updated_at: z.string(),
      is_disabled: z.boolean().default(false),
      is_nsfw: z.boolean().default(false),
    })
  ),
});

export type nftListSchemaType = z.infer<typeof nftListSchema>;
