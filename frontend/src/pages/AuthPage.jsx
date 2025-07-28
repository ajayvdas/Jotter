// auth/AuthPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User,
    Lock,
    Mail,
    Eye,
    EyeOff,
    ArrowRight,
    Zap,
    Shield,
    Rocket,
} from "lucide-react";

const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`font-black border-4 border-black rounded-none px-8 py-3 transition-all ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={`border-4 border-black rounded-none font-bold pl-12 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white ${className}`}
            {...props}
        />
    );
};

const Checkbox = ({ id, checked, onCheckedChange, className = "", ...props }) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className={`h-5 w-5 appearance-none border-2 border-black rounded-none bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer ${className}`}
            {...props}
        />
    );
};

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
        agreeTerms: false,
    });

    useEffect(() => {
        const link = document.createElement("link");
        link.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        document.body.style.fontFamily = "'Inter', sans-serif";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.head.removeChild(link);
            document.body.style.fontFamily = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) return;

        if (!isLogin) {
            if (!formData.name) return;
            if (formData.password !== formData.confirmPassword) return;
            if (!formData.agreeTerms) return;
        }

        console.log("Form submitted:", formData);
    };

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
            agreeTerms: false,
        });
    };

    return (
        <div className="h-screen w-screen bg-white flex items-center justify-center p-4 font-inter overflow-hidden">
            <div className="w-full max-w-4xl mx-auto overflow-hidden">
                <motion.div
                    className="h-full max-h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-8 border-black bg-white  shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className="bg-red-500 p-8 md:p-12 flex flex-col justify-center border-b-8 lg:border-b-0 lg:border-r-8 border-black text-white"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-8">
                                <span className="text-2xl md:text-3xl font-black tracking-wider drop-shadow-lg">
                                    JOTTER
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-none drop-shadow-lg">
                                WELCOME TO
                                <br />
                                <span className="text-yellow-400">JOTTER</span>
                                <br />
                                BLOGGING
                            </h1>
                            <p className="text-lg md:text-xl font-bold mb-8 drop-shadow-md">
                                JOIN THE AI POWERED BLOGGING PLATFORM TO SHOWCASE YOUR THOUGHTS
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-white border-2 border-black"></div>
                                    <span className="font-black text-lg flex items-center">
                                        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                                        UNLIMITED POSTS
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-yellow-400 border-2 border-black"></div>
                                    <span className="font-black text-lg flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-blue-500" />
                                        JOTTER DESIGN
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-blue-500 border-2 border-black"></div>
                                    <span className="font-black text-lg flex items-center">
                                        <Rocket className="w-5 h-5 mr-2 text-yellow-400" />
                                        FULL CONTROL
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="p-8 md:p-12 flex items-center justify-center bg-white overflow-y-auto"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-full max-w-md">
                            {/* Form content here */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field (Register only) */}
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <label htmlFor="name" className="block font-black text-sm mb-2">
                                            FULL NAME
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="pl-12 py-3"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block font-black text-sm mb-2">
                                        EMAIL ADDRESS
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="pl-12 py-3"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block font-black text-sm mb-2">
                                        PASSWORD
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            className="pl-12 pr-12 py-3"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field (Register only) */}
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <label htmlFor="confirmPassword" className="block font-black text-sm mb-2">
                                            CONFIRM PASSWORD
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                className="pl-12 pr-12 py-3"
                                                required={!isLogin}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                aria-label={
                                                    showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Checkboxes */}
                                <motion.div
                                    className="space-y-3"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    {isLogin && (
                                        <motion.div
                                            className="flex items-center space-x-3"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Checkbox
                                                id="remember"
                                                checked={formData.rememberMe}
                                                onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                                                // Note: 'required' attribute on checkbox is not standard for HTML form validation.
                                                // Validation for this should be handled in handleSubmit if strictly necessary.
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="font-bold text-sm cursor-pointer select-none"
                                            >
                                                Remember me
                                            </label>
                                        </motion.div>
                                    )}

                                    {!isLogin && (
                                        <motion.div
                                            className="flex items-center space-x-3"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Checkbox
                                                id="terms"
                                                checked={formData.agreeTerms}
                                                onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                                                // Validation for 'agreeTerms' is handled in handleSubmit
                                            />
                                            <label htmlFor="terms" className="font-bold text-sm cursor-pointer select-none">
                                                I agree to the Terms & Conditions
                                            </label>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <motion.button
                                        type="submit" // Changed to type="submit" to trigger form onSubmit
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black border-4 border-black rounded-none py-3 text-lg hover:from-yellow-300 hover:to-yellow-400 shadow-lg flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-white"
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span>{isLogin ? "LOGIN NOW" : "CREATE ACCOUNT"}</span>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </motion.button>
                                </motion.div>

                                {/* Forgot Password (Login only) */}
                                {isLogin && (
                                    <motion.div
                                        className="text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 1 }}
                                    >
                                        <motion.button
                                            type="button"
                                            className="font-bold text-red-500 hover:text-red-600 underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            Forgot Password?
                                        </motion.button>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
