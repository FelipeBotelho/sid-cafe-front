
import React from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSignIcon, TrendingUpIcon, PackageXIcon, ShoppingCartIcon } from '../components/Icons';
import { Sale, SaleStatus } from '../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; description: string; }> = ({ title, value, icon, description }) => (
    <Card className="p-6">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-coffee-500">{title}</h3>
            {icon}
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-coffee-900">{value}</p>
            <p className="text-xs text-coffee-500 mt-1">{description}</p>
        </div>
    </Card>
);

const RecentSales: React.FC<{sales: Sale[]}> = ({ sales }) => {
    const { products } = useData();

    return (
        <Card className="p-6">
             <h3 className="text-xl font-bold text-coffee-900 mb-4">Vendas Recentes</h3>
             <div className="space-y-4">
                 {sales.slice(0, 5).map(sale => {
                     const firstProduct = products.find(p => p.id === sale.items[0]?.productId);
                     return (
                         <div key={sale.id} className="flex items-center justify-between">
                             <div>
                                 <p className="font-semibold text-coffee-800">{firstProduct?.name || 'Produto desconhecido'}</p>
                                 <p className="text-sm text-coffee-500">#{sale.id.substring(0, 5)}</p>
                             </div>
                             <p className="font-bold text-coffee-900">{sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                         </div>
                     );
                 })}
             </div>
        </Card>
    );
};


export const AdminDashboard: React.FC = () => {
    const { sales, products } = useData();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesToday = sales.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime() && sale.status === SaleStatus.COMPLETED;
    });

    const totalRevenueToday = salesToday.reduce((sum, sale) => sum + sale.total, 0);
    const totalSalesTodayCount = salesToday.length;

    const outOfStockItems = products.filter(p => p.stock === 0).length;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const monthlySales = sales.filter(s => new Date(s.createdAt) >= last30Days && s.status === SaleStatus.COMPLETED);
    
    const productSalesCount = monthlySales.flatMap(s => s.items).reduce((acc, item) => {
        acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
        return acc;
    }, {} as { [key: string]: number });

    const topProductsData = Object.entries(productSalesCount)
        .map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            return { name: product?.name || 'N/A', quantity };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-coffee-900">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Receita (Hoje)"
                    value={totalRevenueToday.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    icon={<DollarSignIcon className="h-6 w-6 text-green-500" />}
                    description="Total de vendas concluídas hoje"
                />
                <StatCard
                    title="Vendas (Hoje)"
                    value={`+${totalSalesTodayCount}`}
                    icon={<ShoppingCartIcon className="h-6 w-6 text-blue-500" />}
                    description="Número de vendas concluídas hoje"
                />
                 <StatCard
                    title="Mais Vendidos (Mês)"
                    value={topProductsData[0]?.name || "N/A"}
                    icon={<TrendingUpIcon className="h-6 w-6 text-purple-500" />}
                    description="Produto com mais vendas nos últimos 30 dias"
                />
                <StatCard
                    title="Itens sem Estoque"
                    value={outOfStockItems.toString()}
                    icon={<PackageXIcon className="h-6 w-6 text-red-500" />}
                    description="Produtos que precisam de reposição"
                />
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-coffee-900 mb-4">Produtos Mais Vendidos (Últimos 30 dias)</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={topProductsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: '#4B3731' }}/>
                                <YAxis tick={{ fill: '#4B3731' }}/>
                                <Tooltip contentStyle={{ backgroundColor: '#F5EFE6', border: '1px solid #E8DFCA' }} />
                                <Legend />
                                <Bar dataKey="quantity" fill="#785A4E" name="Quantidade Vendida" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
                 <div className="lg:col-span-1">
                    <RecentSales sales={sales} />
                 </div>
            </div>

        </div>
    );
};
