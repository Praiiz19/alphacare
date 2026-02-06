import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockProviders } from "@/data/mockData";
import { ProviderGrid } from "@/components/providers/ProviderGrid";
import { Button } from "@/components/ui/button";

import type { Provider } from "@/types";

const slugToFilter = (slug: string) => {
  const s = slug.toLowerCase();
  return (p: Provider) => {
    if (s === "pharmacy") return p.type === "pharmacy";
    if (s === "dentist") return p.specialty?.toLowerCase().includes("dent");
    if (s === "cardio") return p.specialty?.toLowerCase().includes("cardio");
    if (s === "vision") return p.specialty?.toLowerCase().includes("oph") || p.specialty?.toLowerCase().includes("vision");
    if (s === "neurology") return p.specialty?.toLowerCase().includes("neuro");
    if (s === "ortho") return p.specialty?.toLowerCase().includes("ortho");
    if (s === "pediatric") return p.specialty?.toLowerCase().includes("pedi");
    if (s === "general") return p.type !== "pharmacy";
    return true;
  };
};

export default function CategoryPage() {
  const { slug = "" } = useParams();
  const providers = mockProviders.filter(slugToFilter(slug));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{slug} specialists</h1>
          <Link to="/book-appointment">
            <Button>Book Appointment</Button>
          </Link>
        </div>
        <ProviderGrid
          providers={providers}
          onViewProfile={(id) => (window.location.href = `/providers/${id}`)}
          onBook={(id) => (window.location.href = `/book-visit?providerId=${id}`)}
        />
      </div>
    </DashboardLayout>
  );
}
