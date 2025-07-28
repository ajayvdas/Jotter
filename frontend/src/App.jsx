import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Layout from "./pages/admin/Layout";
import DashboardPage from "./pages/admin/DashboardPage";
import AddBlogPage from "./pages/admin/AddBlogPage";
import ListBlogPage from "./pages/admin/ListBlogPage";
import LoginPage from "./pages/admin/LoginPage";
// import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import CommentsPage from "./pages/admin/CommentsPage";

function App() {
    const { token } = useAppContext();
    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/admin" element={token ? <Layout /> : <LoginPage />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="addBlog" element={<AddBlogPage />} />
                    <Route path="listBlog" element={<ListBlogPage />} />
                    <Route path="comments" element={<CommentsPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
