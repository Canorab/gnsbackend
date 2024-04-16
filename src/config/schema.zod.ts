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
    domains: z.number().positive(),
    wallet: z
      .string({ required_error: "Wallet Address is Required" })
      .trim()
      .min(10, { message: "Invalid Wallet Address" }),
    // referrerId: z.string({ required_error: "Referrer Id is Required" }).trim().min(10),
    referrerUsername: z
      .string({ required_error: "Referrer Username is Required" })
      .trim()
      .min(4, { message: "Referrer username is Required" }),
    terms: z
      .boolean({ required_error: "You must accept the terms" })
      .default(false),
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
      .min(24, { message: "Requires atleast 24 characters" }),

    username: z
      .string({ required_error: "Username is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 4 characters" }),

    domains: z
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
});

export type GetUserType = z.infer<typeof getUserSchema>;

// Immutable Entity - should never be updated
const domainCreateSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "User Entity ID is  required !" })
      .trim()
      .min(24, { message: "Requires atleast 24 characters" }),
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
    value: z
      .string({ required_error: "Domain value is  required !" })
      .trim()
      .min(4, { message: "Requires atleast 3 characters" }),
    data: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        uri: z.string(),
      })
    ),
    // userId: z.instanceof(ObjectId),
  }),
});

export type domainCreateType = z.infer<typeof domainCreateSchema>;
