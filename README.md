# 🍽️ DishCovery - Recipe Finder App

A modern, feature-rich recipe finder application built with Next.js, TypeScript, and Tailwind CSS. Search thousands of recipes, filter by dietary preferences, save your favorites, and discover your next culinary adventure!

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **API**: Recipe API (Spoonacular/Edamam/TheMealDB)
- **State Management**: React Hooks + Context API
- **Storage**: Local Storage for favorites persistence

## ✨ Key Features

- 🔍 **Recipe Search**: Search thousands of recipes by name or ingredients
- 🎯 **Advanced Filters**: Filter by cuisine, dietary restrictions, meal type, and cooking time
- ❤️ **Favorites System**: Save and manage your favorite recipes
- 📱 **Responsive Design**: Seamless experience across all devices
- 🎨 **Modern UI**: Beautiful animations and transitions
- ⚡ **Fast Performance**: Optimized with Next.js 15 and Turbopack
- 🌙 **Theme Toggle**: Light and dark mode support
- 📊 **Recipe Details**: Complete ingredient lists, instructions, and nutritional info

## 🏗️ Project Structure

```
recipe-finder-app-main/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── recipes/
│   │   │       ├── [id]/route.ts      # Recipe detail API
│   │   │       └── search/route.ts     # Recipe search API
│   │   ├── favorites/
│   │   │   └── page.tsx                # Favorites page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home page
│   │   └── globals.css                 # Global styles
│   ├── components/
│   │   ├── RecipeSearch.tsx            # Search component
│   │   ├── RecipeCard.tsx              # Recipe card component
│   │   ├── RecipeDetail.tsx            # Recipe detail view
│   │   ├── ThemeToggle.tsx             # Theme switcher
│   │   └── ui/                         # UI component library
│   ├── hooks/
│   │   └── use-mobile.ts               # Responsive hooks
│   └── lib/
│       └── utils.ts                    # Utility functions
├── public/                              # Static assets
└── package.json                         # Dependencies
```

## 📋 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Blazehue/DishCovery.git
cd DishCovery
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_RECIPE_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://api.spoonacular.com/recipes
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Commit-by-Commit Development Strategy

### Phase 1: Initial Setup (Commits 1-3)

#### **Commit #1: Project Initialization**
```bash
git commit -m "chore: initialize Next.js project with TypeScript and Tailwind CSS"
```
**What it does**: Sets up the basic Next.js project structure with TypeScript configuration, Tailwind CSS, and essential dependencies.

**Code changes**:
- Initialize Next.js with `create-next-app`
- Configure `tsconfig.json` for TypeScript
- Set up `tailwind.config.ts` and PostCSS
- Create folder structure (components, lib, hooks)

**Testing**: 
- Run `npm run dev` to ensure server starts
- Check TypeScript compilation with `npm run build`

---

#### **Commit #2: UI Component Library Setup**
```bash
git commit -m "feat: add Radix UI components and theme system"
```
**What it does**: Installs and configures Radix UI primitives and sets up the design system with reusable components.

**Code changes**:
- Install Radix UI packages (@radix-ui/react-*)
- Create base UI components (Button, Card, Input, etc.)
- Set up `ThemeProvider.tsx` for dark/light mode
- Add `globals.css` with CSS variables for theming

**Testing**:
- Test theme toggle functionality
- Verify all UI components render correctly

---

#### **Commit #3: API Configuration and Environment Setup**
```bash
git commit -m "chore: configure recipe API integration and environment variables"
```
**What it does**: Sets up API configuration, environment variables, and creates utility functions for API calls.

**Code changes**:
- Create `.env.local` with API keys
- Add `lib/api.ts` for API utility functions
- Create type definitions in `types/recipe.ts`
- Add error handling utilities

**Testing**:
- Test API connection with a simple fetch
- Verify environment variables are loaded

---

### Phase 2: Core Functionality (Commits 4-10)

#### **Commit #4: Recipe Search Component**
```bash
git commit -m "feat: implement recipe search component with API integration"
```
**What it does**: Creates the main search component with input field and search functionality.

**Code changes**:
- Create `RecipeSearch.tsx` component
- Add search input with debouncing
- Implement search API call to `/api/recipes/search`
- Add loading state and error handling

**Testing**:
- Test search with various keywords
- Verify debouncing works (no excessive API calls)
- Test error states with invalid API keys

---

#### **Commit #5: Recipe Card Component**
```bash
git commit -m "feat: create recipe card component with image and basic info"
```
**What it does**: Builds the recipe card component to display individual recipe items in search results.

