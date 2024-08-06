import * as z from "zod";

const requiredString = z.string().trim().min(1, "(Required)");
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/*
  Sign up schema
  email: requiredString.email("Invalid email address"),
  name: requiredString,
  password: requiredString.min(8, "Must be at least 8 characters"),
 */
export const signUpSchema = z
  .object({
    email: z.string().trim().min(1, "(Required)").email("(Invalid email address)"),
    name: requiredString
      .min(2, "(Full name must be at least 2 characters)")
      .max(30, "(Full name must not exceed 50 characters)")
      .regex(
        /^[a-zA-Z\s'\-]+$/,
        "(Full name can only contain letters, spaces, apostrophes, and hyphens)",
      ),
    phone: requiredString,
    password: requiredString
    .min(8, "(8 or more characters, including numbers and special characters)")
    .regex(
      passwordRegex,
      "(8 or more characters, including numbers and special characters)"
    ),
  confirmPassword: requiredString,
})
.refine((data) => data.password === data.confirmPassword, {
  message: "(Passwords don't match)",
  path: ["confirmPassword"],
});

export type SignUpValues = z.infer<typeof signUpSchema>;
