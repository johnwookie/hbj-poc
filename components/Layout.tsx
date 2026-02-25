import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#FEDCD0] selection:text-[#1A1A1A]">
            <Header />
            <main className="flex-grow flex flex-col relative w-full overflow-hidden">
                {/* Render nested routes here */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
