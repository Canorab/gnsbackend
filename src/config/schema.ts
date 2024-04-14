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
    // Domains: z.number().positive(),
    // Wallet: z
    //   .string({ required_error: "Wallet Address is Required" })
    //   .trim()
    //   .min(10, { message: "Invalid Wallet Address" }),
    // referrerId: z.string({ required_error: "Referrer Id is Required" }).trim().min(10),
    // referrerUsername: z
    //   .string({ required_error: "Referrer Username is Required" })
    //   .trim()
    //   .min(4, { message: "Referrer username is Required" }),
    terms: z.boolean({ required_error: "You must accept the terms" }).default(false),
  }),
  // _id: z.string(),s
  // firstName: z.string().trim().min(2, { message: "Requires atleast 2 characters" }),
  // lastName: z.string().trim().min(2, { message: "Requires atleast 2 characters 1" }),
  // username: z.string().trim().min(4, { message: "Requires atleast 3 characters" }),
  // password: z.string().trim().min(8, { message: "Requires at least 8 characters" }),
  // // ConfirmPassword: z.string().min(8, {message: 'Requires at least 8 characters'}),
  // email: z.string().email({ message: "Invalid email addreess" }),
  // Domains: z.number().positive(),
  // Wallet: z.string().trim().min(10, { message: "Wallet Address is Required" }),
  // referrerId: z.string().trim().min(10),
  // referrerUsername: z.string().trim().min(4, { message: "Referrer username is Required" }),
  // // timestamp: z.date(), // Timestamp should be auto set by Mongoose in the nodejs app
  // terms: z.boolean(),
});

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
  }),
});

const userUpdateSchema = {};
