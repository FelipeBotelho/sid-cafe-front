
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Product, Category, User } from '../types';
import { Card, Button, Modal, Input, Select } from '../components/ui';
import { PlusCircleIcon, EditIcon, TrashIcon, FolderIcon, PackageIcon, UsersIcon } from '../components/Icons';

// Products Component
const ProductManagement: React.FC = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const openModalForNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const ProductFormModal: React.FC<{ isOpen: boolean, onClose: () => void, product: Product | null }> = ({ isOpen, onClose, product }) => {
        const [name, setName] = useState(product?.name || '');
        const [description, setDescription] = useState(product?.description || '');
        const [price, setPrice] = useState(product?.price || 0);
        const [stock, setStock] = useState(product?.stock || 0);
        const [categoryId, setCategoryId] = useState(product?.categoryId || categories[0]?.id || '');

        const handleSubmit = () => {
            if (!name || !categoryId || price <= 0) {
                alert('Preencha os campos obrigatórios.');
                return;
            }
            if (product) {
                updateProduct({ ...product, name, description, price, stock, categoryId });
            } else {
                addProduct({ name, description, price, stock, categoryId });
            }
            onClose();
        };

        return (
            <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Editar Produto' : 'Novo Produto'}>
                <div className="space-y-4">
                    <Input label="Nome" value={name} onChange={e => setName(e.target.value)} required />
                    <Input label="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
                    <Input label="Preço" type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
                    <Input label="Estoque" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value, 10))} required />
                    <Select label="Categoria" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Select>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{product ? 'Salvar Alterações' : 'Criar Produto'}</Button>
                </div>
            </Modal>
        );
    };

    return (
        <Card>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-coffee-900">Produtos</h2>
                <Button size="sm" onClick={openModalForNew}><PlusCircleIcon className="w-4 h-4 mr-2" />Adicionar</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-coffee-100">
                        <tr>
                            <th className="p-4 font-bold text-coffee-800">Nome</th>
                            <th className="p-4 font-bold text-coffee-800">Preço</th>
                            <th className="p-4 font-bold text-coffee-800">Estoque</th>
                            <th className="p-4 font-bold text-coffee-800">Categoria</th>
                            <th className="p-4 font-bold text-coffee-800">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-t">
                                <td className="p-4">{p.name}</td>
                                <td className="p-4">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td className="p-4">{p.stock}</td>
                                <td className="p-4">{categories.find(c => c.id === p.categoryId)?.name}</td>
                                <td className="p-4 space-x-2">
                                    <Button size="sm" variant="ghost" onClick={() => openModalForEdit(p)}><EditIcon className="w-4 h-4" /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => window.confirm('Tem certeza?') && deleteProduct(p.id)}><TrashIcon className="w-4 h-4 text-red-600" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={editingProduct} />}
        </Card>
    );
};

// Category Component
const CategoryManagement: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const openModalForNew = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };
    
    const openModalForEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const CategoryFormModal: React.FC<{ isOpen: boolean, onClose: () => void, category: Category | null }> = ({ isOpen, onClose, category }) => {
        const [name, setName] = useState(category?.name || '');

        const handleSubmit = () => {
            if (!name) { alert('Nome é obrigatório.'); return; }
            if (category) {
                updateCategory({ ...category, name });
            } else {
                addCategory({ name });
            }
            onClose();
        };

        return (
            <Modal isOpen={isOpen} onClose={onClose} title={category ? 'Editar Categoria' : 'Nova Categoria'}>
                <Input label="Nome da Categoria" value={name} onChange={e => setName(e.target.value)} required />
                <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{category ? 'Salvar' : 'Criar'}</Button>
                </div>
            </Modal>
        );
    };

    return (
        <Card>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-coffee-900">Categorias</h2>
                <Button size="sm" onClick={openModalForNew}><PlusCircleIcon className="w-4 h-4 mr-2" />Adicionar</Button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-coffee-100">
                        <tr>
                            <th className="p-4 font-bold text-coffee-800">Nome</th>
                            <th className="p-4 font-bold text-coffee-800">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id} className="border-t">
                                <td className="p-4">{c.name}</td>
                                <td className="p-4 space-x-2">
                                    <Button size="sm" variant="ghost" onClick={() => openModalForEdit(c)}><EditIcon className="w-4 h-4" /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => window.confirm('Tem certeza?') && deleteCategory(c.id)}><TrashIcon className="w-4 h-4 text-red-600" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <CategoryFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={editingCategory} />}
        </Card>
    );
};

// Users Component
const UserManagement: React.FC = () => {
    const { users } = useData();
    return (
        <Card>
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-coffee-900">Usuários</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-coffee-100">
                        <tr>
                            <th className="p-4 font-bold text-coffee-800">Nome</th>
                            <th className="p-4 font-bold text-coffee-800">Email</th>
                            <th className="p-4 font-bold text-coffee-800">Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-t">
                                <td className="p-4">{u.name}</td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">{u.role}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

// Main Management Page
export const AdminManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('products');
    
    const tabs = [
        { id: 'products', label: 'Produtos', icon: PackageIcon },
        { id: 'categories', label: 'Categorias', icon: FolderIcon },
        { id: 'users', label: 'Usuários', icon: UsersIcon },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-coffee-900">Gerenciamento Geral</h1>
            
            <div className="border-b border-coffee-500">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-lg
                            ${activeTab === tab.id
                                ? 'border-coffee-800 text-coffee-900'
                                : 'border-transparent text-coffee-500 hover:text-coffee-800 hover:border-coffee-500'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === 'products' && <ProductManagement />}
                {activeTab === 'categories' && <CategoryManagement />}
                {activeTab === 'users' && <UserManagement />}
            </div>
        </div>
    );
};
