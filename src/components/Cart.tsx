import { useAtom } from "jotai";
import { cartAtom } from "../store/store";
import { CartItem } from "../utils/types";

function Cart() {
    const [cart, setCart] = useAtom(cartAtom)
    const updateQuantity = (id: string, quantity: number) => {
        const newCart = cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        setCart(newCart);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="px-5 mt-5">
            <div className="space-y-4">
                {cart.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-16 w-16 object-contain"
                            />
                            <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p>${item.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
                <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            </div>
        </div>

    );
}
export default Cart;
