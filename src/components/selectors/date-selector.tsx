'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

export default function DateSelector() {
  const [month, setMonth] = useState("June")
  const [year, setYear] = useState("2023")

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = ["2021", "2022", "2023", "2024", "2025"]

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[160px] text-lg font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px] text-lg font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" size="icon">
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}