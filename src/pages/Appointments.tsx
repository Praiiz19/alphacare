import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Video, User } from "lucide-react";

const appointments = [
  {
    id: 1,
    provider: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    date: "Feb 3, 2026",
    time: "10:00 AM",
    type: "In-Person",
    status: "confirmed",
    location: "Downtown Medical Center",
  },
  {
    id: 2,
    provider: "Dr. Raj Patel",
    specialty: "Dermatologist",
    date: "Feb 5, 2026",
    time: "2:30 PM",
    type: "Video",
    status: "pending",
    location: "Virtual",
  },
  {
    id: 3,
    provider: "City Pharmacy Plus",
    specialty: "Pharmacy",
    date: "Feb 1, 2026",
    time: "9:00 AM",
    type: "Pickup",
    status: "completed",
    location: "Main Street",
  },
];

export default function Appointments() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your healthcare appointments
            </p>
          </div>
          <a href="/book-appointment">
            <Button>Book New Appointment</Button>
          </a>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {appointments
              .filter((a) => a.status !== "completed")
              .map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                          {apt.type === "Video" ? (
                            <Video className="w-6 h-6 text-primary" />
                          ) : (
                            <User className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {apt.provider}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {apt.specialty}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {apt.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            apt.status === "confirmed" ? "default" : "secondary"
                          }
                        >
                          {apt.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">
                          {apt.type === "Video" ? "Join Call" : "Details"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-4">
            {appointments
              .filter((a) => a.status === "completed")
              .map((apt) => (
                <Card key={apt.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {apt.provider}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {apt.specialty}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {apt.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No cancelled appointments</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
