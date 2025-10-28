import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import { globalErrorController } from "./controllers/errorController.js";

const app = express();

await connectDB();

// Middlewares
app.use(cors({
  origin: 'https://jotter-t65g.vercel.app' // Replace with your client-side domain
}));
app.use(express.json());
// Routes
app.use('/api/admin', adminRouter)
app.use("/api/blog", blogRouter);

app.use(globalErrorController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

export default app;
