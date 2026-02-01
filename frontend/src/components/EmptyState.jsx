// EmptyState.jsx
import { motion } from "framer-motion";

export default function EmptyState  ({ hasFilters }) {
    return (
        <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h2 className="text-2xl font-black mb-4">No blogs found</h2>
            <p className="text-gray-600 font-bold">
                {hasFilters ? 
                    "Try adjusting your search terms or selected category" : 
                    "No blog posts available at the moment"
                }
            </p>
        </motion.div>
    );
};