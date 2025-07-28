import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="flex max-w-md mx-auto mb-8">
            <Input
                placeholder="Search for blogs"
                value={searchTerm}
                onChange={onSearchChange}
                className="border-4 border-black rounded-none font-bold text-lg"
            />
            <Button className="bg-blue-500 text-white font-black border-4 border-black border-l-0 rounded-none hover:bg-blue-600">
                <Search className="w-5 h-5" />
            </Button>
        </div>
    );
};