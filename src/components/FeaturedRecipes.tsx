import RecipeCard from "./RecipeCard";

const recipes = [
  {
    title: "Creamy Tuscan Garlic Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80",
    category: "Pasta",
    time: "30 min",
    servings: 4,
    isLiked: true,
  },
  {
    title: "Grilled Salmon with Herbs",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    category: "Seafood",
    time: "25 min",
    servings: 2,
  },
  {
    title: "Mediterranean Salad Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    category: "Salads",
    time: "15 min",
    servings: 2,
  },
  {
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
    category: "Desserts",
    time: "35 min",
    servings: 4,
  },
  {
    title: "Beef Stew with Vegetables",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    category: "Soups",
    time: "2 hrs",
    servings: 6,
  },
  {
    title: "Lemon Herb Roast Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80",
    category: "Poultry",
    time: "1.5 hrs",
    servings: 4,
    isLiked: true,
  },
];

const FeaturedRecipes = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Recipes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked recipes by our culinary experts, perfect for any occasion
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
