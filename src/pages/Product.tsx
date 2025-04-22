// src/pages/Product.tsx
import { useAtom } from 'jotai';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Product } from '../utils/types';
import {
    HiOutlineArrowLeft,
    HiOutlineShoppingCart,
    HiOutlineTag,
    HiOutlineTruck,
    HiOutlineShieldCheck
} from 'react-icons/hi';
import { cartAtom } from '../store/store';
import { useEffect, useState } from 'react';


export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [cart, setCart] = useAtom(cartAtom);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 获取商品数据
    // const product = mockProducts.find(p => p.id === id);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setProduct(data);
            }
            catch (err) {
                console.error('Error fetching product:', err);
            }
        }
        fetchProduct();
    }, [id])

    // 处理添加到购物车
    const handleAddToCart = (quantity: number) => {
        if (!product) return;

        const existingItem = cart.find(item => item.id === product.id);
        const newCart = existingItem
            ? cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
            : [...cart, { ...product, quantity }];

        setCart(newCart.filter(item => item.quantity > 0));
    };

    // 当前商品在购物车中的数量
    const cartQuantity = cart.find(item => item.id === product?.id)?.quantity || 0;

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">商品未找到</h2>
                <Link
                    to="/"
                    className="text-blue-600 hover:underline"
                >
                    返回首页
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* 返回按钮 */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
            >
                <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                返回
            </button>

            {/* 商品主内容 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 商品图片区 */}
                <div className="space-y-4">
                    <div className="bg-gray-100 rounded-xl p-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-96 object-contain"
                        />
                    </div>

                </div>

                {/* 商品信息区 */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

                    {/* 价格区块 */}
                    <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                        <HiOutlineTag className="h-6 w-6 text-blue-600" />
                        <div>
                            <p className="text-2xl font-bold text-blue-600">¥{product.price}</p>
                            <p className="text-sm text-gray-600">价格包含增值税</p>
                        </div>
                    </div>

                    {/* 服务保障 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                            <HiOutlineTruck className="h-5 w-5 text-green-600" />
                            <span className="text-sm">全场包邮</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                            <HiOutlineShieldCheck className="h-5 w-5 text-purple-600" />
                            <span className="text-sm">正品保证</span>
                        </div>
                    </div>


                    {/* 购物车操作 */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg">
                                <button
                                    onClick={() => handleAddToCart(-1)}
                                    disabled={cartQuantity === 0}
                                    className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 w-12 text-center">{cartQuantity}</span>
                                <button
                                    onClick={() => handleAddToCart(1)}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => handleAddToCart(1)}
                                className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                <HiOutlineShoppingCart className="mr-2 h-5 w-5" />
                                {cartQuantity > 0 ? '更新购物车' : '加入购物车'}
                            </button>
                        </div>

                        {cartQuantity > 0 && (
                            <Link
                                to="/cart"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <HiOutlineShoppingCart className="mr-2 h-5 w-5" />
                                查看购物车 ({cartQuantity}件商品)
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* 商品描述 */}
            <div className="mt-12 space-y-4">
                <h2 className="text-2xl font-bold">商品详情</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
        </div>
    );
}
