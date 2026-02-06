import { useLocation, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockProviders, categories } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProviderGrid } from "@/components/providers/ProviderGrid";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchResults() {
  const q = useQuery().get("q")?.toLowerCase() ?? "";
  const matchedProviders = mockProviders.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.specialty ?? "").toLowerCase().includes(q) ||
      (p.location ?? "").toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
  );
  const matchedCategories = categories.filter((c) => c.name.toLowerCase().includes(q));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Search results for "{q}"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matchedCategories.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {matchedCategories.map((c) => (
                  <Link key={c.id} to={`/category/${c.name.toLowerCase()}`} className="underline text-primary">
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
            <ProviderGrid
              providers={matchedProviders}
              onViewProfile={(id) => (window.location.href = `/providers/${id}`)}
              onBook={(id) => (window.location.href = `/book-visit?providerId=${id}`)}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
