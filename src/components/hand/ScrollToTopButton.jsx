import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when user scrolls down 400px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button className="fixed bottom-10 right-10 border border-black text-black dark:border-white dark:text-white py-2 px-2 rounded-full"
                    onClick={scrollToTop}>
                    <ArrowUp />
                </button>
            )}

        </>
    );
};

export default ScrollToTopButton;
