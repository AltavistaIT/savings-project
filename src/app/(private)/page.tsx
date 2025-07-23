"use client"
import { useConfigStore } from "@/hooks/store/config-store";
import { ReportsMainPage } from "@/views/reports";
import { useEffect } from "react";

const MainDashboard = () => {
  const { fetchConfig } = useConfigStore()

  useEffect(() => {
    fetchConfig()
  }, [])

  return (
    <ReportsMainPage />
  );
}

export default MainDashboard