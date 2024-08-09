"use client";
import axios from 'axios';
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoSchema, infoSchema } from "@/lib/validation/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { useSession } from "../_component/SessionProvider";
import { getFirstName, getLastName } from "@/lib/utils";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { CountrySelector } from "@/components/CountrySelector";
import { useToast } from "@/components/ui/use-toast";

export default function Information() {
  const { user } = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const firstname = getFirstName(user.name);
  const lastname = getLastName(user.name);

  const form = useForm<InfoSchema>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: firstname,
      lastName: lastname,
      username: user.username || "",
      email: user.email,
      phone: user.phone || "",
      country: user.country || "",
      gender: user.gender || "",
      dob: user.dob ? new Date(user.dob) : undefined,
    },
  });

  async function onSubmit(values: InfoSchema) {
    startTransition(async () => {
      try {
        const formattedValues = {
          ...values,
          dob: values.dob ? values.dob.toISOString() : null,
        };
  
        const response = await axios.put('/api/user/account/general', formattedValues, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        });
  
        toast({
          description: response.data.message || 'User information updated successfully',
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast({
            variant: "destructive",
            description: err.response.data.message || 'Failed to update user information',
          });
        } else {
          toast({
            variant: "destructive",
            description: "An unexpected error occurred. Please try again later",
          });
        }
      }
    });
  }

  function handleNumberVerification(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    console.log("verify");
  }


  return (
    <div>
      <h3 className="text-clamp-sm font-medium">Account Information</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 my-5 font-DMSans"
        >
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Legal first name</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Legal first name*"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Legal last name</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Legal last name*"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Email</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="email@example.com"
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Username</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Username"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Phone*</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <div className="flex justify-between items-center gap-x-3">
                      <PhoneInput
                        {...field}
                        international
                        readOnly
                        className="w-full"
                      />
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="rounded-lg h-10"
                        onClick={handleNumberVerification}
                      >
                        verify
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Country</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <CountrySelector
                      name={"country"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onValueChange={field.onChange}
                    >
                      <span className="flex justify-start items-center gap-x-2">
                        <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Gender</FormLabel>
                        <FormMessage />
                      </span>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <span className="flex justify-start items-center gap-x-2">
                    <FormLabel className="text-brand-secondary dark:text-brand-secondary2">Date of Birth</FormLabel>
                    <FormMessage />
                  </span>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(isNaN(date.getTime()) ? undefined : date);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            loading={isPending}
            size={"sm"}
            className="w-full md:w-fit"
          >
            Update Info
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}