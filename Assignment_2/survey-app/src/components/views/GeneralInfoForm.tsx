import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const generalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  age: z.string().min(1, "Age is required"),
  profession: z.string().min(1, "Profession/position is required"),
  codingFrequency: z.string().min(1, "This field is required"),
});

type GeneralInfo = z.infer<typeof generalInfoSchema>;

interface GeneralInfoFormProps {
  onSubmit: (data: GeneralInfo) => void;
}

const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ onSubmit }) => {
  const form = useForm<GeneralInfo>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: "",
      profession: "",
      codingFrequency: "",
    },
  });

  const handleSubmit = (data: GeneralInfo) => {
    onSubmit(data);
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
                    <SelectItem value="55-64">55 to 64</SelectItem>
                    <SelectItem value="65+">65 or over</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="profession"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Profession/Position</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession/position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Employed (Full-Time)">
                      Employed (Full-Time)
                    </SelectItem>
                    <SelectItem value="Employed (Part-Time)">
                      Employed (Part-Time)
                    </SelectItem>
                    <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                    <SelectItem value="Unemployed">Unemployed</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                    <SelectItem value="Homemaker">Homemaker</SelectItem>
                    <SelectItem value="Freelancer/Consultant">
                      Freelancer/Consultant
                    </SelectItem>
                    <SelectItem value="Intern/Trainee">
                      Intern/Trainee
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    <SelectItem value="Never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};

export default GeneralInfoForm;
