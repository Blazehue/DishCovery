"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeCard, { Recipe } from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  useEffect(() => {
    loadFavorites();
    
    // Listen for favorites changes
    const handleFavoritesChange = () => {
      loadFavorites();
    };
    
    window.addEventListener("favoritesChanged", handleFavoritesChange);
    
    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
    };
  }, []);

  const loadFavorites = async () => {
    setIsLoading(true);
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (favoriteIds.length === 0) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    try {
      const recipes = await Promise.all(
        favoriteIds.map(async (id: number) => {
          const response = await fetch(`/api/recipes/${id}`);
          if (response.ok) {
            return response.json();
          }
          return null;
        })
      );
      
      setFavorites(recipes.filter(Boolean));
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 fill-red-500 text-red-500" />
              My Favorites
            </h1>
            <p className="text-muted-foreground mt-2">
              {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"} saved
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding recipes to your favorites by clicking the heart icon
            </p>
            <Link href="/">
              <Button>Browse Recipes</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe, index) => (
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
