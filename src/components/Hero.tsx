export default function Hero() {
    return (
        <div className="relative bg-gradient-to-r from-slate-500 to-slate-700 rounded-xl overflow-hidden mb-8">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="text-slate-300">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
                            Welcome to <span className="text-slate-100">A-Shop</span>
                        </h1>
                        <p className="text-xl mb-6">
                            发现最新科技产品，享受优质购物体验
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                            立即选购
                        </button>
                    </div>
                    <div className="mt-12 lg:mt-0">
                        <img 
                            src="/hero/hero.png" 
                            alt="Hero"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
