import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import { catchAsync } from "../utils/catchAsync.js";

export const adminLogin = catchAsync(async (req, res) => {
    console.log("Admin route hit");
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
});

// export const getAllBlogsAdmin = catchAsync(async (req, res) => {
//     const blogs = await Blog.find({}).sort({ createdAt: -1 });

//     res.json({ success: true, blogs });
// });

export const getAllBlogsAdmin = catchAsync(async (req, res) => {
    const blogs = await Blog.aggregate([
        {
            $lookup: {
                from: "comments", // Make sure this matches your actual MongoDB collection name
                localField: "_id",
                foreignField: "blog",
                as: "comments",
            },
        },
        {
            $addFields: {
                totalApprovedComments: {
                    $size: {
                        $filter: {
                            input: "$comments",
                            as: "comment",
                            cond: { $eq: ["$$comment.isApproved", true] },
                        },
                    },
                },
            },
        },
        {
            $project: {
                comments: 0, // Hide full comments array from response
            },
        },
        {
            $sort: { createdAt: -1 },
        },
    ]);

    res.json({ success: true, blogs });
});

export const getAllComments = catchAsync(async (req, res) => {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comments });
});

export const getDashboard = catchAsync(async (req, res) => {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
        blogs,
        comments,
        drafts,
        users: 1234,
        recentBlogs,
    };
    res.json({ success: true, dashboardData });
});

export const deleteCommentById = catchAsync(async (req, res) => {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
});

// export const approveCommentById = catchAsync(async (req, res) => {
//     const { id } = req.body;

//     await Comment.findByIdAndUpdate(id, { isApproved: true });

//     res.json({ success: true, message: "Comment approved successfully" });
// });

export const updateCommentStatusById = catchAsync(async (req, res) => {
    const { id, isApproved } = req.body;

    // Validate input
    if (typeof isApproved !== "boolean") {
        return res.status(400).json({ success: false, message: "Invalid approval status" });
    }

    const status = isApproved ? "approved" : "rejected";

    const updatedComment = await Comment.findByIdAndUpdate(id, { isApproved, status }, { new: true });

    if (!updatedComment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
    }

    const action = isApproved ? "approved" : "rejected";
    res.json({ success: true, message: `Comment ${action} successfully` });
});
