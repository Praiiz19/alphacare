import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Building2,
  Pill,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Plus,
  MoreHorizontal,
} from "lucide-react";

const pendingProviders = [
  { id: 1, name: "Dr. Jane Smith", type: "Doctor", specialty: "Pediatrician", location: "Oakland, CA", date: "Jan 30, 2026" },
  { id: 2, name: "QuickCare Clinic", type: "Clinic", specialty: "Urgent Care", location: "San Jose, CA", date: "Jan 29, 2026" },
  { id: 3, name: "MedPharm Plus", type: "Pharmacy", specialty: "Retail Pharmacy", location: "Palo Alto, CA", date: "Jan 28, 2026" },
];

const symptoms = [
  { id: 1, name: "Headache", category: "Pain", drugCategories: 3 },
  { id: 2, name: "Fever", category: "General", drugCategories: 2 },
  { id: 3, name: "Cough", category: "Respiratory", drugCategories: 2 },
  { id: 4, name: "Nausea", category: "Digestive", drugCategories: 1 },
];

const drugCategories = [
  { id: 1, name: "Pain Relievers", symptomsCount: 5, description: "Over-the-counter analgesics" },
  { id: 2, name: "Antipyretics", symptomsCount: 3, description: "Fever-reducing medications" },
  { id: 3, name: "Cough Suppressants", symptomsCount: 2, description: "Helps control coughing" },
  { id: 4, name: "Antiemetics", symptomsCount: 2, description: "Helps control nausea" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("providers");

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage providers, symptoms, and drug categories
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-healthcare-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Total Providers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Pill className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Drug Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">48</p>
                  <p className="text-sm text-muted-foreground">Symptoms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="providers">Provider Approvals</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="drugs">Drug Categories</TabsTrigger>
          </TabsList>

          {/* Provider Approvals */}
          <TabsContent value="providers" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Provider Applications</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search providers..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{provider.type}</Badge>
                        </TableCell>
                        <TableCell>{provider.specialty}</TableCell>
                        <TableCell>{provider.location}</TableCell>
                        <TableCell>{provider.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="text-healthcare-green border-healthcare-green hover:bg-healthcare-green-light">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Symptoms */}
          <TabsContent value="symptoms" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Symptom Categories</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Symptom
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symptom</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Drug Categories</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {symptoms.map((symptom) => (
                      <TableRow key={symptom.id}>
                        <TableCell className="font-medium">{symptom.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{symptom.category}</Badge>
                        </TableCell>
                        <TableCell>{symptom.drugCategories} linked</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drug Categories */}
          <TabsContent value="drugs" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Drug Categories</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Linked Symptoms</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drugCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="text-muted-foreground">{category.description}</TableCell>
                        <TableCell>{category.symptomsCount} symptoms</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
