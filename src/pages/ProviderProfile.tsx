import { useParams, Link } from "react-router-dom";
import { mockProviders } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ProviderProfile() {
  const { id } = useParams();
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <p className="text-muted-foreground">Provider not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{provider.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {provider.specialty} • {provider.location}
            </p>
            {provider.about && <p>{provider.about}</p>}
            <div className="flex gap-2">
              <Link to={`/book-visit?providerId=${provider.id}`}>
                <Button>Book Visit</Button>
              </Link>
              <Link to={`/book-appointment?providerId=${provider.id}`}>
                <Button variant="outline">Book Appointment</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
