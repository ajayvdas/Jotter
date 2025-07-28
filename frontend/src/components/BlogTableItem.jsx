import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Trash2, Edit, MoreVertical, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

export default function BlogTableItem({ blog, fetchBlogs, index }) {
    const { title, createdAt } = blog;
    const blogDate = new Date(createdAt);
    const { axios } = useAppContext();

    const deleteBlog = async () => {
        console.log("Clicking delete blog")
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;
        try {
            const { data } = await axios.post("/api/blog/delete", { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const togglePublish = async () => {
        try {
            const { data } = await axios.post("/api/blog/toggle-publish", { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <motion.div
            key={blog._id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
        >
            <div className="col-span-1 font-black">{index}</div>
            <div className="col-span-4">
                <div className="font-black text-sm">{title}</div>
                <div className="text-xs font-bold text-gray-500">
                    {blog.views} views • {blog.totalApprovedComments} comments
                </div>
            </div>
            <div className="col-span-2">
                <Badge
                    className={`font-black border-2 border-black rounded-none ${
                        blog.category === "technology"
                            ? "bg-blue-500"
                            : blog.category === "startup"
                            ? "bg-red-500"
                            : blog.category === "lifestyle"
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-500"
                    }`}
                >
                    {blog.category}
                </Badge>
            </div>
            <div className="col-span-2 font-bold text-sm">{blogDate.toDateString()}</div>
            <div className="col-span-1">
                <Badge
                    className={`font-black border-2 border-black rounded-none ${
                        blog.isPublished ? "bg-green-500" : "bg-orange-500"
                    }`}
                >
                    {blog.isPublished ? "Published" : "Unpublished"}
                </Badge>
            </div>
            <div className="col-span-2 flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            className="bg-gray-500 text-white font-black border-2 border-black rounded-none hover:bg-gray-600"
                        >
                            <MoreVertical className="w-3 h-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-4 border-black rounded-none">
                        <DropdownMenuItem className="font-black" onClick={togglePublish}>
                            <Send className="w-4 h-4 mr-2 text-red-500" />
                            {blog.isPublished ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>

                        <DropdownMenuItem className="font-black" onClick={deleteBlog}>
                            <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                            Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem className="font-black">
                            <Eye className="w-4 h-4 mr-2 text-red-500" />
                            View
                        </DropdownMenuItem>

                        <DropdownMenuItem className="font-black">
                            <Edit className="w-4 h-4 mr-2 text-red-500" />
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    );
}
