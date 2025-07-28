import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, Upload, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

export default function AddBlogPage() {
    const fileInputRef = useRef(null);
    const { axios, setToken, navigate } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const editorRef = useRef(); // This ref will point to the div where Quill is initialized
    const quillRef = useRef(null); // This ref will hold the Quill instance itself
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("Startup");
    const [isPublished, setIsPublished] = useState(false);

    const categories = [
        { value: "technology", text: "Technology" },
        { value: "startup", text: "Startup" },
        { value: "lifestyle", text: "Lifestyle" },
        { value: "finance", text: "Finance" },
        { value: "health", text: "Health" },
        { value: "education", text: "Education" },
    ];

    const generateContent = async () => {
        if (!title) return toast.error("Please enter a title");
        // if (!quillRef.current) return toast.error("Quill editor not initialized.");

        try {
            setLoading(true);
            const { data } = await axios.post("/api/blog/generate", { prompt: title });
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const logout = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        setToken(null);
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsAdding(true);
            const description = quillRef.current ? quillRef.current.root.innerHTML : "";
            console.log("description is:", description);

            if (!description) {
                toast.error("Blog content cannot be empty.");
                setIsAdding(false);
                return;
            }

            const blog = {
                title,
                subTitle,
                description,
                category,
                isPublished,
            };

            const formData = new FormData();
            formData.append("blog", JSON.stringify(blog));
            formData.append("image", image);

            const { data } = await axios.post("/api/blog/add", formData);
            if (data.success) {
                toast.success(data.message);
                setImage(false);
                setTitle("");
                setSubTitle("");
                if (quillRef.current) {
                    quillRef.current.root.innerHTML = "";
                }
                setCategory("Startup");
                setIsPublished(false)
            } else {
                toast.error(data.message);
                console.log("data.message: ", data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: "snow" });
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

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
                        <h1 className="text-4xl font-black">CREATE NEW BLOG</h1>
                        <p className="text-lg font-bold text-gray-600">Write something nice and beautiful</p>
                    </div>
                    <Button
                        onClick={logout}
                        className="bg-red-500 text-white font-black border-4 rounded-none border-black hover:bg-red-600 transform hover:scale-105 transition-all"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        LOGOUT
                    </Button>
                </div>
            </motion.header>

            <div className="max-w-4xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <form onSubmit={handleSubmit}>
                        <Card className="border-4 border-black rounded-none py-0">
                            <CardHeader className="bg-blue-500 border-b-4 border-black">
                                <CardTitle className="text-xl font-black text-white py-6">Blog Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                        <Input
                                            placeholder="Enter your blog title..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="border-4 border-black rounded-none font-bold text-lg"
                                        />
                                    </div>

                                    {/* Subtitle */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                        <Input
                                            placeholder="Enter your blog subtitle..."
                                            onChange={(e) => setSubTitle(e.target.value)}
                                            value={subTitle}
                                            className="border-4 border-black rounded-none font-bold text-lg"
                                        />
                                    </div>

                                    {/* Featured Image */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Featured Image
                                        </label>
                                        {/* This is the div whose width we want to match */}
                                        <div className="border-4 border-dashed border-black rounded-none p-6 font-bold text-center">
                                            {image ? (
                                                <div className="relative inline-block">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt="Featured"
                                                        className="max-w-full h-48 object-cover rounded-lg border border-gray-200"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => setImage(null)}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 h-8 w-8"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="text-center cursor-pointer" onClick={handleDivClick}>
                                                    <Upload className="w-12 h-12 mx-auto mb-4" />
                                                    <p className="font-black text-lg mb-2">DRAG & DROP YOUR IMAGE</p>
                                                    <p className="font-bold text-gray-600 mb-4">or click to browse</p>
                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        ref={fileInputRef}
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                        hidden
                                                        required
                                                    />
                                                    <Button className="bg-black text-white font-black border-4 border-black hover:bg-gray-800 rounded-none">
                                                        CHOOSE FILE
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                        <Select value={category} onValueChange={(value) => setCategory(value)}>
                                            <SelectTrigger className="border-4 border-black rounded-none font-bold">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent className="border-4 border-black rounded-none">
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.value}
                                                        value={category.value}
                                                        className="font-bold"
                                                    >
                                                        {category.text}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                                        {/* This new wrapper div gets the border and width */}
                                        <div className="border-4 border-black rounded-none">
                                            <div className=" relative">
                                                {/* Add w-full to the div that holds the Quill editor */}
                                                <div
                                                    ref={editorRef}
                                                    style={{ height: "200px", backgroundColor: "white" }}
                                                    className="w-full"
                                                ></div>
                                                {loading && (
                                                    <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
                                                        <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={generateContent}
                                                    disabled={loading}
                                                    className="bg-black text-white border-4 border-black font-black hover:bg-gray-800 rounded-none absolute bottom-1 right-2 ml-2 cursor-pointer"
                                                >
                                                    Generate with AI
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Published Checkbox */}
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="isPublished"
                                            checked={isPublished}
                                            onChange={(e) => setIsPublished(e.target.checked)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-2 font-bold border-black rounded-none focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="isPublished" className="font-bold text-sm cursor-pointer">
                                            Publish immediately
                                        </label>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-white text-black hover:text-white font-black border-4 border-black hover:bg-gray-800 rounded-none"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isAdding}
                                            className="bg-black text-white  border-4 border-black hover:bg-gray-800 rounded-none"
                                        >
                                            {isAdding ? "Adding..." : "Add Blog"}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
