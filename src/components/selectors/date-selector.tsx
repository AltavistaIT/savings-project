'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";
import { useTableStore } from "@/features/tables/stores/table-store";
import { useDateSelectorStore } from "@/stores/date-selector-store";

export default function DateSelector() {
  const {
    selectedMonth,
    selectedYear,
    availableMonths,
    availableYears,
    setSelectedMonth,
    setSelectedYear,
  } = useDateSelectorStore();

  const { setTableMonthYear } = useTableStore();

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const monthYear = `${selectedYear}-${selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}`;
      setTableMonthYear(monthYear);
    }
  }, [selectedMonth, selectedYear, setTableMonthYear]);

  const handlePrevMonth = () => {
    const prevMonth = selectedMonth > 1 ? selectedMonth - 1 : 12;
    setSelectedMonth(prevMonth);
    if (prevMonth === 12) setSelectedYear(selectedYear - 1);
  };

  const handleNextMonth = () => {
    const nextMonth = selectedMonth < 12 ? selectedMonth + 1 : 1;
    setSelectedMonth(nextMonth);
    if (nextMonth === 1) setSelectedYear(selectedYear + 1);
  };

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
            {availableMonths.map((month, index) => (
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
            {availableYears.map((y) => (
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
  );
}
