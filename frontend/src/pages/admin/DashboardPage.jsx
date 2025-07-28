// dashboard

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Plus,
    FileText,
    MessageSquare,
    Users,
    Settings,
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
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
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

export default function DashboardPage() {
    const { axios, setToken, navigate } = useAppContext();
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        users: 0,
        recentBlogs: [],
    });
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get("/api/admin/dashboard");
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const stats = [
        { title: "TOTAL BLOGS", value: dashboardData.blogs, color: "bg-red-500", icon: FileText },
        { title: "COMMENTS", value: dashboardData.comments, color: "bg-blue-500", icon: MessageSquare },
        { title: "DRAFTS", value: dashboardData.drafts, color: "bg-yellow-400", icon: Edit },
        { title: "USERS", value: dashboardData.users, color: "bg-red-500", icon: Users },
    ];

    // Using dummy blogPosts data
    // const filteredPosts = blogPosts.filter(
    //     (post) =>
    //         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         post.category.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // Using backend data
    const filteredPosts = dashboardData.recentBlogs.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(dashboardData);

    const logout = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        setToken(null);
        navigate("/");
    };

    return (
        <div className="flex-1 ml-20 md:ml-80">
    <motion.header
        className="bg-white border-b-4 md:border-b-8 border-black p-3 sm:p-4 md:p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black">ADMIN DASHBOARD</h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-bold">
                    Manage your Jotter blog dashboard
                </p>
            </div>
            <Button
                onClick={logout}
                className="
                    bg-red-500 rounded-none text-white font-black border-2 md:border-4 border-black
                    hover:bg-red-600 transform hover:scale-105 transition-all
                    px-2 py-1 text-xs
                    sm:px-3 sm:py-2 sm:text-sm
                    md:px-4 md:py-2 md:text-base
                    lg:px-5 lg:py-3 lg:text-lg
                    w-full sm:w-auto
                "
            >
                <LogOut className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                LOGOUT
            </Button>
        </div>
    </motion.header>

    <div className="p-3 sm:p-4 md:p-6">
        {/* Stats Cards */}
        <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    whileHover={{ scale: 1.05, rotate: Math.random() * 2 - 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Card className="border-2 md:border-4 border-black rounded-none overflow-hidden pt-0">
                        <CardContent className="p-0">
                            <div className={`${stat.color} p-2 sm:p-3 md:p-4 border-b-2 md:border-b-4 border-black`}>
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div className="p-2 sm:p-3 md:p-4 bg-white">
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm font-black text-gray-600">{stat.title}</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>

        {/* Blog Management Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-2 md:border-4 border-black rounded-none py-0">
                <CardHeader className="bg-blue-500 border-b-2 md:border-b-4 border-black py-3 sm:py-4 md:py-6">
                    <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-black text-white flex items-center">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                            LATEST BLOGS
                        </CardTitle>
                        <Button
                            onClick={() => navigate("/admin/addblog2")}
                            className="
                                bg-yellow-400 text-black font-black border-2 border-black hover:bg-yellow-300
                                px-2 py-1 text-xs
                                sm:px-3 sm:py-2 sm:text-sm
                                md:px-4 md:py-2 md:text-base
                                w-full sm:w-auto
                            "
                        >
                            <Plus className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" />
                            NEW BLOG
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 bg-white">
                    {/* Search and Filter */}
                    <div className="p-3 sm:p-4 border-b-2 md:border-b-4 border-black bg-gray-50">
                        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-col sm:flex-row">
                            <div className="flex-1 flex">
                                <Input
                                    placeholder="Search blogs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-2 md:border-4 border-black rounded-none font-bold text-sm sm:text-base"
                                />
                                <Button className="bg-black text-white font-black border-2 md:border-4 border-black border-l-0 rounded-none px-2 sm:px-3">
                                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </div>
                            <Button className="bg-white text-black font-black border-2 md:border-4 border-black hover:bg-gray-100 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2">
                                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                FILTER
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Table Header */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b-2 md:border-b-4 border-black font-black text-xs sm:text-sm">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">BLOG TITLE</div>
                        <div className="col-span-2">CATEGORY</div>
                        <div className="col-span-2">DATE</div>
                        <div className="col-span-1">STATUS</div>
                        <div className="col-span-2">ACTIONS</div>
                    </div>

                    {/* Tablet Table Header */}
                    <div className="hidden md:grid lg:hidden grid-cols-11 gap-3 p-4 bg-gray-100 border-b-2 md:border-b-4 border-black font-black text-xs sm:text-sm">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">BLOG TITLE</div>
                        <div className="col-span-2">CATEGORY</div>
                        <div className="col-span-2">STATUS</div>
                        <div className="col-span-2">ACTIONS</div>
                    </div>

                    {/* Mobile Table Header */}
                    <div className="md:hidden grid grid-cols-8 gap-1 p-3 bg-gray-100 border-b-2 border-black font-black text-xs">
                        <div className="col-span-4">TITLE</div>
                        <div className="col-span-2">CATEGORY</div>
                        <div className="col-span-1">STATUS</div>
                        <div className="col-span-1">ACTIONS</div>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y-2 md:divide-y-4 divide-black">
                        {filteredPosts.map((blog, index) => (
                            <BlogTableItem
                                key={blog._id}
                                blog={blog}
                                fetchBlogs={fetchDashboard}
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
