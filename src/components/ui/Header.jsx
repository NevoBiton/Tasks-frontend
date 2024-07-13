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
import { Skeleton } from "@/components/ui/skeleton"


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

    console.log(loggedInUser);

    if (loading) {
        return (
            <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14 ">
                <div className="text-white">
                    <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
                </div>
                <nav className="text-white">
                    <ul className="flex gap-2">
                        <li>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-1">
                    <ModeToggle />
                </div>
            </header>

        )

    }

    return (
        <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14 ">
            <div className="text-white">
                <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
            </div>
            <nav className="text-white">
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

}

export default Header

// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ModeToggle } from "./ModeToggle";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useToast } from "@/components/ui/use-toast";
// import { Type } from "lucide-react";

// function Header() {
//     const { loggedInUser, logOut, loading } = useContext(AuthContext);
//     const { toast } = useToast();
//     const [isLoading, setIsLoading] = useState(true);

//     const getFirstLetter = (name) => {
//         return name ? name.charAt(0).toUpperCase() : '';
//     };

//     const logOutHandler = () => {
//         logOut();
//         toast({
//             title: "Logged Out",
//             description: "You have logged out.",
//             status: "success",
//         });
//     };

//     useEffect(() => {
//         if (!loading) {
//             setIsLoading(false);
//         }
//     }, [loading]);

//     console.log(loggedInUser);

//     if (isLoading) {
//         return (
//             <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14">
//                 <div className="text-white">
//                     <div className="flex items-center">
//                         <Type size={26} />
//                         <span className="text-xl ml-1">as<span className="text-3xl">K</span>ingdom</span>
//                     </div>
//                 </div>
//                 <nav className="text-white">
//                     <ul className="flex gap-2">
//                         <li><Link to="/">Home</Link></li>
//                     </ul>
//                 </nav>
//                 <div className="flex items-center gap-1">
//                     <ModeToggle />
//                 </div>
//             </header>
//         );
//     }

//     return (
//         <header className="shadow-md px-4 bg-nav-bar dark:bg-nav-bar flex justify-between items-center h-14">
//             <div className="text-white">
//                 <Link to="/">
//                     <div className="flex items-center">
//                         <Type size={26} />
//                         <span className="text-xl ml-1">as<span className="text-3xl">K</span>ingdom</span>
//                     </div>
//                 </Link>
//             </div>
//             <nav className="text-white">
//                 <ul className="flex gap-2">
//                     <li><Link to="/">Home</Link></li>
//                     {loggedInUser ? (
//                         <li><Link to="/task">Tasks</Link></li>
//                     ) : (
//                         <>
//                             <li><Link to="/auth/login">Login</Link></li>
//                             <li><Link to="/auth/register">Register</Link></li>
//                         </>
//                     )}
//                 </ul>
//             </nav>
//             <div className="flex items-center gap-1">
//                 {loggedInUser && (
//                     <DropdownMenu>
//                         <DropdownMenuTrigger>
//                             <Avatar className="h-8 w-8">
//                                 <AvatarFallback>{getFirstLetter(loggedInUser.firstName)}</AvatarFallback>
//                             </Avatar>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent>
//                             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                                 <Link to="/profile">Profile</Link>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={logOutHandler}>Logout</DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 )}
//                 <ModeToggle />
//             </div>
//         </header>
//     );
// }

// export default Header;



