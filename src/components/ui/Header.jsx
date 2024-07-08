import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Type } from "lucide-react";


function Header() {

    const { loggedInUser, logOut, loading } = useContext(AuthContext);
    const { toast } = useToast();

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


    return (
        <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14">
            <div>
                <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
            </div>
            <nav>
                <ul className="flex gap-2">
                    <li><Link to="/">Home</Link></li>
                    {/* <li><Link to="/about">About</Link></li> */}
                    {/* <li><Link to="/contact">Contact Us</Link></li> */}
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
        </header>
    );



    // return (
    //     <header className="px-4 flex justify-between items-center h-14">
    //         <div>
    //             <Link>Logo</Link>
    //         </div>
    //         <nav>
    //             <ul className="flex gap-2">
    //                 <li><Link to="/about">About</Link></li>
    //                 <li><Link to="/contact">Contact Us</Link></li>
    //                 <li><Link to="/task">Task</Link></li>
    //                 <li><Link to="/auth/login">Login</Link></li>
    //                 <li><Link to="/auth/register">Register</Link></li>
    //             </ul>

    //         </nav>
    //         <div className="flex items-center gap-1">
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger> <Avatar className="h-8 w-8">
    //                     <AvatarImage src="https://github.com/shadcn.png" />
    //                     <AvatarFallback>CN</AvatarFallback>
    //                 </Avatar></DropdownMenuTrigger>
    //                 <DropdownMenuContent>
    //                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>Profile</DropdownMenuItem>
    //                     <DropdownMenuItem>Logout</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //             <ModeToggle />
    //         </div>
    //     </header>
    // )

}

export default Header