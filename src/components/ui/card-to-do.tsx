import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CardToDo({
  d,
  i,
  onDelete,
}: {
  d: any;
  i: number;
  onDelete: (index: number) => void;
}) {
  return (
    <Card className="w-fit h-fit relative shadow-md border rounded-xl">
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-100"
        onClick={() => onDelete(i)}
      >
        <Trash className="w-5 h-5" />
      </Button>

      <CardHeader className="text-center pt-0">
        <CardTitle className="text-lg font-semibold">{d.activity}</CardTitle>
        <CardDescription className="text-gray-500">
          RM {d.price.toFixed(2)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-sm">
        <p className="font-medium text-blue-600">{d.type}</p>
        <p
          className={`px-2 py-1 rounded-md text-sm ${
            d.required
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {d.required ? "Booking required" : "No booking required"}
        </p>
        <p className="text-gray-500">
          Accessibility: {d.accessibility.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