**Code changes**:
- Create `RecipeCard.tsx` component
- Display recipe image, title, cooking time, servings
- Add hover effects and animations
- Implement responsive grid layout

**Testing**:
- Test with different recipe data structures
- Verify images load with fallback
- Test responsive behavior on mobile

---

#### **Commit #6: Search Results Display**
```bash
git commit -m "feat: display search results in responsive grid layout"
```
**What it does**: Implements the results display with pagination and loading states.

**Code changes**:
- Create `RecipeGrid.tsx` component
- Add pagination controls
- Implement infinite scroll or "Load More" button
- Add empty state for no results

**Testing**:
- Test with large result sets
- Verify pagination works correctly
- Test empty search results

---

#### **Commit #7: Recipe Detail View**
```bash
git commit -m "feat: implement recipe detail modal with full information"
```
**What it does**: Creates a detailed view showing complete recipe information.

**Code changes**:
- Create `RecipeDetail.tsx` component
- Add API route `/api/recipes/[id]/route.ts`
- Display ingredients, instructions, nutrition facts
- Add modal or dedicated page for details

**Testing**:
- Test opening detail view from card
- Verify all recipe data displays correctly
- Test modal close functionality

---

#### **Commit #8: Ingredient List Display**
```bash
git commit -m "feat: add formatted ingredient list with measurements"
```
**What it does**: Enhances the recipe detail view with a formatted ingredient list.

**Code changes**:
- Create `IngredientList.tsx` component
- Format measurements and quantities
- Add checkboxes for shopping list feature
- Implement collapsible sections

**Testing**:
- Test with recipes having many ingredients
- Verify measurement formatting
- Test checkbox interactions

---

#### **Commit #9: Cooking Instructions Display**
```bash
git commit -m "feat: add step-by-step cooking instructions"
```
**What it does**: Displays cooking instructions in an easy-to-follow format.

**Code changes**:
- Create `InstructionSteps.tsx` component
- Number steps automatically
- Add progress tracking (optional)
- Style with accordion or tabs

**Testing**:
- Test with various instruction formats
- Verify step numbering
- Test with missing instruction data

---

#### **Commit #10: Nutrition Information Display**
```bash
git commit -m "feat: display nutritional information with visual charts"
```
**What it does**: Shows nutritional data with charts and badges.

**Code changes**:
- Create `NutritionInfo.tsx` component
- Add Recharts for visual representation
- Display calories, protein, carbs, fats
- Add dietary badges (vegan, gluten-free, etc.)

**Testing**:
- Test with complete nutrition data
- Test with missing nutrition info
- Verify chart responsiveness

---

### Phase 3: Filtering System (Commits 11-14)

#### **Commit #11: Cuisine Type Filters**
```bash
git commit -m "feat: add cuisine type filter dropdown"
```
**What it does**: Implements cuisine type filtering (Italian, Mexican, Asian, etc.).

**Code changes**:
- Create `CuisineFilter.tsx` component
- Add multi-select dropdown
- Update search API to include cuisine parameter
- Persist filter state in URL params

**Testing**:
- Test selecting multiple cuisines
- Verify results update correctly
- Test URL parameter persistence

---

#### **Commit #12: Dietary Restriction Filters**
```bash
git commit -m "feat: implement dietary restriction filters"
```
**What it does**: Adds filters for dietary needs (vegetarian, vegan, gluten-free, etc.).

**Code changes**:
- Create `DietaryFilter.tsx` component
- Add checkbox group for dietary options
- Update API integration with diet parameters
- Add filter badges to show active filters

**Testing**:
- Test combinations of dietary filters
- Verify results match selected restrictions
- Test clearing filters

---

#### **Commit #13: Meal Type and Time Filters**
```bash
git commit -m "feat: add meal type and cooking time filters"
```
**What it does**: Implements filtering by meal type (breakfast, lunch, dinner) and cooking duration.

**Code changes**:
- Create `MealTypeFilter.tsx` component
- Add time range slider for cooking duration
- Combine all filters in `FilterPanel.tsx`
- Add responsive filter drawer for mobile

**Testing**:
- Test meal type selection
- Verify time slider functionality
- Test filter panel on mobile devices

---

#### **Commit #14: Filter Integration and State Management**
```bash
git commit -m "feat: integrate all filters with search functionality"
```
**What it does**: Connects all filters to the search system with proper state management.

**Code changes**:
- Create `useFilters` custom hook
- Implement filter state management
- Add "Clear All Filters" functionality
- Update URL with filter parameters

**Testing**:
- Test all filter combinations
- Verify URL updates with filters
- Test browser back/forward navigation

