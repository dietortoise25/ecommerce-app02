import { useEffect, useState } from 'react';
import ProductCard from "../components/ProductCard";
import { Product } from "../utils/types";
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';


function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div className="container mx-auto p-4">
            {/* 添加Hero区域 */}
            <Hero />

            {/* 添加轮播图 */}
            <div className="my-8">
                <Carousel />
            </div>

            {/* 现有产品网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
export default Home;
