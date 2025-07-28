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

const blogPosts = [
    {
        id: 1,
        title: "A detailed step by step guide to manage your lifestyle",
        category: "Lifestyle",
        status: "Published",
        date: "Mon Apr 21 2025",
        views: 1250,
        comments: 23,
    },
    {
        id: 2,
        title: "How to create an effective startup roadmap or ideas",
        category: "Startup",
        status: "Published",
        date: "Mon Apr 21 2025",
        views: 890,
        comments: 15,
    },
    {
        id: 3,
        title: "Learning new technology to boost your career in software",
        category: "Technology",
        status: "Draft",
        date: "Mon Apr 21 2025",
        views: 0,
        comments: 0,
    },
    {
        id: 4,
        title: "Tips for getting the most out of apps and software",
        category: "Technology",
        status: "Published",
        date: "Mon Apr 21 2025",
        views: 2100,
        comments: 45,
    },
    {
        id: 5,
        title: "Enhancing your skills and capturing memorable moments",
        category: "Lifestyle",
        status: "Published",
        date: "Mon Apr 21 2025",
        views: 750,
        comments: 12,
    },
];

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
    console.log(dashboardData)

    const logout = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        setToken(null);
        navigate("/");
    };

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
                        <h1 className="text-4xl font-black">ADMIN DASHBOARD</h1>
                        <p className="text-lg font-bold text-gray-600">Manage your Jotter blog dashboard</p>
                    </div>
                    <Button
                        onClick={logout}
                        className="bg-red-500 rounded-none text-white font-black border-4 border-black hover:bg-red-600 transform hover:scale-105 transition-all"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        LOGOUT
                    </Button>
                </div>
            </motion.header>

            <div className="p-6">
                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
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
                            <Card className="border-4 border-black rounded-none overflow-hidden pt-0">
                                <CardContent className="p-0">
                                    <div className={`${stat.color} p-4 border-b-4 border-black`}>
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="p-4 bg-white">
                                        <div className="text-3xl font-black mb-1">{stat.value}</div>
                                        <div className="text-sm font-black text-gray-600">{stat.title}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Blog Management Section */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-4 border-black rounded-none py-0">
                        <CardHeader className="bg-blue-500 border-b-4 border-black py-6">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-black text-white flex items-center">
                                    <FileText className="w-6 h-6 mr-2" />
                                    LATEST BLOGS
                                </CardTitle>
                                <Button 
                                    onClick={() =>navigate('/admin/addblog2')}
                                    className="bg-yellow-400 text-black font-black border-2 border-black hover:bg-yellow-300">
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
                            <div className="divide-y-4 divide-black">
                                {filteredPosts.map((blog, index) => (
                                    <BlogTableItem 
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs ={fetchDashboard}
                                        index = {index + 1}
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
