"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChangePasswordSchema, changePasswordSchema } from "@/lib/validation/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/app/SessionProvider";
import { changePassword } from "../actions";


export default function ChangePassword() {
  const { user } = useSession();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
      code: "",
    },
  });

  async function onSubmit(values: ChangePasswordSchema) {
    startTransition(() => {
      startTransition(async () => {
        let changePasswordValues = values;

        if (!user.twoFactorEnabled) {
          const { code, ...rest } = values;
          changePasswordValues = rest;
        }

        const { error, success } = await changePassword(changePasswordValues as any);

        if (success) {
          toast({
            description: success,
          });
        }
        if (error) {
          toast({
            variant: "destructive",
            description: error,
          });
        }
      });
    });
  }

  return (
    <section className="font-DMSans">
      <Separator className="my-10" />
      <h3 className="text-clamp-sm font-medium mb-2">Change Password</h3>
      <p className="text-brand-secondary dark:text-brand-secondary font-medium">
        Update your password to keep your account secure
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 my-5"
        >
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Current password*</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="*******"
                      {...field}
                      className={`${form.formState.errors[field.name] ? 'border-brand-critical' : ''
                        }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user.twoFactorEnabled && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">2FA code*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        maxLength={6}
                        {...field}
                        className={`${form.formState.errors[field.name] ? 'border-brand-critical' : ''
                          }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2">New password*</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="*******"
                      {...field}
                      className={`${form.formState.errors[field.name] ? 'border-brand-critical' : ''
                        }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Confirm password*</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="*******"
                      {...field}
                      className={`${form.formState.errors[field.name] ? 'border-brand-critical' : ''
                        }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton
            loading={isPending}
            size={"sm"}
            className="w-full md:w-fit"
          >
            Change Password
          </LoadingButton>
        </form>
      </Form>
    </section>
  )
}