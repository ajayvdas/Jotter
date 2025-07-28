import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    FileText,
    MessageSquare,
    Users,
    Edit,
    Trash2,
    Eye,
    LogOut,
    Search,
    Filter,
    MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import BlogTableItem from "@/components/BlogTableItem";

// const blogPosts = [
//     {
//         id: 1,
//         title: "A detailed step by step guide to manage your lifestyle",
//         category: "Lifestyle",
//         status: "Published",
//         date: "Mon Apr 21 2025",
//         views: 1250,
//         comments: 23,
//     },
//     {
//         id: 2,
//         title: "How to create an effective startup roadmap or ideas",
//         category: "Startup",
//         status: "Published",
//         date: "Mon Apr 21 2025",
//         views: 890,
//         comments: 15,
//     },
//     {
//         id: 3,
//         title: "Learning new technology to boost your career in software",
//         category: "Technology",
//         status: "Draft",
//         date: "Mon Apr 21 2025",
//         views: 0,
//         comments: 0,
//     },
//     {
//         id: 4,
//         title: "Tips for getting the most out of apps and software",
//         category: "Technology",
//         status: "Published",
//         date: "Mon Apr 21 2025",
//         views: 2100,
//         comments: 45,
//     },
//     {
//         id: 5,
//         title: "Enhancing your skills and capturing memorable moments",
//         category: "Lifestyle",
//         status: "Published",
//         date: "Mon Apr 21 2025",
//         views: 750,
//         comments: 12,
//     },
// ];

export default function ListBlogPage() {
    const { axios } = useAppContext();
    const [blogs, setBlogs] = useState([]);
    // const [selectedPosts, setSelectedPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/admin/blogs");
            if (data.success) {
                setBlogs(data.blogs);
                console.log(data.blogs)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    console.log(blogs);

    // using dummy blogPosts data
    // const filteredPosts = blogPosts.filter(
    //     (post) =>
    //         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         post.category.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredPosts = blogs.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 ml-20 md:ml-80">
            <motion.header
                className="bg-white border-b-8 border-black p-6"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">BLOG LIST</h1>
                        <p className="text-lg font-bold text-gray-600">Manage your Jotter blog here</p>
                    </div>
                    <Button className="bg-red-500 rounded-none text-white font-black border-4 border-black hover:bg-red-600 transform hover:scale-105 transition-all">
                        <LogOut className="w-4 h-4 mr-2" />
                        LOGOUT
                    </Button>
                </div>
            </motion.header>

            <div className="p-6">
                {/* Blog Management Section */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-4 border-black rounded-none py-0">
                        <CardHeader className="bg-blue-500 border-b-4 border-black py-6">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-black text-white flex items-center">
                                    <FileText className="w-6 h-6 mr-2" />
                                    ALL BLOGS
                                </CardTitle>
                                <Button className="bg-yellow-400 text-black font-black border-2 border-black hover:bg-yellow-300">
                                    <Plus className="w-4 h-4 mr-2" />
                                    NEW BLOG
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 bg-white">
                            {/* Search and Filter */}
                            <div className="p-4 border-b-4 border-black bg-gray-50">
                                <div className="flex gap-4">
                                    <div className="flex-1 flex">
                                        <Input
                                            placeholder="Search blogs..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border-4 border-black rounded-none font-bold"
                                        />
                                        <Button className="bg-black text-white font-black border-4 border-black border-l-0 rounded-none">
                                            <Search className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Button className="bg-white text-black font-black border-4 border-black hover:bg-gray-100">
                                        <Filter className="w-4 h-4 mr-2" />
                                        FILTER
                                    </Button>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b-4 border-black font-black text-sm">
                                <div className="col-span-1">#</div>
                                <div className="col-span-4">BLOG TITLE</div>
                                <div className="col-span-2">CATEGORY</div>
                                <div className="col-span-2">DATE</div>
                                <div className="col-span-1">STATUS</div>
                                <div className="col-span-2">ACTIONS</div>
                            </div>

                            {/* Table Rows */}
                            {/* <div className="divide-y-4 divide-black">
                                {filteredPosts.map((blog, index) => (
                                    <motion.div
                                        key={blog._id}
                                        className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="col-span-1 font-black">{blog._id}</div>
                                        <div className="col-span-4">
                                            <div className="font-black text-sm">{blog.title}</div>
                                            <div className="text-xs font-bold text-gray-500">
                                                {blog.views} views • {blog.comments} comments
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
                                        <div className="col-span-2 font-bold text-sm">{post.date}</div>
                                        <div className="col-span-1">
                                            <Badge
                                                className={`font-black border-2 border-black rounded-none ${
                                                    post.status === "Published" ? "bg-green-500" : "bg-orange-500"
                                                }`}
                                            >
                                                {post.status}
                                            </Badge>
                                        </div>
                                        <div className="col-span-2 flex gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-blue-500 text-white font-black border-2 border-black rounded-none hover:bg-blue-600"
                                            >
                                                <Eye className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-yellow-400 text-black font-black border-2 border-black rounded-none hover:bg-yellow-300"
                                            >
                                                <Edit className="w-3 h-3" />
                                            </Button>
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
                                                    <DropdownMenuItem className="font-black">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        DELETE
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </motion.div>
                                ))}
                            </div> */}

                            <div className="divide-y-4 divide-black">
                                {filteredPosts.map((blog, index) => (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={fetchBlogs}
                                        index={index + 1}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
