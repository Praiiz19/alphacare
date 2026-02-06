import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BookAppointment() {
  const [params] = useSearchParams();
  const providerId = params.get("providerId");

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Book an Appointment {providerId ? `(Provider ${providerId})` : ""}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Specialty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardiology</SelectItem>
                    <SelectItem value="derm">Dermatology</SelectItem>
                    <SelectItem value="peds">Pediatrics</SelectItem>
                    <SelectItem value="ortho">Orthopedics</SelectItem>
                    <SelectItem value="dental">Dental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" />
              </div>
              <div className="md:col-span-2">
                <Label>Notes</Label>
                <Input placeholder="Provide any additional details" />
              </div>
            </div>
            <Button className="mt-2">Confirm Appointment</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
