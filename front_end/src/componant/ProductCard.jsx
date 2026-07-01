import { useState } from 'react';

export default function ProductCard({ product }) {
  // Collect all available images from the database and remove any null/empty fields
  const images = [product.image1, product.image2, product.image3].filter(Boolean);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Cloudinary 1:1 aspect ratio transformation function
  const getCloudinarySquareUrl = (url) => {
    if (url && url.includes('cloudinary.com')) {
      // Injects transformation parameters for a perfect 1:1 crop (width 600, height 600, face/auto gravity fill)
      return url.replace('/upload/', '/upload/w_600,h_600,c_fill,g_auto/');
    }
    return url;
  };

  // Slider handlers
  const slideRight = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Pre-filled WhatsApp link calculation using title and product ID
  const whatsappBase = "https://wa.me/966530361158";
  const whatsappText = ` هذا المتج المطلوب ${product.title} رقم المنتج ${product.id} صورة المنتج ${product.image1}`.trim();
  const whatsappLink = `${whatsappBase}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div 
      dir="rtl" 
      className="bg-white border border-neutral-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden w-full max-w-sm font-['Rubik']"
    >
      {/* --- 1:1 IMAGE SLIDER SECTION --- */}
      {images.length > 0 && (
        <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden rounded-t-3xl">
          <img
            src={getCloudinarySquareUrl(images[currentIdx])}
            alt={product.title || 'صورة المنتج'}
            className="w-full h-full object-cover aspect-square transition-all duration-500 ease-in-out"
          />

          {/* Render navigation controls only if there are multiple images */}
          {images.length > 1 && (
            <>
              {/* Slide to right button */}
              <button 
                onClick={slideRight}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 w-9 h-9 flex items-center justify-center rounded-full shadow-sm cursor-pointer transition-colors z-10 select-none"
              >
                ❯
              </button>
              {/* Slide to left button */}
              <button 
                onClick={slideLeft}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 w-9 h-9 flex items-center justify-center rounded-full shadow-sm cursor-pointer transition-colors z-10 select-none"
              >
                ❮
              </button>

              {/* Slider dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIdx ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-300'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* --- CARD BODY CONTENT --- */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title and ID Layout */}
        <div className="flex justify-between items-center mb-4 gap-2">
          {product.title && (
            <h3 className="text-lg font-bold text-neutral-900 line-clamp-1">{product.title}</h3>
          )}
          {product.id && (
            <span className="text-xs font-mono text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
              #{product.id}
            </span>
          )}
        </div>

        {/* Dynamic Detail Specifications (No general header, straight to details) */}
        <div className="space-y-2 text-sm text-neutral-600 flex-grow mb-6">
          {product.size && (
            <p><span className="font-semibold text-neutral-800">المقاس:</span> {product.size}</p>
          )}
          
          {product.craftsman && (
            <p><span className="font-semibold text-neutral-800">الصايغ:</span> {product.craftsman}</p>
          )}
          
          {product.weight && (
            <p><span className="font-semibold text-neutral-800">الوزن:</span> {product.weight}</p>
          )}
          
          {product.tiktok_url && (
            <p>
              <span className="font-semibold text-neutral-800">الفيديو:</span>{' '}
              <a 
                href={product.tiktok_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 hover:text-emerald-700 underline font-medium inline-block"
              >
                رابط الفيديو
              </a>
            </p>
          )}
        </div>

        {/* --- CARD FOOTER --- */}
        {/* Under dir="rtl", the first child stays on the right, the second child moves to the left */}
        <div className="flex justify-between items-center pt-4 border-t border-neutral-100 mt-auto">
          
          {/* Right Side: Green CTA WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
          >
            اطلب الآن
          </a>

          {/* Left Side: Price Component */}
          {product.price && (
            <div className="text-left font-['Rubik']">
              <span className="text-xl font-black text-neutral-900">{product.price}</span>
              <span className="text-xs text-neutral-500 mr-1 font-medium">ريال</span>
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
}