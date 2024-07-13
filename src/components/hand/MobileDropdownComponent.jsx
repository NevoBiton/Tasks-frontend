import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import { Type, X } from "lucide-react"; // Import Menu and X icons

function MobileDropdownComponent({ isDropdownOpen, setIsDropdownOpen }) {
    const { loggedInUser } = useContext(AuthContext);

    return (
        <>
            {isDropdownOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-nav-bar dark:bg-nav-bar z-50 lg:hidden flex flex-col">
                    <div className="flex flex-col items-center p-4 space-y-2">
                        <div className="flex justify-between w-[100%] mb-4 text-white">
                            <Link to="/"><div className="flex"><Type size={26} />as<span className="text-3xl">K</span>ingdom</div></Link>
                            <button
                                onClick={() => setIsDropdownOpen(false)}

                            >
                                <X size={24} />
                            </button>
                        </div>
                        <ul className="flex flex-col items-center w-full space-y-1">
                            <li className="w-full">
                                <Link
                                    to="/"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="block px-4 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
                                >
                                    Home
                                </Link>
                                <div className="border-t border-gray-700"></div>
                            </li>
                            {loggedInUser ? (
                                <>
                                    <li className="w-full">
                                        <Link
                                            to="/task"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="block px-4 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
                                        >
                                            Tasks
                                        </Link>
                                        <div className="border-t border-gray-700"></div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="w-full">
                                        <Link
                                            to="/auth/login"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="block px-4 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
                                        >
                                            Login
                                        </Link>
                                        <div className="border-t border-gray-700"></div>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            to="/auth/register"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="block px-4 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}</>)
}

export default MobileDropdownComponent