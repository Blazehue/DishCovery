"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

interface RecipeSearchProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

export interface SearchFilters {
  query: string;
  cuisine: string;
  diet: string;
  type: string;
  maxReadyTime: string;
}

export default function RecipeSearch({ onSearch, isLoading }: RecipeSearchProps) {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [type, setType] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");

  const handleSearch = () => {
    onSearch({ query, cuisine, diet, type, maxReadyTime });
  };

  const handleClearFilters = () => {
    setCuisine("");
    setDiet("");
    setType("");
    setMaxReadyTime("");
    onSearch({ query, cuisine: "", diet: "", type: "", maxReadyTime: "" });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-9"
            disabled={isLoading}
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader className="space-y-3 pb-6 border-b">
              <SheetTitle className="text-2xl">Filters</SheetTitle>
              <SheetDescription className="text-base">
                Refine your recipe search with filters
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-8 mt-8">
              <div className="space-y-3">
                <Label htmlFor="cuisine" className="text-base font-semibold">Cuisine</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger id="cuisine" className="h-11">
                    <SelectValue placeholder="Any cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any cuisine</SelectItem>
                    <SelectItem value="african">African</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="british">British</SelectItem>
                    <SelectItem value="cajun">Cajun</SelectItem>
                    <SelectItem value="caribbean">Caribbean</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="eastern european">Eastern European</SelectItem>
                    <SelectItem value="european">European</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="greek">Greek</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="irish">Irish</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="jewish">Jewish</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="latin american">Latin American</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="middle eastern">Middle Eastern</SelectItem>
                    <SelectItem value="nordic">Nordic</SelectItem>
                    <SelectItem value="southern">Southern</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="thai">Thai</SelectItem>
                    <SelectItem value="vietnamese">Vietnamese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="diet" className="text-base font-semibold">Diet</Label>
                <Select value={diet} onValueChange={setDiet}>
                  <SelectTrigger id="diet" className="h-11">
                    <SelectValue placeholder="Any diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any diet</SelectItem>
                    <SelectItem value="gluten free">Gluten Free</SelectItem>
                    <SelectItem value="ketogenic">Ketogenic</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="lacto-vegetarian">Lacto-Vegetarian</SelectItem>
                    <SelectItem value="ovo-vegetarian">Ovo-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescetarian">Pescetarian</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                    <SelectItem value="primal">Primal</SelectItem>
                    <SelectItem value="whole30">Whole30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="type" className="text-base font-semibold">Meal Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="h-11">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any type</SelectItem>
                    <SelectItem value="main course">Main Course</SelectItem>
                    <SelectItem value="side dish">Side Dish</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="salad">Salad</SelectItem>
                    <SelectItem value="bread">Bread</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="soup">Soup</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                    <SelectItem value="sauce">Sauce</SelectItem>
                    <SelectItem value="marinade">Marinade</SelectItem>
                    <SelectItem value="fingerfood">Fingerfood</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                    <SelectItem value="drink">Drink</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="time" className="text-base font-semibold">Max Cooking Time</Label>
                <Select value={maxReadyTime} onValueChange={setMaxReadyTime}>
                  <SelectTrigger id="time" className="h-11">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Any time</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button onClick={handleSearch} className="flex-1 h-11">
                  Apply Filters
                </Button>
                <Button onClick={handleClearFilters} variant="outline" className="h-11">
                  Clear
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}