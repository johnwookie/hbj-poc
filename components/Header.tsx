import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Courses', path: '/courses' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];

    // Helper function for active styling
    const getNavClass = ({ isActive }: { isActive: boolean }) => {
        // Special case for root to avoid highlighting '/' when on '/about', though NavLink handles this with 'end' prop usually.
        return `text-sm font-medium transition-colors ${isActive
                ? 'text-neutral-900 border-b-2 border-neutral-900 pb-1'
                : 'text-neutral-500 hover:text-neutral-900'
            }`;
    };

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="bg-white border-b border-neutral-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-serif text-2xl tracking-tight text-neutral-900 uppercase">
                            HBJ Academy
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === '/'}
                                className={getNavClass}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Checkout CTA Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/checkout"
                            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                            <ShoppingCart size={16} className="mr-2" />
                            Checkout
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-neutral-500 hover:text-neutral-900 p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-neutral-100 shadow-lg absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `block px-3 py-4 rounded-md text-base font-medium ${isActive
                                        ? 'bg-neutral-50 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="pt-4 mt-2 border-t border-neutral-100">
                            <Link
                                to="/checkout"
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800"
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
