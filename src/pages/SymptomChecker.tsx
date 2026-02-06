import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const QUESTIONS = [
  { id: "q1", text: "Do you have a fever?" },
  { id: "q2", text: "Do you have a cough?" },
  { id: "q3", text: "Do you feel chest pain?" },
  { id: "q4", text: "Do you have headaches?" },
];

export default function SymptomChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => setAnswers((a) => ({ ...a, [id]: !a[id] }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Symptoms Questionnaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {QUESTIONS.map((q) => (
              <label key={q.id} className="flex items-center gap-2">
                <input type="checkbox" checked={!!answers[q.id]} onChange={() => toggle(q.id)} />
                <span>{q.text}</span>
              </label>
            ))}
            <Button onClick={() => setSubmitted(true)}>Get Preliminary Guidance</Button>
            {submitted && (
              <div className="mt-4 p-3 rounded bg-accent">
                <p className="text-sm">
                  Based on your inputs, consider visiting a specialist. You can browse categories or book directly.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" onClick={() => (window.location.href = "/category/general")}>
                    Browse Categories
                  </Button>
                  <Button onClick={() => (window.location.href = "/book-appointment")}>Book Appointment</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
