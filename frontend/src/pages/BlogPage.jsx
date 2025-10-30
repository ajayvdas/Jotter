import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Facebook, Twitter, Share, User, MessageSquare, Loader, Calendar, Reply, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/helper";

export default function BlogPage() {
    const { id } = useParams();
    const { axios, navigate } = useAppContext();
    const [data, setData] = useState(null);
    const [commentorName, setCommentorName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`/api/blog/${id}`);
            const { success, blog, message } = response.data;

            if (success) {
                setData(blog);
            } else {
                toast.error(message || "Failed to fetch blog data.");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong.";
            toast.error(errorMsg);
            console.error("Error fetching blog data:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post("/api/blog/comments", { blogId: id });
            
            data.success ? setComments(data.comments) : toast.error(data.message);
        } catch (error) {
            console.log("error in fetchComments is: ", error);
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { data } = await axios.post("/api/blog/add-comment", {
                blog: id,
                name: commentorName,
                content: commentText,
            });
            
            if (data.success) {
                toast.success(data.message);
                setCommentorName("");
                setCommentText("");
                // Refresh comments after adding
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    return data ? (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <motion.header
                className="bg-red-600 border-b-8 border-black"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(-1)}>
                                <span className="text-2xl font-black text-white tracking-wider">JOTTER.</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate("/")}
                            className="bg-yellow-400 text-black rounded-none font-black border-4 border-black hover:bg-yellow-300 transform hover:scale-105 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            DASHBOARD
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Blog Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Blog Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="inline-block bg-blue-500 text-white px-4 py-2 font-black text-sm border-4 border-black mb-6 transform -rotate-1">
                        PUBLISHED ON {formatDate(data.createdAt)}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none transform hover:scale-105 transition-all">
                        {data.title}
                    </h1>

                    <p className="text-2xl font-bold mb-6 max-w-3xl mx-auto">{data.subTitle}</p>

                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <Badge className="bg-yellow-400 text-black font-black border-4 border-black rounded-none px-4 py-2 transform rotate-1">
                            <User className="w-4 h-4 mr-2" />
                            Michael Brown
                        </Badge>
                        <Badge className="bg-red-500 text-white font-black border-4 border-black rounded-none px-4 py-2 transform -rotate-1">
                            {data.category}
                        </Badge>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="relative transform hover:scale-102 transition-all">
                        <img
                            src={data.image || "/placeholder.svg"}
                            alt={data.title}
                            className="w-full max-w-4xl mx-auto h-96 md:h-[500px] object-cover border-8 border-black"
                        />
                    </div>
                </motion.div>

                {/* Blog Content */}
                <motion.div
                    className="max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="bg-white border-8 border-black p-8 md:p-12">
                        <p
                            className="mb-6 text-lg font-bold leading-relaxed text-gray-800"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </div>
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    className="max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="bg-white border-8 border-black">
                        <div className="bg-blue-500 border-b-8 border-black p-6">
                            <h3 className="text-3xl font-black text-white flex items-center">
                                <MessageSquare className="w-8 h-8 mr-4" />
                                COMMENTS ({comments.length})
                            </h3>
                        </div>

                        <div className="p-8">
                            <h4 className="text-2xl font-black mb-6 border-b-4 border-black pb-4">ADD YOUR COMMENT</h4>

                            <form onSubmit={addComment} className="space-y-6 mb-12">
                                <div>
                                    <label className="block font-black text-lg mb-2">NAME</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={commentorName}
                                        onChange={(e) => setCommentorName(e.target.value)}
                                        className="border-4 border-black rounded-none font-bold text-lg p-4"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div>
                                    <label className="block font-black text-lg mb-2">COMMENT</label>
                                    <Textarea
                                        placeholder="Write your Jotter comment here..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="min-h-[150px] border-4 border-black rounded-none font-bold text-lg p-4 resize-none"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-red-500 text-white font-black border-4 border-black rounded-none px-8 py-4 text-lg hover:bg-red-600 transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : (
                                        "SUBMIT COMMENT"
                                    )}
                                </Button>
                            </form>

                            {/* Comments Display */}
                            <div className="border-t-4 border-black pt-8">
                                <h4 className="text-2xl font-black mb-6 flex items-center">
                                    <MessageSquare className="w-6 h-6 mr-3" />
                                    ALL COMMENTS
                                </h4>

                                {comments.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 border-4 border-dashed border-gray-300">
                                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                        <h5 className="text-xl font-black text-gray-600 mb-2">NO COMMENTS YET</h5>
                                        <p className="font-bold text-gray-500">
                                            Be the first to share your Jotter thoughts!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-white border-4 border-black p-6">
                                        {/* Header */}
                                        <div className="bg-red-500 text-white p-4 mb-6 border-2 border-black">
                                            <h3 className="font-black text-xl uppercase tracking-wide">
                                                💬 COMMENTS ({comments.length})
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            {comments.map((comment, index) => (
                                                <motion.div
                                                    key={comment._id || index}
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * index }}
                                                    className="border-4 border-black bg-white p-4"
                                                >
                                                    <div className="flex items-start space-x-4 mb-3">
                                                        <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                                                            <User className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h5 className="font-black text-lg uppercase">
                                                                    {comment.name || "Anonymous User"}
                                                                </h5>
                                                                <div className="bg-black text-white px-2 py-1 border border-black">
                                                                    <Clock className="w-3 h-3 inline mr-1" />
                                                                    <span className="font-bold text-xs">
                                                                        {comment.createdAt
                                                                            ? formatDate(comment.createdAt)
                                                                            : "NOW"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-100 border-2 border-black p-3">
                                                                <p className="font-bold text-gray-800 leading-relaxed">
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Social Share */}
                <motion.div
                    className="max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <div className="bg-black text-white border-8 border-red-500 p-8">
                        <h4 className="text-2xl font-black mb-6 text-center">SHARE THIS JOTTER ARTICLE</h4>
                        <div className="flex justify-center space-x-4">
                            <Button className="bg-blue-500 text-white font-black border-4 border-white rounded-none p-4 hover:bg-blue-600 transform hover:scale-110 transition-all">
                                <Facebook className="w-6 h-6" />
                            </Button>
                            <Button className="bg-red-500 text-white font-black border-4 border-white rounded-none p-4 hover:bg-red-600 transform hover:scale-110 transition-all">
                                <Twitter className="w-6 h-6" />
                            </Button>
                            <Button className="bg-yellow-400 text-black font-black border-4 border-white rounded-none p-4 hover:bg-yellow-300 transform hover:scale-110 transition-all">
                                <Share className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t-8 border-black py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                {/* <div className="w-6 h-6 bg-yellow-400 border-2 border-black transform rotate-45"></div>
                                <div className="w-6 h-6 bg-blue-500 border-2 border-black"></div> */}
                                <span className="text-xl font-black">JOTTER</span>
                            </div>
                            <p className="font-bold text-sm">
                                Thank you for reading our blog. Stay tuned for more updates, insights, and stories that
                                inspire and inform your daily journey.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-black text-lg mb-4 border-b-2 border-black pb-2">QUICK LINKS</h3>
                            <ul className="space-y-2 font-bold">
                                <li>
                                    <a href="#" className="hover:text-red-500">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-red-500">
                                        Best Sellers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-red-500">
                                        Terms & Deals
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-red-500">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-red-500">
                                        FAQs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-black text-lg mb-4 border-b-2 border-black pb-2">NEED HELP?</h3>
                            <ul className="space-y-2 font-bold">
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Delivery Information
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Return & Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Payment Methods
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Track your Order
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-black text-lg mb-4 border-b-2 border-black pb-2">FOLLOW US</h3>
                            <div className="flex space-x-4">
                                <Button className="bg-blue-500 text-white border-2 border-black rounded-none p-2 hover:bg-blue-600">
                                    <Facebook className="w-5 h-5" />
                                </Button>
                                <Button className="bg-red-500 text-white border-2 border-black rounded-none p-2 hover:bg-red-600">
                                    <Twitter className="w-5 h-5" />
                                </Button>
                                <Button className="bg-yellow-400 text-black border-2 border-black rounded-none p-2 hover:bg-yellow-300">
                                    <Share className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t-4 border-black mt-8 pt-8 text-center">
                        <p className="font-black">Copyright 2025 © JOTTER - All Right Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
                <h2 className="text-2xl font-black">LOADING JOTTER CONTENT...</h2>
            </div>
        </div>
    );
}
