import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookVisit() {
  const [params] = useSearchParams();
  const providerId = params.get("providerId");

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Book a Visit {providerId ? `(Provider ${providerId})` : ""}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" />
              </div>
              <div className="md:col-span-2">
                <Label>Reason for visit</Label>
                <Input placeholder="Describe your symptoms or reason" />
              </div>
            </div>
            <Button className="mt-2">Confirm Visit</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
