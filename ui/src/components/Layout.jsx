import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: '🏠' },
        { path: '/recorder', label: 'Record', icon: '⏺️' },
        { path: '/library', label: 'Library', icon: '📚' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Recording App</h1>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-6 py-3 hover:bg-gray-800 transition ${location.pathname === item.path ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                                }`}
                        >
                            <span className="mr-3 text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
