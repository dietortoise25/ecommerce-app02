import { Link } from "react-router-dom";
import { Product } from "../utils/types";
import { useAtom } from "jotai";
import { cartAtom } from "../store/store";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const [cart, setCart] = useAtom(cartAtom)
    const addToCart = () => {
        setCart([...cart, { ...product, quantity: 1 }])
        console.log(cart);
        
    }
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-contain mb-4"
                />
                <h3
                    className="font-bold text-lg"
                >
                    {product.title}
                </h3>
                <p
                    className="text-gray-600"
                >
                    ${product.price}
                </p>

            </Link>
            <button
                onClick={addToCart}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                加入购物车
            </button>
        </div>
    );
}

export default ProductCard;
