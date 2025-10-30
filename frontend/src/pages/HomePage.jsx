import { useState } from "react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

import HeroSection from "@/components/HeroSection";
import BlogSection from "@/components/BlogSection";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";

export default function HomePage() {
    const [email, setEmail] = useState("");
    
    const {
        blogs,
        searchTerm,
        selectedCategory,
        categories,
        filteredPosts,
        handleSearchChange,
        handleCategorySelect,
        input
    } = useSearchAndFilter();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <HeroSection
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                filteredCount={filteredPosts.length}
                totalCount={blogs.length}
            />

            <BlogSection 
                filteredPosts={filteredPosts}
                searchTerm={searchTerm}
                input={input}
            />

            <Newsletter email={email} setEmail={setEmail} />
            <Footer />
        </div>
    );
}