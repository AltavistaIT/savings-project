import { MONTH_NAMES } from "@/config/constants";
import { LocalStorageService } from "@/services/local-storage-service";
import { create } from "zustand";

interface MonthOption {
  name: string;
  value: number;
}

interface DateSelectorState {
  availableMonths: MonthOption[];
  availableYears: number[];
  selectedMonth: number;
  selectedYear: number;
  monthYear: string;

  // setters
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}

const config = LocalStorageService.getItem("config");
const storedMonth = LocalStorageService.getItem("selectedMonth");
const storedYear = LocalStorageService.getItem("selectedYear");

export const useDateSelectorStore = create<DateSelectorState>((set) => ({
  availableMonths:
    config?.month_years.months?.map((m) => ({
      name: MONTH_NAMES[m - 1],
      value: m,
    })) ?? [],
  availableYears: config?.month_years.years ?? [],
  selectedMonth: storedMonth || new Date().getMonth() + 1,
  selectedYear: storedYear || new Date().getFullYear(),
  monthYear: "",

  setSelectedMonth: (month) => {
    LocalStorageService.setItem("selectedMonth", month);
    set({ selectedMonth: month });
  },
  setSelectedYear: (year) => {
    LocalStorageService.setItem("selectedYear", year);
    set({ selectedYear: year });
  },
}));