---

### Phase 4: Favorites Feature (Commits 15-17)

#### **Commit #15: Favorites Add/Remove Functionality**
```bash
git commit -m "feat: implement add/remove favorites with heart icon"
```
**What it does**: Adds ability to favorite recipes with visual feedback.

**Code changes**:
- Create `useFavorites` custom hook
- Add heart icon to recipe cards
- Implement toggle favorite functionality
- Add animations for heart icon

**Testing**:
- Test adding/removing favorites
- Verify heart icon state persists
- Test animation smoothness

---

#### **Commit #16: Local Storage Persistence**
```bash
git commit -m "feat: persist favorites in local storage"
```
**What it does**: Saves favorites to local storage for persistence across sessions.

**Code changes**:
- Update `useFavorites` hook with localStorage
- Add serialization/deserialization logic
- Implement storage event listener for sync
- Add error handling for storage quota

**Testing**:
- Test favorites persist after refresh
- Test with many favorites (storage limits)
- Test in private browsing mode

---

#### **Commit #17: Favorites Page**
```bash
git commit -m "feat: create dedicated favorites page"
```
**What it does**: Builds a page to view all saved favorite recipes.

**Code changes**:
- Create `app/favorites/page.tsx`
- Display favorites in grid layout
- Add empty state for no favorites
- Implement remove from favorites

**Testing**:
- Test with empty favorites
- Test with many favorites
- Verify remove functionality works

---

### Phase 5: Polish & Refinement (Commits 18-21)

#### **Commit #18: Loading States and Skeletons**
```bash
git commit -m "feat: add loading skeletons and shimmer effects"
```
**What it does**: Improves UX with loading indicators and skeleton screens.

**Code changes**:
- Create `Skeleton.tsx` component
- Add loading skeletons for cards
- Implement shimmer animation
- Add spinner for button loading states

**Testing**:
- Test on slow network connections
- Verify skeleton matches final layout
- Test loading state transitions

---

#### **Commit #19: Error Handling and User Feedback**
```bash
git commit -m "feat: implement comprehensive error handling with toast notifications"
```
**What it does**: Adds proper error handling with user-friendly messages.

**Code changes**:
- Install and configure `sonner` for toasts
- Add error boundaries
- Implement retry logic for failed requests
- Add user-friendly error messages

**Testing**:
- Test with network failures
- Test with invalid API responses
- Verify error recovery mechanisms

---

#### **Commit #20: Responsive Design and Mobile Optimization**
```bash
git commit -m "style: optimize responsive design for all screen sizes"
```
**What it does**: Ensures app works perfectly on all devices.

**Code changes**:
- Update layouts with responsive breakpoints
- Optimize touch interactions for mobile
- Add mobile-specific navigation
- Test and fix responsive issues

**Testing**:
- Test on various screen sizes
- Test touch gestures on mobile
- Verify no horizontal scrolling

---

#### **Commit #21: Animations and Final Polish**
```bash
git commit -m "style: add smooth animations and final UI polish"
```
**What it does**: Adds finishing touches with animations and micro-interactions.

**Code changes**:
- Add Framer Motion animations
- Implement page transitions
- Add hover effects and micro-interactions
- Optimize performance

**Testing**:
- Test animation performance
- Verify no layout shifts
- Test on lower-end devices

---

## 🧪 Testing Strategy

### Unit Testing
- Test individual components with Jest and React Testing Library
- Test custom hooks in isolation
- Test utility functions

### Integration Testing
- Test API route handlers
- Test component interactions
- Test filter combinations

### E2E Testing
- Test complete user flows
- Test favorites persistence
- Test search and filter workflows

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 📦 Key Dependencies

- `next@15.3.5` - React framework
- `react@19.0.0` - UI library
- `typescript@5` - Type safety
- `tailwindcss@4` - Styling
- `framer-motion@12` - Animations
- `@radix-ui/react-*` - Accessible UI primitives
- `sonner@2.0.6` - Toast notifications
- `next-themes@0.4.6` - Theme management

## 🐛 Known Issues

- Peer dependency conflict between `better-auth` and `autumn-js` (resolved with `--legacy-peer-deps`)
- Security vulnerabilities in older dependencies (run `npm audit fix`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes following the commit strategy
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Next.js](https://nextjs.org/) for the amazing framework

## 📧 Contact:
Linkedin: https://www.linkedin.com/in/rajat-pandey-58a949257/

Project Link: [https://github.com/Blazehue/DishCovery](https://github.com/Blazehue/DishCovery)

---

**Happy Cooking! 🍳**
