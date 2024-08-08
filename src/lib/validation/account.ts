import * as z from "zod";

const requiredString = z.string().trim().min(1, "(Required)");
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/*
  Sign up schema
  email: requiredString.email("Invalid email address"),
  name: requiredString,
  password: requiredString.min(8, "Must be at least 8 characters"),
 */

export const infoSchema = z
  .object({
    firstName: requiredString
      .min(3, "(at least 2 characters)")
      .max(30, "(less than 30 characters)")
      .regex(/^[a-zA-Z]+$/, "(only contain letters)"),
    lastName: requiredString
      .min(3, "(at least 2 characters)")
      .max(30, "(less than 30 characters)")
      .regex(/^[a-zA-Z]+$/, "(only contain letters)"),
    username: requiredString,
    email: requiredString.email("(Invalid email address)"),
    phone: requiredString,
  })

  export type InfoSchema = z.infer<typeof infoSchema>;