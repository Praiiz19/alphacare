import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Building2, User, Pill, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProviderType = "doctor" | "clinic" | "pharmacy";

const providerTypes = [
  {
    id: "doctor" as ProviderType,
    icon: User,
    title: "Doctor",
    description: "Individual healthcare practitioner",
  },
  {
    id: "clinic" as ProviderType,
    icon: Building2,
    title: "Clinic",
    description: "Healthcare facility with multiple services",
  },
  {
    id: "pharmacy" as ProviderType,
    icon: Pill,
    title: "Pharmacy",
    description: "Medication dispensary",
  },
];

export default function ProviderRegister() {
  const [step, setStep] = useState(1);
  const [providerType, setProviderType] = useState<ProviderType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    location: "",
    address: "",
    services: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP, show success and redirect
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-healthcare flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">MediFind</span>
          </Link>

          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Provider Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Join MediFind as a Provider
              </h1>
              <p className="text-muted-foreground">
                Select your provider type to get started
              </p>
            </div>

            <div className="grid gap-4">
              {providerTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    providerType === type.id
                      ? "border-primary bg-accent"
                      : "border-border"
                  }`}
                  onClick={() => setProviderType(type.id)}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        providerType === type.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-primary"
                      }`}
                    >
                      <type.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {type.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        providerType === type.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {providerType === type.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!providerType}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* Step 2: Provider Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Provider Details
              </h1>
              <p className="text-muted-foreground">
                Tell us about your practice
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {providerType === "doctor" ? "Full Name" : "Business Name"}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={
                      providerType === "doctor"
                        ? "Dr. John Smith"
                        : "HealthCare Clinic"
                    }
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {providerType === "doctor" && (
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          General Practitioner
                        </SelectItem>
                        <SelectItem value="cardio">Cardiologist</SelectItem>
                        <SelectItem value="derma">Dermatologist</SelectItem>
                        <SelectItem value="ortho">Orthopedist</SelectItem>
                        <SelectItem value="pediatric">Pediatrician</SelectItem>
                        <SelectItem value="neuro">Neurologist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(providerType === "clinic" || providerType === "pharmacy") && (
                  <div className="space-y-2">
                    <Label htmlFor="services">Services Offered</Label>
                    <Input
                      id="services"
                      name="services"
                      placeholder="e.g., General Care, Vaccinations"
                      value={formData.services}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">City / Region</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Healthcare Street, Suite 100"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">About / Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell patients about your practice, experience, and services..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Application
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 rounded-full gradient-healthcare flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Thank you for registering with MediFind. Our team will review your
              application and get back to you within 24-48 hours.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
