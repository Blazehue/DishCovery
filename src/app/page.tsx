"use client";

import { useState, useEffect } from "react";
import { ChefHat, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeSearch, { SearchFilters } from "@/components/RecipeSearch";
import RecipeCard, { Recipe } from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChefHatAnimation } from "@/components/ChefHatAnimation";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Load initial popular recipes
    handleSearch({ query: "popular", cuisine: "", diet: "", type: "", maxReadyTime: "" });
  }, []);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (filters.query) params.append("query", filters.query);
      if (filters.cuisine && filters.cuisine !== "none") params.append("cuisine", filters.cuisine);
      if (filters.diet && filters.diet !== "none") params.append("diet", filters.diet);
      if (filters.type && filters.type !== "none") params.append("type", filters.type);
      if (filters.maxReadyTime && filters.maxReadyTime !== "none") params.append("maxReadyTime", filters.maxReadyTime);

      const response = await fetch(`/api/recipes/search?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setRecipes(data.results || []);
    } catch (err) {
      setError("Failed to load recipes. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ChefHatAnimation />
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold">Recipe Finder</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Discover delicious recipes for every occasion
          </p>
          <Link href="/favorites">
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4 mr-2" />
              View Favorites
            </Button>
          </Link>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <RecipeSearch onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => handleSearch({ query: "popular", cuisine: "", diet: "", type: "", maxReadyTime: "" })}>
              Try Again
            </Button>
          </motion.div>
        ) : recipes.length === 0 && hasSearched ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No recipes found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <RecipeCard
                  recipe={recipe}
                  onViewDetails={setSelectedRecipeId}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <RecipeDetail
        recipeId={selectedRecipeId}
        isOpen={!!selectedRecipeId}
        onClose={() => setSelectedRecipeId(null)}
      />
    </div>
  );
}