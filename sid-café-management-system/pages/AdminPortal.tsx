
import React, { useState, FormEvent, ReactNode } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CoffeeIcon, DashboardIcon, ShoppingCartIcon, PackageIcon, FolderIcon, UsersIcon, LogOutIcon } from '../components/Icons';

export const LoginPage: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('admin@sidcafe.com');
    const [password, setPassword] = useState('admin');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        if (email === 'admin@sidcafe.com' && password === 'admin') {
            login();
        } else {
            alert('Credenciais inválidas!');
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="min-h-screen bg-coffee-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <CoffeeIcon className="h-12 w-12 mx-auto text-coffee-800" />
                    <h1 className="text-3xl font-serif font-bold text-coffee-900 mt-2">Sid Café - Admin</h1>
                    <p className="text-coffee-500">Acesse para gerenciar a cafeteria.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-coffee-800">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-coffee-200 rounded-md shadow-sm focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-coffee-800">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-coffee-200 rounded-md shadow-sm focus:outline-none focus:ring-coffee-500 focus:border-coffee-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-coffee-800 text-white py-2 px-4 rounded-md hover:bg-coffee-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-800 transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();
    const navLinkClasses = "flex items-center p-3 my-1 rounded-lg text-coffee-100 hover:bg-coffee-800 transition-colors";
    const activeLinkClasses = "bg-coffee-900 font-semibold";
    
    const navItems = [
      { to: "/admin", icon: DashboardIcon, label: "Dashboard", end: true },
      { to: "/admin/sales", icon: ShoppingCartIcon, label: "Vendas" },
      { to: "/admin/management", icon: PackageIcon, label: "Gerenciamento" },
    ];

    return (
        <aside className="w-64 bg-coffee-800 text-coffee-100 flex flex-col fixed h-full">
            <div className="flex items-center justify-center h-20 border-b border-coffee-900">
                <CoffeeIcon className="h-8 w-8" />
                <span className="ml-3 text-xl font-bold font-serif">Sid Café Admin</span>
            </div>
            <nav className="flex-1 px-4 py-4">
                {navItems.map(item => (
                    <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                        <item.icon className="h-6 w-6 mr-3" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <div className="px-4 py-4 border-t border-coffee-900">
                <button onClick={logout} className={`${navLinkClasses} w-full`}>
                    <LogOutIcon className="h-6 w-6 mr-3" />
                    Sair
                </button>
            </div>
        </aside>
    );
}

export const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-coffee-200 font-sans">
            <AdminSidebar />
            <main className="flex-1 ml-64 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

