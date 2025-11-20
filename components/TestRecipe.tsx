"use client";

import { useState } from "react";
import { useRecipes } from "@/hooks/useRecipes";

export default function TestRecipe() {
  const [input, setInput] = useState("");
  const recipeMutation = useRecipes();

  const handleGenerate = () => {
    const ingredients = input.split(",").map(i => i.trim());
    recipeMutation.mutate(ingredients);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test Recipe Generator</h2>

      <input
        type="text"
        placeholder="Enter ingredients e.g: rice, chicken"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 8, width: "300px" }}
      />

      <button onClick={handleGenerate} style={{ marginLeft: 10, padding: 8 }}>
        Generate
      </button>

      {recipeMutation.isPending && <p>Generating recipe...</p>}

      {recipeMutation.isError && (
        <p style={{ color: "red" }}>
          Error: {recipeMutation.error?.message}
        </p>
      )}

      {recipeMutation.isSuccess && (
        <div style={{ marginTop: 20 }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(recipeMutation.data.recipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
