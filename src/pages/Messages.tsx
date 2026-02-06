import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Messages() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Coming soon - Message your healthcare providers</p>
      </div>
    </DashboardLayout>
  );
}
