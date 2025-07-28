import fs from "fs";
import { catchAsync } from "../utils/catchAsync.js";
import Blog from "../models/Blog.js";
import imageKit from "../configs/imageKit.js";
import main from "../configs/gemini.js";
import { getRandomColour } from "../utils/getRandomColour.js";
import Comment from "../models/Comment.js";

export const addBlog = catchAsync(async (req, res) => {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image to imagekit
    const response = await imageKit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs",
    });

    // Optimization through image URL transformation
    const optimizedImageUrl = imageKit.url({
        path: response.filePath,
        transformation: [
            { quality: "auto" }, // Auto compression
            { format: "webp" }, // Convert to modern format
            { width: "1280" }, // Width resizing
        ],
    });

    const image = optimizedImageUrl;

    const color = getRandomColour([
        "bg-yellow-400",
        "bg-blue-500",
        "bg-red-500",
        "bg-yellow-400",
        "bg-blue-500",
        "bg-red-500",
        "bg-yellow-400",
        "bg-blue-500",
        "bg-red-500",
    ]);

    await Blog.create({ title, subTitle, description, category, isPublished, image, color });

    res.json({ success: true, message: "Blog added successfully" });
});

export const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
});

export const getBlogById = catchAsync(async (req, res) => {
    const { blogId } = req.params;
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc:{ views: 1 } }, // increment views by 1
        { new: true }
    );

    if (!blog) {
        return res.json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
});

export const deleteBlogById = catchAsync(async (req, res) => {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
});

export const togglePublish = catchAsync(async (req, res) => {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
});

export const addComment = catchAsync(async (req, res) => {
    const { blog, name, content } = req.body;

    await Comment.create({ blog, name, content });

    res.json({ success: true, message: "Comment added for review" });
});

export const getBlogComments = catchAsync(async (req, res) => {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true });
    res.json({ success: true, comments });
});

export const generateContent = catchAsync(async (req, res) => {
    const { prompt } = req.body;
    const content = await main(prompt + "Generate a blog content for this topic in simple text format");
    res.json({ success: true, content });
});
