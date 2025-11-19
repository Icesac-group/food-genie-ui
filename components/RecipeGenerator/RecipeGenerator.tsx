// components/RecipeGenerator.tsx
'use client';

import { useState } from 'react';
import { useRecipes } from '@/hooks/useRecipes';
import { useGenerateRecipe } from '@/hooks/useGenerateRecipe';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { data: recipes, isLoading: loadingRecipes } = useRecipes();
  const generateMutation = useGenerateRecipe();

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIngredients([...ingredients, input.trim()]);
      setInput('');
    }
  };

  const handleGenerate = () => {
    if (ingredients.length === 0) return alert('Add some ingredients first!');
    generateMutation.mutate(ingredients);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Genie</h1>
      
      <form onSubmit={handleAddIngredient} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., chicken, rice"
          className="border p-3 w-full rounded-lg mb-2 text-black"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg w-full font-medium">
          Add Ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <div className="mb-4">
          <p className="font-medium mb-2">Your ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={ingredients.length === 0 || generateMutation.isPending}
        className="bg-green-600 text-white p-4 rounded-lg w-full font-bold disabled:opacity-50"
      >
        {generateMutation.isPending ? 'Generating Magic...' : `Generate Recipe (${ingredients.length})`}
      </button>

      {generateMutation.isSuccess && (
        <p className="text-green-600 font-bold mt-4 text-center">Recipe generated! Check saved recipes below</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">Saved Recipes</h2>
        {loadingRecipes ? (
          <p>Loading...</p>
        ) : recipes?.length ? (
          <ul className="space-y-2">
            {recipes.map((recipe: any) => (
              <li key={recipe.id} className="bg-gray-50 p-3 rounded-lg">
                {recipe.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recipes yet – generate your first one!</p>
        )}
      </div>
    </div>
  );
}