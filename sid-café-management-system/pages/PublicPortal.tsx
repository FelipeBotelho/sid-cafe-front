
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CoffeeIcon, HomeIcon, MenuIcon, PhoneIcon, MapPinIcon, UserIcon } from '../components/Icons';
import { useData } from '../context/DataContext';
import { Card } from '../components/ui';

const PublicHeader: React.FC = () => {
    const navLinkClasses = "flex items-center space-x-2 text-coffee-800 hover:text-coffee-900 transition-colors px-3 py-2 rounded-md";
    const activeLinkClasses = "bg-coffee-200 text-coffee-900 font-semibold";

    return (
        <header className="bg-coffee-100 shadow-md sticky top-0 z-40">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <CoffeeIcon className="h-8 w-8 text-coffee-800" />
                        <span className="text-2xl font-serif font-bold text-coffee-900">Sid Café</span>
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>
                            <HomeIcon className="h-5 w-5" />
                            <span>Início</span>
                        </NavLink>
                        <NavLink to="/menu" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                             <MenuIcon className="h-5 w-5" />
                            <span>Cardápio</span>
                        </NavLink>
                        <NavLink to="/admin" className="flex items-center space-x-2 bg-coffee-800 text-white hover:bg-coffee-900 transition-colors px-4 py-2 rounded-full">
                            <UserIcon className="h-5 w-5" />
                            <span>Área Restrita</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const PublicFooter: React.FC = () => (
    <footer className="bg-coffee-900 text-coffee-100 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-serif font-bold mb-4">Sid Café</h3>
                    <p className="text-coffee-200">Sabor e aconchego em cada xícara.</p>
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold mb-4">Contato</h3>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-coffee-200 mb-2">
                        <PhoneIcon className="h-5 w-5" />
                        <span>(11) 98765-4321</span>
                    </div>
                     <div className="flex items-center justify-center md:justify-start space-x-2 text-coffee-200">
                        <MapPinIcon className="h-5 w-5" />
                        <span>Rua do Café, 123 - São Paulo, SP</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold mb-4">Horário</h3>
                    <p className="text-coffee-200">Seg - Sex: 08:00 - 20:00</p>
                    <p className="text-coffee-200">Sáb - Dom: 09:00 - 18:00</p>
                </div>
            </div>
            <div className="text-center text-coffee-500 mt-8 pt-4 border-t border-coffee-800">
                <p>&copy; {new Date().getFullYear()} Sid Café. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
);

export const PublicLayout: React.FC = () => {
    return (
        <div className="bg-coffee-100 min-h-screen flex flex-col font-sans">
            <PublicHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export const HomePage: React.FC = () => {
    return (
        <div>
            <section className="relative bg-coffee-800 text-white py-20 sm:py-32">
                <div className="absolute inset-0">
                    <img src="https://picsum.photos/1600/900?random=10" alt="Coffee beans" className="w-full h-full object-cover opacity-30"/>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Bem-vindo ao Sid Café</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-coffee-100">Onde cada grão conta uma história e cada xícara é um convite ao bem-estar.</p>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-coffee-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="prose lg:prose-lg max-w-none text-coffee-800">
                            <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-4">Nossa História</h2>
                            <p>Nascido da paixão por cafés especiais e o desejo de criar um espaço acolhedor, o Sid Café abriu suas portas em 2020. Nossa missão é simples: servir o melhor café, preparado com grãos selecionados de produtores locais, em um ambiente que te faça sentir em casa.</p>
                            <p>Acreditamos que o café é mais do que uma bebida; é uma experiência. Por isso, cuidamos de cada detalhe, desde a torra dos grãos até a arte no seu latte, para garantir que sua visita seja memorável.</p>
                        </div>
                        <div>
                            <img src="https://picsum.photos/600/400?random=11" alt="Interior do Sid Café" className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const MenuPage: React.FC = () => {
    const { products, categories } = useData();

    const groupedMenu = categories.map(category => ({
        ...category,
        products: products.filter(product => product.categoryId === category.id),
    })).filter(category => category.products.length > 0);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-coffee-900">Nosso Cardápio</h1>
                <p className="text-lg text-coffee-800 mt-2">Feito com carinho para você.</p>
            </div>

            {groupedMenu.map(category => (
                <div key={category.id} className="mb-12">
                    <h2 className="text-3xl font-serif font-bold text-coffee-800 border-b-2 border-coffee-500 pb-2 mb-8">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.products.map(product => (
                            <Card key={product.id} className="transition-transform duration-300 hover:scale-105">
                                <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.name} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-serif text-coffee-900">{product.name}</h3>
                                    <p className="text-coffee-500 mt-2 h-12">{product.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-2xl font-bold text-coffee-800">
                                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                        {product.stock === 0 && <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Indisponível</span>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

