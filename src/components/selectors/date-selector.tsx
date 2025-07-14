'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { LocalStorageService } from "@/services/local-storage-service";
import { useTableStore } from "@/hooks/store/table-store";

interface MonthOption {
  name: string,
  value: number
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export default function DateSelector() {
  const [months, setMonths] = useState<MonthOption[]>([])
  const [years, setYears] = useState<number[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>()
  const [selectedYear, setSelectedYear] = useState<number>()

  const { setMonthYear } = useTableStore()

  useEffect(() => {
    const config = LocalStorageService.getItem("config")
    console.log({ config })
    if (!config || !config.month_years) {
      return
    }
    const { months, years } = config.month_years

    if (!months || !years) {
      console.log('no')
      return
    }

    const parsedMonths: MonthOption[] = months.map((month) => ({
      name: MONTH_NAMES[month - 1],
      value: month
    }))
    setMonths(parsedMonths)
    setYears(years)

    if (parsedMonths.length) setSelectedMonth(parsedMonths[0].value)
    if (years.length) setSelectedYear(years[0])
    console.log({ parsedMonths, years })
  }, [])

  useEffect(() => {
    console.log({ selectedMonth, selectedYear })
    if (selectedMonth && selectedYear) {
      const monthYear = `${selectedYear}-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}`
      setMonthYear(monthYear)
    }
  }, [selectedMonth, selectedYear])

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <Select value={String(selectedMonth)} onValueChange={(val) => setSelectedMonth(Number(val))}>
          <SelectTrigger className="w-[160px] text-lg font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={String(month.value)}>
                {month.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(selectedYear)} onValueChange={(val) => setSelectedYear(Number(val))}>
          <SelectTrigger className="w-[120px] text-lg font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
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