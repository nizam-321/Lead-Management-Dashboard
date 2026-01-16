import LeadTable from "@/components/LeadTable";
import StatsCards from "@/components/StatsCards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage and track your sales leads efficiently.
          </p>
        </div>
        <StatsCards />
        <LeadTable />
      </div>
    </div>
  );
}