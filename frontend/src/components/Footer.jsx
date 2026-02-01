import { Github, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-white border-t-8 border-black py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-6 h-6 bg-yellow-400 border-2 border-black transform rotate-45"></div>
                            <div className="w-6 h-6 bg-blue-500 border-2 border-black"></div>
                            <span className="text-xl font-black">JOTTER</span>
                        </div>
                        <p className="font-bold text-sm">
                            Explore thoughts shaped by artificial intelligence. Curated content, real-time ideas, and a smarter way
                            to read, learn, and grow. All in one place.
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
                            <Button 
                                aria-label="Follow us on Facebook"
                                className="bg-blue-600 text-white border-2 border-black rounded-none p-2 hover:bg-blue-700"
                            >
                                <Facebook className="w-5 h-5" />
                            </Button>
                            <Button 
                                aria-label="Follow us on Twitter"
                                className="bg-red-500 text-white border-2 border-black rounded-none p-2 hover:bg-red-600"
                            >
                                <Twitter className="w-5 h-5" />
                            </Button>
                            <Button 
                                aria-label="Follow us on GitHub"
                                className="bg-yellow-400 text-black border-2 border-black rounded-none p-2 hover:bg-yellow-300"
                            >
                                <Github className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t-4 border-black mt-8 pt-8 text-center">
                    <p className="font-black">Copyright 2025 © Jotter - All Right Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
