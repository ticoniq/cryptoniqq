import * as z from "zod";

const requiredString = z.string().trim().min(1, "(Required)");
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const infoSchema = z.object({
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
  country: requiredString,
  gender: requiredString,
  dob: z.date(),
});

export type InfoSchema = z.infer<typeof infoSchema>;

export const deleteAccountSchema = z.object({
  email: requiredString.email("Invalid email address"),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;

export const twoFactorSchema = z.object({
  code: z.string().refine((value) => /^\d{6}$/.test(value), {
    message:
      "Token must be six characters long and can only contain numbers 0-9.",
  }),
});

export type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

export const changePasswordSchema = z
  .object({
    code: z.string()
    .refine((value) => value === '' || /^\d{6}$/.test(value), {
      message: "Token must be six characters long and can only contain numbers 0-9.",
    })
    .optional(),
    password: requiredString,
    newPassword: requiredString
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Must contain at least one special character (@$!%*?&#)",
      ),
    confirmPassword: requiredString,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const updateEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type UpdateEmailSchema = z.infer<typeof updateEmailSchema>;
