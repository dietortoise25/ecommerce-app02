import { useState, useEffect } from 'react';

const slides = [
    {
        id: "1",
        title: "新品上市",
        description: "高音质无线蓝牙耳机，续航时间长",
        image: "/products/1.png",
        buttonText: '立即购买',
        buttonLink: '/product/1'
    },
    {
        id: "2",
        title: "智能设备",
        description: "智能家庭自动化系统",
        image: "/products/2.png",
        buttonText: '立即购买',
        buttonLink: '/product/2'
    },
    {
        id: "3",
        title: "特价商品",
        description: "最新的科技产品",
        image: "/products/3.png",
        buttonText: '立即购买',
        buttonLink: '/product/3'
    }

];

export default function Carousel() {
    // 使用useState管理当前显示的幻灯片索引
    const [currentSlide, setCurrentSlide] = useState(0);

    // 使用useEffect实现自动轮播功能
    useEffect(() => {
        // 设置5秒切换一次的定时器
        const interval = setInterval(() => {
            // 计算下一张幻灯片的索引（循环播放）
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        // 组件卸载时清除定时器
        return () => clearInterval(interval);
    }, []);

    return (

        <div className="relative w-full overflow-hidden rounded-xl">  {/* 轮播图外层容器 */}
            {/* 幻灯片轨道容器，使用flex布局实现水平排列 */}
            <div className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {/* 遍历所有幻灯片数据 */}
                {slides.map((slide) => (

                    < div key={slide.id} className="w-full flex-shrink-0" >
                        {/* 图片容器，设置响应式高度 */}
                        < div className="relative h-64 md:64/2" >
                            {/* 幻灯片图片 */}
                            < img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* 图片上的半透明遮罩层 */}
                            < div className="absolute inset-0 bg-slate-300/40 flex items-center" >
                                {/* 文字内容容器 */}
                                < div className="max-w-2xl mx-auto px-4 text-white" >
                                    {/* 标题 */}
                                    < h2 className="text-3xl md:text-4xl font-bold mb-2" > {slide.title}</h2>
                                    {/* 描述 */}
                                    <p className="text-xl mb-4">{slide.description}</p>
                                    {/* 按钮 */}
                                    <a
                                        href={slide.buttonLink}
                                        className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                                    >
                                        {slide.buttonText}
                                    </a>
                                </div>
                            </div >
                        </div >
                    </div >
                ))
                }
            </div >
            {/* 轮播图指示器容器 */}
            < div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2" >
                {/* 遍历生成指示器按钮 */}
                {
                    slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                            aria-label={`跳转到幻灯片 ${index + 1}`}
                        />
                    ))
                }
            </div >
        </div >
    )
}
