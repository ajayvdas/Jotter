// sidebar
// sidebar

import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus, FileText, MessageSquare, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const sidebarItems = [
    { path: "/admin", icon: LayoutDashboard, label: "DASHBOARD", end: true },
    { path: "/admin/addBlog", icon: Plus, label: "ADD BLOGS" },
    { path: "/admin/listBlog", icon: FileText, label: "BLOG LISTS" },
    { path: "/admin/comments", icon: MessageSquare, label: "COMMENTS" },
];

export default function Sidebar() {
    const { navigate } = useAppContext()
    return (
        <motion.aside
            className="w-20 md:w-80 bg-black border-r-8 border-red-500 fixed h-screen top-0"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-3 md:p-6">
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center space-x-2 mb-8 cursor-pointer justify-center md:justify-start">
                    <span className="text-xl font-black text-white tracking-wider md:hidden">J</span>
                    <span className="text-2xl font-black text-white tracking-wider hidden md:block">JOTTER</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        <NavLink
                            key={item.path}
                            end={item.end}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center space-x-3 justify-center md:justify-start md:space-x-3 p-3 md:p-4 font-black text-left border-2 border-white transition-all ${
                                    isActive
                                        ? "bg-red-500 text-white transform scale-102"
                                        : "text-white hover:bg-gray-800 hover:transform hover:scale-102"
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="hidden md:inline-block">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </motion.aside>
    );
}