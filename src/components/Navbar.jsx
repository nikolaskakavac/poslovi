import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [key, setKey] = useState(0);
    const { user, logout, isAuthenticated, isCompany } = useAuth();

    // Re-render kada se user promeni
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [user]);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <header className="w-full sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-slate-200">
                <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-slate-900">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-display font-bold tracking-tight">Jobzee</span>
                        <span className="text-xs uppercase tracking-widest text-emerald-600">careers</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                        <Link to="/" className="hover:text-emerald-600 transition-colors">Početna</Link>
                        <Link to="/ponuda" className="hover:text-emerald-600 transition-colors">Ponuda</Link>
                        <Link to="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {isAuthenticated() ? (
                            <>
                                <Link
                                    to="/jobs"
                                    className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                >
                                    Pretrazi oglase
                                </Link>
                                
                                {(user?.role === 'student' || user?.role === 'alumni') && (
                                    <Link
                                        to="/my-applications"
                                        className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                    >
                                        📨 Aplikacije
                                    </Link>
                                )}
                                
                                {isCompany() && (
                                    <>
                                        <Link
                                            to="/applications"
                                            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                        >
                                            📨 Aplikacije
                                        </Link>
                                        <Link
                                            to="/my-jobs"
                                            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                        >
                                            📋 Moji oglasi
                                        </Link>
                                        <Link
                                            to="/create-job"
                                            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
                                        >
                                            Postavi oglas
                                        </Link>
                                    </>
                                )}
                                
                                {user?.role === 'alumni' && (
                                    <>
                                        <Link
                                            to="/my-jobs"
                                            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                        >
                                            📋 Moji oglasi
                                        </Link>
                                        <Link
                                            to="/create-job"
                                            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
                                        >
                                            Postavi oglas
                                        </Link>
                                    </>
                                )}

                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin-console"
                                        className="hidden sm:inline-flex px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition text-xs"
                                    >
                                        🛠️ Admin
                                    </Link>
                                )}

                                <Link
                                    to="/profile"
                                    className="px-4 py-2 rounded-full bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition"
                                >
                                    {user?.firstName || 'Profil'}
                                </Link>
                                
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                                >
                                    Odjava
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/jobs"
                                    className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-slate-500 transition"
                                >
                                    Pretrazi oglase
                                </Link>
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="hidden sm:inline-flex px-4 py-2 rounded-full bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
                                >
                                    Postavi oglas
                                </button>
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="px-4 py-2 rounded-full bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
                                >
                                    Prijava / Registracija
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;