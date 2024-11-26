import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GeneralInfo } from "@/types"; // Import the shared type
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

const generalInfoSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    age: z.string().min(1, "Age is required"),
    hasCodingExperience: z.string().min(1, "This field is required"),
    codingFrequency: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasCodingExperience === "Yes" && !data.codingFrequency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Coding frequency is required if you have coding experience.",
        path: ["codingFrequency"],
      });
    }
  });

type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;

interface GeneralInfoFormProps {
  onSubmit: (data: GeneralInfo) => void;
}

const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ onSubmit }) => {
  const [hasExperience, setHasExperience] = useState<string>("");

  const form = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: "",
      hasCodingExperience: "",
      codingFrequency: "",
    },
  });

  const handleSubmit = (data: GeneralInfoFormData) => {
    const finalData: GeneralInfo = {
      ...data,
      codingFrequency:
        data.hasCodingExperience === "No"
          ? "None"
          : data.codingFrequency || "None",
    };
    onSubmit(finalData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="surname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="age"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Range</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<18">Under 18</SelectItem>
                    <SelectItem value="18-24">18 to 24</SelectItem>
                    <SelectItem value="25-34">25 to 34</SelectItem>
                    <SelectItem value="35-44">35 to 44</SelectItem>
                    <SelectItem value="45-54">45 to 54</SelectItem>
                    <SelectItem value="55+">55 or over</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="hasCodingExperience"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do You Have Experience Writing Code?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setHasExperience(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {hasExperience === "Yes" && (
          <FormField
            name="codingFrequency"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How Often Do You Write Code?</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};

export default GeneralInfoForm;
