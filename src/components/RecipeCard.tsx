"use client";

import { useState, useEffect } from "react";
import { Heart, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines?: string[];
  diets?: string[];
  dishTypes?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (id: number) => void;
}

export default function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(recipe.id));
  }, [recipe.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (isFavorite) {
      const updated = favorites.filter((id: number) => id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(recipe.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }

    // Dispatch custom event for favorites page to listen
    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden cursor-pointer h-full flex flex-col" onClick={() => onViewDetails(recipe.id)}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full"
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
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
          <div className="flex gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {recipe.cuisines?.slice(0, 2).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
            {recipe.diets?.slice(0, 1).map((diet) => (
              <Badge key={diet} variant="outline" className="text-xs">
                {diet}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={() => onViewDetails(recipe.id)}>
            View Recipe
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
