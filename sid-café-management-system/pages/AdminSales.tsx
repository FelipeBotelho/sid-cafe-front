import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Sale, SaleStatus, Product, SaleItem } from '../types';
import { Card, Button, Modal, StatusBadge, Select, Input } from '../components/ui';
import { PlusCircleIcon, TrashIcon } from '../components/Icons';

const NewSaleModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { products, categories, addSale } = useData();
    const [cart, setCart] = useState<{ productId: string, quantity: number }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    
    const addToCart = (productId: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) {
                return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { productId, quantity: 1 }];
        });
    };
    
    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.productId !== productId));
    }

    const resetAndClose = () => {
        setCart([]);
        setSearchTerm('');
        setSelectedCategoryId(null);
        onClose();
    };

    const handleSubmit = () => {
        if (cart.length === 0) {
            alert("Adicione pelo menos um item para criar a venda.");
            return;
        }
        addSale(cart);
        resetAndClose();
    };

    const cartDetails = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...product, quantity: item.quantity };
    });

    const total = cartDetails.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const filteredProducts = products
      .filter(p => p.stock > 0)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => selectedCategoryId ? p.categoryId === selectedCategoryId : true);

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} title="Criar Nova Venda" size="xl">
            <div className="grid grid-cols-3 gap-6 max-h-[70vh]">
                {/* Product Selection Column */}
                <div className="col-span-2 flex flex-col">
                    <h4 className="font-bold text-lg mb-4 text-coffee-900">Produtos Disponíveis</h4>
                    
                    <div className="mb-4">
                        <Input
                          id="product-search"
                          label=""
                          placeholder="Buscar produto por nome..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => setSelectedCategoryId(null)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors font-medium ${
                          !selectedCategoryId
                            ? 'bg-coffee-800 text-white'
                            : 'bg-coffee-200 text-coffee-800 hover:bg-coffee-500 hover:text-white'
                        }`}
                      >
                        Todos
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategoryId(category.id)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors font-medium ${
                            selectedCategoryId === category.id
                              ? 'bg-coffee-800 text-white'
                              : 'bg-coffee-200 text-coffee-800 hover:bg-coffee-500 hover:text-white'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                        {filteredProducts.length > 0 ? filteredProducts.map(product => (
                            <Card key={product.id} className="p-3 flex justify-between items-center">
                                <div>
                                   <p className="font-semibold text-coffee-800">{product.name}</p>
                                   <p className="text-sm text-coffee-500">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <Button size="sm" onClick={() => addToCart(product.id)} aria-label={`Adicionar ${product.name}`}>
                                  <PlusCircleIcon className="w-5 h-5"/>
                                </Button>
                            </Card>
                        )) : (
                            <div className="text-center py-10 text-coffee-500">
                                <p>Nenhum produto encontrado.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Cart Column */}
                <div className="col-span-1 bg-coffee-200 p-4 rounded-lg flex flex-col">
                    <h4 className="font-bold text-lg mb-2 text-coffee-900">Itens da Venda</h4>
                    {cart.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-coffee-500 text-center">O carrinho está vazio.</p>
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto space-y-2">
                            {cartDetails.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                                    <div>
                                        <p className="text-sm font-semibold text-coffee-900">{item.name}</p>
                                        <p className="text-xs text-coffee-500">{item.quantity} x {item.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id || '')} aria-label={`Remover ${item.name}`}>
                                      <TrashIcon className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-coffee-500">
                        <p className="text-lg font-bold text-coffee-900 flex justify-between">
                            <span>Total:</span>
                            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
                <Button variant="secondary" onClick={resetAndClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Criar Venda</Button>
            </div>
        </Modal>
    );
};

export const AdminSales: React.FC = () => {
    const { sales, updateSaleStatus, products } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleStatusChange = (saleId: string, newStatus: SaleStatus) => {
        updateSaleStatus(saleId, newStatus);
    }
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-coffee-900">Gerenciamento de Vendas</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Nova Venda
                </Button>
            </div>

            <Card className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-coffee-100">
                        <tr>
                            <th className="p-4 font-bold text-coffee-800">ID</th>
                            <th className="p-4 font-bold text-coffee-800">Itens</th>
                            <th className="p-4 font-bold text-coffee-800">Total</th>
                            <th className="p-4 font-bold text-coffee-800">Data</th>
                            <th className="p-4 font-bold text-coffee-800">Status</th>
                            <th className="p-4 font-bold text-coffee-800">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.id} className="border-b border-coffee-200 last:border-0">
                                <td className="p-4 font-mono text-sm text-coffee-500">#{sale.id.substring(1, 6)}</td>
                                <td className="p-4 text-coffee-800">
                                  {sale.items.map(item => {
                                      const product = products.find(p => p.id === item.productId);
                                      return <div key={item.productId}>{item.quantity}x {product?.name}</div>
                                  })}
                                </td>
                                <td className="p-4 font-semibold text-coffee-900">{sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td className="p-4 text-coffee-800">{new Date(sale.createdAt).toLocaleString('pt-BR')}</td>
                                <td className="p-4"><StatusBadge status={sale.status} /></td>
                                <td className="p-4">
                                    <Select 
                                        label=""
                                        value={sale.status} 
                                        onChange={(e) => handleStatusChange(sale.id, e.target.value as SaleStatus)}
                                        className="text-sm py-1"
                                    >
                                        {Object.values(SaleStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <NewSaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};