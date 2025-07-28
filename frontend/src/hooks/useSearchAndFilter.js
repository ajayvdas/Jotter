

// useSearchAndFilter.js (Custom Hook)
import { useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";

export const useSearchAndFilter = () => {
    const { blogs, input, setInput } = useAppContext();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories from blogs
    const categories = useMemo(() => {
        if (!blogs || blogs.length === 0) return ["All"];
        
        const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
        return ["All", ...uniqueCategories];
    }, [blogs]);

    // Filter blogs based on search term and selected category
    const filteredPosts = useMemo(() => {
        if (!blogs || blogs.length === 0) return [];

        let filtered = blogs;

        // Filter by search term (using both searchTerm and context input)
        const searchQuery = searchTerm || input || "";
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (blog.description && blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        return filtered;
    }, [blogs, searchTerm, input, selectedCategory]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setInput(value); // Update context input as well
    };

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return {
        blogs,
        searchTerm,
        selectedCategory,
        categories,
        filteredPosts,
        handleSearchChange,
        handleCategorySelect,
        input
    };
};