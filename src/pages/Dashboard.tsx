import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryCard } from "@/components/providers/CategoryCard";
import { ProviderGrid } from "@/components/providers/ProviderGrid";
import { SymptomSelector } from "@/components/symptoms/SymptomSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, mockProviders, providerTypeFilters } from "@/data/mockData";
import { MapPin, Calendar, MoreHorizontal } from "lucide-react";
import type { Provider } from "@/types";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("discovery");

  const filteredProviders = mockProviders.filter((provider) => {
    if (selectedFilter !== "all" && provider.type !== selectedFilter) {
      return false;
    }
    // Add category filtering logic here if needed
    return true;
  });

  return (
    <DashboardLayout>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-foreground">
              Find your specialist
            </h1>
            <p className="text-muted-foreground">
              Discover the best doctors and clinics near you.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="discovery">Provider Discovery</TabsTrigger>
              <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
            </TabsList>

            <TabsContent value="discovery" className="space-y-6">
              {/* Categories */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Categories
                  </h2>
                  <Button variant="link" className="text-primary">
                    See all
                  </Button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      name={category.name}
                      icon={category.icon}
                      isActive={selectedCategory === category.id}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )
                      }
                    />
                  ))}
                </div>
              </section>

              {/* Provider Filter & List */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Providers near you
                  </h2>
                  <Link to="/map">
                    <Button variant="ghost" className="text-primary">
                      <MapPin className="w-4 h-4 mr-1" />
                      Map View
                    </Button>
                  </Link>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {providerTypeFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`filter-chip ${
                        selectedFilter === filter.id ? "active" : ""
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <ProviderGrid
                  providers={filteredProviders}
                  onViewProfile={(id) => navigate(`/providers/${id}`)}
                  onBook={(id) => navigate(`/book-visit?providerId=${id}`)}
                />
              </section>
            </TabsContent>

            <TabsContent value="symptoms">
              <div className="space-y-3">
                <SymptomSelector />
                <Button onClick={() => navigate("/symptoms")}>Open Symptom Checker Page</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 p-6 border-l border-border space-y-6">
          {/* Map Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Near You</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-48 bg-accent rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">Map Preview</p>
                    <p className="text-xs">Abuja, Karu Site</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FCT Locations List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">FCT Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Garki</li>
                <li>Wuse</li>
                <li>Maitama</li>
                <li>Asokoro</li>
                <li>Gwarinpa</li>
                <li>Kubwa</li>
                <li>Nyanya</li>
                <li>Lugbe</li>
                <li>Jabi</li>
                <li>Utako</li>
                <li>Central Area</li>
              </ul>
            </CardContent>
          </Card>

          {/* Upcoming Appointment */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Upcoming Appointment</CardTitle>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border border-border bg-accent/30">
                <Badge variant="secondary" className="mb-3">
                  Consultation
                </Badge>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      LO
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">Dr. Linda Obi</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Tomorrow, 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button size="sm" className="flex-1">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: "Visited", provider: "City Pharmacy", time: "2 days ago" },
                { action: "Booked", provider: "Dr. Chen", time: "1 week ago" },
                { action: "Reviewed", provider: "Kids First", time: "2 weeks ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <span className="text-muted-foreground">{activity.action} </span>
                    <span className="font-medium text-foreground">
                      {activity.provider}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </DashboardLayout>
  );
}
