import DateSelector from "@/components/selectors/date-selector";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 w-11/12">
    <DateSelector />
    {children}
  </div>;
}