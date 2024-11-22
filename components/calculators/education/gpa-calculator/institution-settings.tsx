"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradeScale {
  letter: string;
  minGrade: number;
  points: number;
}

interface Institution {
  name: string;
  scale: GradeScale[];
}

const defaultInstitutions: Institution[] = [
  {
    name: "US Standard",
    scale: [
      { letter: "A+", minGrade: 97, points: 4.0 },
      { letter: "A", minGrade: 93, points: 4.0 },
      { letter: "A-", minGrade: 90, points: 3.7 },
      { letter: "B+", minGrade: 87, points: 3.3 },
      { letter: "B", minGrade: 83, points: 3.0 },
      { letter: "B-", minGrade: 80, points: 2.7 },
      { letter: "C+", minGrade: 77, points: 2.3 },
      { letter: "C", minGrade: 73, points: 2.0 },
      { letter: "C-", minGrade: 70, points: 1.7 },
      { letter: "D+", minGrade: 67, points: 1.3 },
      { letter: "D", minGrade: 63, points: 1.0 },
      { letter: "F", minGrade: 0, points: 0.0 },
    ],
  },
  {
    name: "UK Standard",
    scale: [
      { letter: "First", minGrade: 70, points: 4.0 },
      { letter: "2:1", minGrade: 60, points: 3.5 },
      { letter: "2:2", minGrade: 50, points: 3.0 },
      { letter: "Third", minGrade: 40, points: 2.0 },
      { letter: "Fail", minGrade: 0, points: 0.0 },
    ],
  },
];

interface InstitutionSettingsProps {
  onInstitutionChange: (institution: Institution) => void;
}

export function InstitutionSettings({ onInstitutionChange }: InstitutionSettingsProps) {
  const [institutions, setInstitutions] = useState<Institution[]>(defaultInstitutions);
  const [selectedInstitution, setSelectedInstitution] = useState(institutions[0].name);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScale, setEditingScale] = useState<GradeScale[]>([]);
  const { toast } = useToast();

  const handleInstitutionChange = (name: string) => {
    setSelectedInstitution(name);
    const institution = institutions.find((i) => i.name === name);
    if (institution) {
      onInstitutionChange(institution);
    }
  };

  const startEditing = () => {
    const institution = institutions.find((i) => i.name === selectedInstitution);
    if (institution) {
      setEditingScale([...institution.scale]);
      setIsEditing(true);
    }
  };

  const addGrade = () => {
    setEditingScale([
      ...editingScale,
      { letter: "", minGrade: 0, points: 0 },
    ]);
  };

  const removeGrade = (index: number) => {
    setEditingScale(editingScale.filter((_, i) => i !== index));
  };

  const updateGrade = (
    index: number,
    field: keyof GradeScale,
    value: string | number
  ) => {
    const newScale = [...editingScale];
    newScale[index] = {
      ...newScale[index],
      [field]: field === "letter" ? value : parseFloat(value as string),
    };
    setEditingScale(newScale);
  };

  const saveChanges = () => {
    const newInstitutions = institutions.map((inst) =>
      inst.name === selectedInstitution
        ? { ...inst, scale: editingScale }
        : inst
    );
    setInstitutions(newInstitutions);
    setIsEditing(false);
    toast({
      title: "Changes Saved",
      description: "Grading scale has been updated.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Institution</Label>
            <Select
              value={selectedInstitution}
              onValueChange={handleInstitutionChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((inst) => (
                  <SelectItem key={inst.name} value={inst.name}>
                    {inst.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-4">Current Grading Scale</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">Grade</div>
                  <div className="font-medium">Minimum %</div>
                  <div className="font-medium">Points</div>
                  {institutions
                    .find((i) => i.name === selectedInstitution)
                    ?.scale.map((grade) => (
                      <>
                        <div>{grade.letter}</div>
                        <div>{grade.minGrade}%</div>
                        <div>{grade.points.toFixed(1)}</div>
                      </>
                    ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={startEditing}
              >
                Edit Scale
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {editingScale.map((grade, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <Input
                    value={grade.letter}
                    onChange={(e) =>
                      updateGrade(index, "letter", e.target.value)
                    }
                    placeholder="Grade"
                  />
                  <Input
                    type="number"
                    value={grade.minGrade}
                    onChange={(e) =>
                      updateGrade(index, "minGrade", e.target.value)
                    }
                    placeholder="Min %"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={grade.points}
                      onChange={(e) =>
                        updateGrade(index, "points", e.target.value)
                      }
                      placeholder="Points"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGrade(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={addGrade}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button className="w-full" onClick={saveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}