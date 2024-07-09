import React from 'react';

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <header className="text-center mb-8">
                <h1 className="flex text-4xl font-bold text-gray-800 mb-2">Welcome to TasKingdom</h1>
                <p className="text-lg text-gray-600">Your personal space to jot down ideas, tasks, and reminders.</p>
            </header>

            <main className="flex flex-col items-center">
                {/* <img src="../images/faviconio-logo/logo.png" alt="Notes App Logo" className="mb-8 w-36 h-36" /> */}
                <p className="text-center text-gray-700 mb-4">
                    Start organizing your thoughts and never miss an important detail. Click below to create your first note.
                </p>
            </main>
        </div>
    );
}

export default HomePage;
