import React, { useState, useEffect } from "react";

interface QuestionData {
  questionContent: string;
  household: boolean;
  zipcode: boolean;
  questionType: number;
  enabled: boolean;
  choiceAns: string;
  choices: string[][];
  refs: number[][];
  selectedUnits: string[]; // Update the type based on your actual data structure
  selectedFormulas: string[];
  label: string;
}

export const ChoiceTypeAns = () => {
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const id = "16"; // You should get the question ID from the route parameter or elsewhere
      try {
        const response = await fetch(`/api/question/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuestion(data);
        } else {
          console.error("Failed to fetch question");
        }
      } catch (error) {
        console.error("Error fetching a specific question:", error);
      }
    };

    fetchQuestion();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div style={{ marginTop: "100px", marginLeft: "100px" }}>
      {question ? (
        <div>
          <h2>{question.label}</h2>
          <p>{question.questionContent}</p>
          {/* Render other question details as needed */}
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};
