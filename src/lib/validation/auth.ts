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

export const signUpSchema = z
  .object({
    firstName: requiredString
      .min(3, "(at least 2 characters)")
      .max(30, "(less than 30 characters)")
      .regex(
        /^[a-zA-Z]+$/,
        "(only contain letters)",
      ),
    lastName: requiredString
      .min(3, "(at least 2 characters)")
      .max(30, "(less than 30 characters)")
      .regex(
        /^[a-zA-Z]+$/,
       "(only contain letters)",
      ),
    email: z
      .string()
      .trim()
      .min(1, "(Required)")
      .email("(Invalid email address)"),
    phone: requiredString,
    password: requiredString
      .min(
        6,
        "(8 or more characters, including numbers and special characters)",
      )
      .regex(
        passwordRegex,
        "(6 or more characters, including numbers and special characters)",
      ),
    confirmPassword: requiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "(Passwords don't match)",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

/*
  Login schema
  username: requiredString,
  password: requiredString,
 */
  export const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "(Required)")
      .email("(Invalid email address)"),
    password: requiredString,
  });
  
  export type LoginValues = z.infer<typeof loginSchema>;
