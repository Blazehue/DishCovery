"use client";

import { useEffect, useState } from "react";
import { X, Clock, Users, Heart, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface RecipeDetailProps {
  recipeId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  diets: string[];
  summary: string;
  extendedIngredients: {
    id: number;
    original: string;
    measures: {
      metric: {
        amount: number;
        unitShort: string;
      };
    };
  }[];
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
    }[];
  }[];
}

export default function RecipeDetail({ recipeId, isOpen, onClose }: RecipeDetailProps) {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (recipeId && isOpen) {
      fetchRecipeDetails();
      checkFavoriteStatus();
    }
  }, [recipeId, isOpen]);

  const fetchRecipeDetails = async () => {
    if (!recipeId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/recipes/${recipeId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }
      
      const data = await response.json();
      setRecipe(data);
    } catch (err) {
      setError("Failed to load recipe details. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkFavoriteStatus = () => {
    if (!recipeId) return;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(recipeId));
  };

  const toggleFavorite = () => {
    if (!recipeId) return;
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (isFavorite) {
      const updated = favorites.filter((id: number) => id !== recipeId);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(recipeId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }

    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchRecipeDetails}>Try Again</Button>
          </div>
        ) : recipe ? (
          <ScrollArea className="h-[90vh]">
            <div className="relative">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 rounded-full"
                  onClick={toggleFavorite}
                >
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </motion.div>
                </Button>
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-2">{recipe.title}</DialogTitle>
                  <DialogDescription asChild>
                    <div className="space-y-4">
                      <div className="flex gap-6 text-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>{recipe.readyInMinutes} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {recipe.cuisines?.map((cuisine) => (
                          <Badge key={cuisine} variant="secondary">
                            {cuisine}
                          </Badge>
                        ))}
                        {recipe.diets?.map((diet) => (
                          <Badge key={diet} variant="outline">
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                    <ul className="space-y-2">
                      {recipe.extendedIngredients?.map((ingredient) => (
                        <motion.li
                          key={ingredient.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{ingredient.original}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                    {recipe.analyzedInstructions?.[0]?.steps ? (
                      <ol className="space-y-4">
                        {recipe.analyzedInstructions[0].steps.map((step) => (
                          <motion.li
                            key={step.number}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: step.number * 0.05 }}
                            className="flex gap-4"
                          >
                            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                              {step.number}
                            </span>
                            <p className="flex-1 pt-1">{step.step}</p>
                          </motion.li>
                        ))}
                      </ol>
                    ) : (
                      <div
                        className="text-sm text-muted-foreground prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: recipe.summary }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
