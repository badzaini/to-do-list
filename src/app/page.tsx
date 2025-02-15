"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import CardToDo from "@/components/ui/card-to-do";

const schema = z.object({
  activity: z.string().min(3, "Activity is required"),
  price: z.number(),
  type: z.string().min(1, "Type is required"),
  required: z.boolean(),
  accessibility: z.number(),
});

export default function Home() {
  const typeData = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];

  const [data, setData] = useState<any[]>([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: "",
      price: 0,
      type: "",
      required: false,
      accessibility: 0,
    },
  });

  const onSubmit = (formData: any) => {
    setData((prevData) => [...prevData, formData]);
    form.reset();
  };

  const deleteData = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold tracking-tight pb-6">
        To-Do-List
      </h1>
      <div className="flex gap-6">
        <Card className="p-6 w-[300px] h-fit">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Activity name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeData.map((d, i) => (
                          <SelectItem key={i} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Booking required</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accessibility"
                render={({ field }) => (
                  <FormItem className="block items-center space-y-3">
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </FormControl>
                    <FormDescription>
                      Accessibility is {field.value.toFixed(2)}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
        <div>
          <h3 className="text-xl tracking-tight pb-6">
            The total of to-do-list is <b>{data.length}</b>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((d, index) => (
              <CardToDo key={index} i={index} d={d} onDelete={deleteData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
