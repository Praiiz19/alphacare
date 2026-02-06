import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
}

interface DrugCategory {
  id: string;
  name: string;
  description: string;
}

const commonSymptoms: Symptom[] = [
  { id: "1", name: "Headache" },
  { id: "2", name: "Fever" },
  { id: "3", name: "Cough" },
  { id: "4", name: "Sore Throat" },
  { id: "5", name: "Body Aches" },
  { id: "6", name: "Nausea" },
  { id: "7", name: "Fatigue" },
  { id: "8", name: "Runny Nose" },
  { id: "9", name: "Stomach Pain" },
  { id: "10", name: "Dizziness" },
];

const symptomToDrugs: Record<string, DrugCategory[]> = {
  Headache: [
    { id: "d1", name: "Pain Relievers", description: "Over-the-counter analgesics" },
  ],
  Fever: [
    { id: "d2", name: "Antipyretics", description: "Fever-reducing medications" },
    { id: "d1", name: "Pain Relievers", description: "Over-the-counter analgesics" },
  ],
  Cough: [
    { id: "d3", name: "Cough Suppressants", description: "Helps control coughing" },
    { id: "d4", name: "Expectorants", description: "Helps clear mucus" },
  ],
  "Sore Throat": [
    { id: "d5", name: "Throat Lozenges", description: "Soothes throat irritation" },
    { id: "d1", name: "Pain Relievers", description: "Over-the-counter analgesics" },
  ],
  "Body Aches": [
    { id: "d1", name: "Pain Relievers", description: "Over-the-counter analgesics" },
    { id: "d6", name: "Muscle Relaxants", description: "Helps relieve muscle tension" },
  ],
  Nausea: [
    { id: "d7", name: "Antiemetics", description: "Helps control nausea and vomiting" },
  ],
  Fatigue: [
    { id: "d8", name: "Vitamins & Supplements", description: "Energy and immune support" },
  ],
  "Runny Nose": [
    { id: "d9", name: "Antihistamines", description: "Reduces allergic reactions" },
    { id: "d10", name: "Decongestants", description: "Relieves nasal congestion" },
  ],
  "Stomach Pain": [
    { id: "d11", name: "Antacids", description: "Neutralizes stomach acid" },
    { id: "d12", name: "Antispasmodics", description: "Reduces stomach cramping" },
  ],
  Dizziness: [
    { id: "d13", name: "Antivertigo Medications", description: "Helps with balance issues" },
  ],
};

interface SymptomSelectorProps {
  onCategoriesChange?: (categories: DrugCategory[]) => void;
}

export function SymptomSelector({ onCategoriesChange }: SymptomSelectorProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptomName: string) => {
    const newSelected = selectedSymptoms.includes(symptomName)
      ? selectedSymptoms.filter((s) => s !== symptomName)
      : [...selectedSymptoms, symptomName];
    
    setSelectedSymptoms(newSelected);

    // Get unique drug categories for selected symptoms
    const allCategories = newSelected.flatMap(
      (s) => symptomToDrugs[s] || []
    );
    const uniqueCategories = Array.from(
      new Map(allCategories.map((c) => [c.id, c])).values()
    );
    onCategoriesChange?.(uniqueCategories);
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    onCategoriesChange?.([]);
  };

  const drugCategories = Array.from(
    new Map(
      selectedSymptoms
        .flatMap((s) => symptomToDrugs[s] || [])
        .map((c) => [c.id, c])
    ).values()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Select Your Symptoms</CardTitle>
            {selectedSymptoms.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.name);
              return (
                <Badge
                  key={symptom.id}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer text-sm py-2 px-3 transition-all"
                  onClick={() => toggleSymptom(symptom.name)}
                >
                  {isSelected && <Check className="w-3 h-3 mr-1" />}
                  {symptom.name}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {drugCategories.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Suggested Drug Categories
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on your selected symptoms. This is for informational purposes only.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {drugCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 rounded-lg border border-border bg-accent/50"
                >
                  <h4 className="font-medium text-foreground mb-1">
                    {category.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
