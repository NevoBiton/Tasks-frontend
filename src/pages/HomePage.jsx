import CarouselComponent from '@/components/hand/CarouselComponent';
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <header className="text-center mb-8">
                <h1 className="flex text-4xl font-bold mb-2">Welcome to TasKingdom</h1>
                <p className="text-lg">Your personal space to jot down ideas, tasks, and reminders.</p>
            </header>
            <main className="flex flex-col items-center">
                <CarouselComponent />
                <p className="text-center mb-4">
                    Start organizing your thoughts and never miss an important detail. Click below to create your first note.
                </p>
                <div className='flex gap-2'>
                    <p className='flex items-center gap-2'><Button><Link to="/auth/register">Sign Up</Link></Button></p>
                    <p className='flex items-center gap-2'><Button><Link to="/auth/login">Login</Link></Button></p>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
