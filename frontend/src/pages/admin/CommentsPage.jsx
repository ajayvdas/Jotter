import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2, Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helper";

// const commentsData = [
//     {
//         id: 1,
//         blogTitle: "MANAGEMENT STYLE IN CORPORATE",
//         commenterName: "AJAY",
//         comment: "This is a good blog!",
//         date: "15/07/2025",
//         status: "approved",
//         blogId: 1,
//     },
//     {
//         id: 2,
//         blogTitle: "SECOND BLOG",
//         commenterName: "AJAY",
//         comment: "This comment is added for review",
//         date: "14/07/2025",
//         status: "approved",
//         blogId: 2,
//     },
//     {
//         id: 3,
//         blogTitle: "LEARNING NEW TECHNOLOGY",
//         commenterName: "SARAH JOHNSON",
//         comment: "Great insights on technology trends! This really helped me understand the current market.",
//         date: "13/07/2025",
//         status: "pending",
//         blogId: 3,
//     },
//     {
//         id: 4,
//         blogTitle: "STARTUP ROADMAP GUIDE",
//         commenterName: "MIKE CHEN",
//         comment: "Very detailed and practical advice. Will definitely implement these strategies.",
//         date: "12/07/2025",
//         status: "approved",
//         blogId: 4,
//     },
//     {
//         id: 5,
//         blogTitle: "DEVELOPER LIFESTYLE",
//         commenterName: "EMMA DAVIS",
//         comment: "This is spam content trying to promote external links.",
//         date: "11/07/2025",
//         status: "rejected",
//         blogId: 5,
//     },
// ];

