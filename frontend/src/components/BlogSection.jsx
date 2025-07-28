// BlogSection.jsx

import BlogGrid from "./BlogGrid";

export default function BlogSection({ filteredPosts, searchTerm, input }) {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <BlogGrid 
                    filteredPosts={filteredPosts}
                    searchTerm={searchTerm}
                    input={input}
                />
            </div>
        </section>
    );
};