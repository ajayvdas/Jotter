// CategoryFilter.jsx
import { Button } from "@/components/ui/button";

export const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
                <Button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={`font-black border-2 border-black rounded-none transform hover:scale-105 transition-all ${
                        selectedCategory === category
                            ? "bg-red-500 text-white"
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};