export default function CommentsPage() {
    const { axios } = useAppContext();
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const handleApprove = (commentId) => {
    //     setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, status: "approved" } : comment)));
    // };

    // const handleReject = (commentId) => {
    //     setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, status: "rejected" } : comment)));
    // };

    // const handleDelete = (commentId) => {
    //     setComments(comments.filter((comment) => comment.id !== commentId));
    // };

    const fetchComments = async () => {
        try {
            const { data } = await axios.get("/api/admin/comments");
            if (data.success) {
                setComments(data.comments);
                console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updateCommentStatus = async (isApproved, commentId) => {
        try {
            const { data } = await axios.post("/api/admin/update-comment-status", {
                id: commentId,
                isApproved,
            });

            if (data.success) {
                toast.success(data.message);
                setComments((prev) =>
                    prev.map((comment) =>
                        comment._id === commentId ? { ...comment, status: isApproved ? "approved" : "rejected" } : comment
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const { data } = await axios.post("/api/admin/delete-comment", {
                id: commentId,
            });

            if (data.success) {
                toast.success(data.message);
                setComments(prev => prev.filter(comment => comment._id !== commentId))
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const filteredComments = comments?.filter((comment) => {
        const matchesFilter = filter === "all" || comment.status === filter;
        const matchesSearch =
            comment.blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-400";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "approved":
                return "APPROVED";
            case "pending":
                return "PENDING";
            case "rejected":
                return "REJECTED";
            default:
                return "UNKNOWN";
        }
    };

    return (
        <div className="flex-1 ml-20 md:ml-80">
            {/* Header */}
            <motion.header
                className="bg-white border-b-8 border-black p-6"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">COMMENTS</h1>
                        <p className="text-lg font-bold text-gray-600">Moderate your Jotter community</p>
                    </div>

                    {/* Desktop Filter Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <Button
                            onClick={() => setFilter("approved")}
                            className={`font-black border-4 border-black rounded-none px-6 py-3 transform hover:scale-105 transition-all ${
                                filter === "approved" ? "bg-green-500 text-white" : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            APPROVED
                        </Button>
                        <Button
                            onClick={() => setFilter("pending")}
                            className={`font-black border-4 border-black rounded-none px-6 py-3 transform hover:scale-105 transition-all ${
                                filter === "pending" ? "bg-yellow-400 text-white" : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            PENDING
                        </Button>
                        <Button
                            onClick={() => setFilter("rejected")}
                            className={`font-black border-4 border-black rounded-none px-6 py-3 transform hover:scale-105 transition-all ${
                                filter === "rejected" ? "bg-red-600 text-white" : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            REJECTED
                        </Button>
                        <Button
                            onClick={() => setFilter("all")}
                            className={`font-black border-4 border-black rounded-none px-6 py-3 transform hover:scale-105 transition-all ${
                                filter === "all" ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-200"
                            }`}
                        >
                            ALL
                        </Button>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    <div className="relative md:hidden">
                        <Button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className={`font-black border-4 border-black rounded-none px-6 py-3 transform hover:scale-105 transition-all ${
                                filter === "approved"
                                    ? "bg-green-500 text-white"
                                    : filter === "pending"
                                    ? "bg-yellow-400 text-black"
                                    : filter === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "bg-blue-500 text-white"
                            }`}
                        >
                            {filter.toUpperCase()}
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>

                        {dropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white border-4 border-black rounded-none z-50 min-w-full">
                                <Button
                                    onClick={() => {
                                        setFilter("approved");
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full font-black border-none rounded-none px-6 py-3 bg-white text-black hover:bg-gray-200 text-left justify-start"
                                >
                                    APPROVED
                                </Button>
                                <Button
                                    onClick={() => {
                                        setFilter("pending");
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full font-black border-none rounded-none px-6 py-3 bg-white text-black hover:bg-gray-200 text-left justify-start border-t-2 border-black"
                                >
                                    PENDING
                                </Button>
                                <Button
                                    onClick={() => {
                                        setFilter("rejected");
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full font-black border-none rounded-none px-6 py-3 bg-white text-black hover:bg-gray-200 text-left justify-start border-t-2 border-black"
                                >
                                    REJECTED
                                </Button>
                                <Button
                                    onClick={() => {
                                        setFilter("all");
                                        setDropdownOpen(false);
                                    }}
                                    className="w-full font-black border-none rounded-none px-6 py-3 bg-white text-black hover:bg-gray-200 text-left justify-start border-t-2 border-black"
                                >
                                    ALL
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.header>

            <div className="p-8">
                {/* Comments Table Header */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-4 border-black rounded-none gap-0 py-0">
                        <CardHeader className="bg-blue-500 border-b-4 border-black py-6">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-black text-white flex items-center">
                                    <MessageSquare className="w-6 h-6 mr-2" />
                                    BLOG COMMENTS
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 bg-white">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 p-6 bg-gray-100 border-b-4 border-black font-black text-sm">
                                <div className="col-span-1">#</div>
                                <div className="col-span-5">BLOG TITLE & COMMENT</div>
                                <div className="col-span-2">DATE</div>
                                <div className="col-span-2">STATUS</div>
                                <div className="col-span-2">ACTIONS</div>
                            </div>

                            {/* Table Rows */}
                            {filteredComments.map((comment, index) => (
                                <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    // whileHover={{ scale: 1.01 }}
                                    className="border-b-4 border-black hover:bg-gray-50"
                                >
                                    <div className="grid grid-cols-12 gap-4 p-6 items-center">
                                        {/* ID */}
                                        <div className="col-span-1">
                                            <p className="font-black text-lg">{index + 1}</p>
                                        </div>

                                        {/* Blog Title & Comment */}
                                        <div className="col-span-5">
                                            <div className="space-y-2">
                                                <p className="font-black">
                                                    BLOG:{" "}
                                                    <span className="text-blue-600 text-sm">{comment.blog.title}</span>
                                                </p>
                                                <p className="font-black text-sm">
                                                    NAME: <span className="text-red-500">{comment.name}</span>
                                                </p>
                                                <p className="font-bold text-gray-700 text-sm">
                                                    Comment: {comment.content}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-2">
                                            <p className="font-black text-lg">{formatDate(comment.createdAt)}</p>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-2">
                                            <Badge
                                                className={`${getStatusColor(
                                                    comment.status
                                                )} text-white font-black border-4 border-black rounded-none px-4 py-2`}
                                            >
                                                {getStatusText(comment.status)}
                                            </Badge>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-2">
                                            <div className="flex gap-2">
                                                {comment.status !== "approved" && (
                                                    <Button
                                                        onClick={() => updateCommentStatus(true, comment._id)}
                                                        className="bg-green-500 text-white font-black border-4 border-black rounded-none p-2 hover:bg-green-600 transform hover:scale-110 transition-all"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                {comment.status !== "rejected" && (
                                                    <Button
                                                        onClick={() => updateCommentStatus(false, comment._id)}
                                                        className="bg-red-500 text-white font-black border-4 border-black rounded-none p-2 hover:bg-red-600 transform hover:scale-110 transition-all"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() => deleteComment(comment._id)}
                                                    className="bg-yellow-400 text-black font-black border-4 border-black rounded-none p-2 hover:bg-yellow-300 transform hover:scale-110 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
