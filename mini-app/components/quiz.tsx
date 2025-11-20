"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  question: string;
  options: { label: string; animal: Animal }[];
}

const rawQuestions: Question[] = [
  {
    question: "What is your favorite type of food?",
    options: [
      { label: "Fish", animal: "cat" },
      { label: "Bones", animal: "dog" },
      { label: "Leaves", animal: "fox" },
      { label: "Seeds", animal: "hamster" },
      { label: "Grass", animal: "horse" },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { label: "Sleeping", animal: "cat" },
      { label: "Playing fetch", animal: "dog" },
      { label: "Hunting", animal: "fox" },
      { label: "Running in a wheel", animal: "hamster" },
      { label: "Riding", animal: "horse" },
    ],
  },
  {
    question: "What is your preferred environment?",
    options: [
      { label: "Indoor", animal: "cat" },
      { label: "Outdoor", animal: "dog" },
      { label: "Forest", animal: "fox" },
      { label: "Cage", animal: "hamster" },
      { label: "Pasture", animal: "horse" },
    ],
  },
  {
    question: "How do you like to communicate?",
    options: [
      { label: "Purrs", animal: "cat" },
      { label: "Barks", animal: "dog" },
      { label: "Screech", animal: "fox" },
      { label: "Squeaks", animal: "hamster" },
      { label: "Neighs", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite color?",
    options: [
      { label: "Black", animal: "cat" },
      { label: "Brown", animal: "dog" },
      { label: "Orange", animal: "fox" },
      { label: "White", animal: "hamster" },
      { label: "Grey", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Quiz() {
  const [shuffledQuestions] = useState<Question[]>(() =>
    rawQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }))
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(Animal | null)[]>(Array(shuffledQuestions.length).fill(null));
  const [result, setResult] = useState<Animal | null>(null);

  const handleSelect = (animal: Animal) => {
    const newAnswers = [...answers];
    newAnswers[current] = animal;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[current] === null) return;
    if (current === shuffledQuestions.length - 1) {
      const scores: Record<Animal, number> = {
        cat: 0,
        dog: 0,
        fox: 0,
        hamster: 0,
        horse: 0,
      };
      answers.forEach((a) => {
        if (a) scores[a] += 1;
      });
      const maxAnimal = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as Animal;
      setResult(maxAnimal);
    } else {
      setCurrent(current + 1);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setAnswers(Array(shuffledQuestions.length).fill(null));
    setResult(null);
  };

  if (result) {
    return <Result animal={result} onRetake={handleRetake} />;
  }

  const question = shuffledQuestions[current];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {current + 1} of {shuffledQuestions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{question.question}</p>
        <div className="mt-4 flex flex-col gap-2">
          {question.options.map((opt) => (
            <Button
              key={opt.label}
              variant={answers[current] === opt.animal ? "secondary" : "outline"}
              onClick={() => handleSelect(opt.animal)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleNext} disabled={answers[current] === null}>
            {current === shuffledQuestions.length - 1 ? "See Result" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
````

mini-app/components/result.tsx
````python
<<<<<<< SEARCH
