
// BlogGrid.jsx
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import EmptyState from "./EmptyState";

export default function BlogGrid ({ filteredPosts, searchTerm, input }) {
    const hasFilters = Boolean(searchTerm || input);

    if (filteredPosts.length === 0) {
        return <EmptyState hasFilters={hasFilters} />;
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            {filteredPosts.map((post, index) => (
                <BlogCard key={post._id || index} post={post} index={index} />
            ))}
        </motion.div>
    );
};