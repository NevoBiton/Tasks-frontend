import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    {/* About Us */}
                    <div className="mb-4 md:mb-0">

                        <h2 className="text-lg font-bold mr-2">About Us</h2>

                        <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac odio sed lorem scelerisque tempus.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-300 hover:text-white"><Facebook /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><Twitter /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><Instagram /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><Linkedin /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><Phone /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><Mail /> </a>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="text-sm text-center md:text-right">
                        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
