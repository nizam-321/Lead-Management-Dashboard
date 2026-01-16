"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCards from "@/components/StatsCards";
import LeadChart from "@/components/LeadChart";
import LeadTable from "@/components/LeadTable";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  if (loading) return null; // Page flash hone se rokne ke liye

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header with User Info & Logout */}
      <header className="bg-white border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Sales Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4" />
              <span>Admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <StatsCards />
        <LeadChart />
        <LeadTable />
      </div>
    </div>
  );
}