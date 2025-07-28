// Layout

import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <Outlet />
        </div>
            

    );
}