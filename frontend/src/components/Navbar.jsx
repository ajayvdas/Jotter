import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react"
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
    const { navigate } = useAppContext()

    return (
        <>
            {/* Header */}
            <motion.header
                className="bg-red-600 border-b-8 border-black"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span 
                                className="text-2xl font-black text-white tracking-wider cursor-pointer"
                                onClick={() => navigate('/')}
                            >JOTTER.</span>
                        </div>
                        <Button 
                            onClick = {() => navigate('/admin')}
                            className="bg-yellow-400 text-black font-black border-2 rounded-none border-black hover:bg-yellow-300 transform hover:scale-105 transition-all"
                        >
                            <User className="w-4 h-4 mr-2" />
                            LOGIN
                        </Button>
                    </div>
                </div>
            </motion.header>
        </>
    );
}
