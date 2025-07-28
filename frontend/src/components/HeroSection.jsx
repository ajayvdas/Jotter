
// HeroSection.jsx
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { ResultsCounter } from "./ResultsCounter";

export default function HeroSection ({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategorySelect,
    filteredCount,
    totalCount
})  {
    return (
        <motion.section
            className="bg-white py-16 border-b-8 border-black"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="container mx-auto px-4 text-center">
                <div className="inline-block bg-blue-500 text-white px-4 py-2 font-black text-sm border-2 border-black mb-6 transform -rotate-1">
                    NEW: AI FEATURE INTEGRATED
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                    YOUR PERSONAL{" "}
                    <span className="text-blue-500 bg-yellow-400 px-4 border-4 border-black transform rotate-1 inline-block">
                        WRITING
                    </span>
                    <br />
                    SPACE.
                </h1>

                <p className="text-xl mb-8 max-w-2xl mx-auto font-bold">
                    This is your space to think out loud, to share what matters, and to write without filters. Whether it's
                    one word or a thousand, your story starts right here.
                </p>

                <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
                
                <CategoryFilter 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={onCategorySelect}
                />

                <ResultsCounter filteredCount={filteredCount} totalCount={totalCount} />
            </div>
        </motion.section>
    );
};