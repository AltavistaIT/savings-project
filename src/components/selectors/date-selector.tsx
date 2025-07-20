'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { LocalStorageService } from "@/services/local-storage-service";
import { useTableStore } from "@/hooks/store/table-store";
import { MONTH_NAMES } from "@/domain/constants";

interface MonthOption {
  name: string,
  value: number
}

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
    if (selectedMonth && selectedYear) {
      const monthYear = `${selectedYear}-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}`
      setMonthYear(monthYear)
    }
  }, [selectedMonth, selectedYear])

  const handlePrevMonth = () => {
    const prevMonth = selectedMonth && selectedMonth > 1 ? selectedMonth - 1 : 12
    setSelectedMonth(prevMonth)
    if (prevMonth === 12) setSelectedYear(selectedYear! - 1)
  }

  const handleNextMonth = () => {
    const nextMonth = selectedMonth && selectedMonth < 12 ? selectedMonth + 1 : 1
    setSelectedMonth(nextMonth)
    if (nextMonth === 1) setSelectedYear(selectedYear! + 1)
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon" onClick={handlePrevMonth}>
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
      <Button variant="outline" size="icon" onClick={handleNextMonth}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}