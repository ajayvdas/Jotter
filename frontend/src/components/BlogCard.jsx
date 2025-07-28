
// BlogCard.jsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function BlogCard ({ post, index })  {
    const navigate = useNavigate();
    return (
        <motion.div
            key={post._id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, rotate: Math.random() * 2 - 1 }}
        >
            <Card 
                onClick={() => navigate(`/blog/${post._id}`)}
                className="py-0 border-4 border-black rounded-none overflow-hidden bg-white transform hover:shadow-2xl transition-all cursor-pointer">
                <div className="relative">
                    <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                    />
                    <div
                        className={`absolute top-4 left-4 ${post.color || 'bg-yellow-400'} text-black px-3 py-1 font-black text-sm border-2 border-black transform -rotate-2`}
                    >
                        {post.category}
                    </div>
                </div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-black mb-3 leading-tight">{post.title}</h3>
                    <p 
                        className="text-gray-700 font-bold mb-4"
                        dangerouslySetInnerHTML={{ "__html": post.description.slice(0, 80) }}
                    >
                        {/* {post.description || "No description available"} */}
                    </p>
                    <Button className="bg-yellow-400 text-black font-black border-2 border-black rounded-none hover:bg-yellow-300 transform hover:scale-105 transition-all">
                        READ MORE
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};
