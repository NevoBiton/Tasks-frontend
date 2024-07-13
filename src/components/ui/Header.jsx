import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Type, Menu, X } from "lucide-react"; // Import Menu and X icons
import MobileDropdownComponent from "../hand/MobileDropdownComponent";

function Header() {
    const { loggedInUser, logOut, loading } = useContext(AuthContext);
    const { toast } = useToast();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    function logOutHandler() {
        logOut();
        toast({
            title: "Logged Out",
            description: "You have logged Out.",
            status: "success",
        });
    }

    if (loading) {
        return (
            <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14">
                <div className="text-white">
                    <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
                </div>
                <div className="flex items-center gap-1">
                    <ModeToggle />
                </div>
            </header>
        );
    }

    return (
        <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14">
            <div className="text-white flex items-center gap-4">
                <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isDropdownOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            <nav className="hidden lg:flex text-white">
                <ul className="flex gap-2">
                    <li><Link to="/">Home</Link></li>
                    {loggedInUser ? (
                        <>
                            <li><Link to="/task">Tasks</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/auth/login">Login</Link></li>
                            <li><Link to="/auth/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="flex items-center gap-1">
                {loggedInUser && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{getFirstLetter(loggedInUser.firstName)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={logOutHandler}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <ModeToggle />
            </div>
            {/* Mobile Dropdown Menu */}
            <MobileDropdownComponent
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen} />
        </header>
    );
}

export default Header;













