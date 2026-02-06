import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Favorites() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Favorites</h1>
        <p className="text-muted-foreground">Your saved providers will appear here</p>
      </div>
    </DashboardLayout>
  );
}
