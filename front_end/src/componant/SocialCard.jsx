import { useState, useEffect } from 'react';

export default function SocialSection() {
  // Requirement: The titles are great, DO NOT change them
  const phrases = ["اطلب الآن", "شاهد المزيد من التحف", "للطلب والتواصل"];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === phrases.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div dir="rtl" className="w-full max-w-4xl mx-auto px-4 my-16 font-['Rubik'] select-none">
      
      {/* --- ANIMATED HEADER CONTAINER (UNCHANGED) --- */}
      <div className="h-14 flex items-center justify-center overflow-hidden mb-8 relative">
        {phrases.map((phrase, idx) => {
          const isCurrent = idx === currentIdx;
          
          return (
            <h2
              key={idx}
              className="absolute text-xl md:text-2xl font-bold text-neutral-800 transition-all duration-700 ease-in-out text-center w-full"
              style={{
                opacity: isCurrent ? 1 : 0,
                transform: isCurrent 
                  ? 'translateY(0) scale(1)' 
                  : idx === (currentIdx === 0 ? phrases.length - 1 : currentIdx - 1)
                    ? 'translateY(24px) scale(0.95)' 
                    : 'translateY(-24px) scale(0.95)'
              }}
            >
              {phrase}
            </h2>
          );
        })}
      </div>

      {/* --- RESPONSIVE HORIZONTAL SOCIAL ICONS --- */}
      {/* 'flex-row' ensures it stays horizontal on ALL devices, from small phones to large desktops */}
      <div className="flex flex-row items-center justify-center gap-6 w-full">
        
        {/* WhatsApp Icon Button */}
        <a
          href="https://wa.me/message/ESECVQNKSFSZD1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-neutral-950 text-white border border-neutral-950 rounded-full hover:bg-neutral-800 active:scale-90 transition-all duration-200 shadow-sm cursor-pointer group"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.851-4.411 9.854-9.842.002-2.63-1.023-5.101-2.885-6.964C16.36 1.936 13.884 1.91 11.257 1.91c-5.434 0-9.848 4.414-9.851 9.843-.001 1.702.443 3.361 1.286 4.816l-.993 3.628 3.715-.974l.243.143z"/>
          </svg>
        </a>

        {/* Instagram Icon Button */}
        <a
          href="https://www.instagram.com/wqarrings?igsh=d21lODZqZXB5eWRy&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white text-neutral-800 border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-neutral-950 active:scale-90 transition-all duration-200 shadow-sm cursor-pointer group"
          aria-label="Instagram"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 stroke-current fill-none transition-transform group-hover:scale-110" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* TikTok Icon Button */}
        <a
          href="https://www.tiktok.com/@wqaro4?_r=1&_t=ZS-97TbsiwtRkQ"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white text-neutral-800 border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-neutral-950 active:scale-90 transition-all duration-200 shadow-sm cursor-pointer group"
          aria-label="TikTok"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.17 1.22 1.32 2.97 2.07 4.77 2.16v3.83c-1.39-.06-2.74-.53-3.88-1.35-.67-.5-1.23-1.14-1.65-1.87v7.54c.08 1.44-.25 2.89-.95 4.14-.98 1.7-2.61 2.92-4.54 3.36-2.14.53-4.44.15-6.3-.99-1.99-1.18-3.32-3.33-3.51-5.63-.3-3.04 1.48-6.02 4.31-7.14 1.41-.58 2.97-.68 4.43-.33V12c-1.42-.51-3.05-.19-4.13.88-1.23 1.15-1.55 3.01-.76 4.5.73 1.42 2.27 2.28 3.86 2.14 1.83-.09 3.32-1.56 3.46-3.39c.02-2.11.01-4.21.01-6.32V.02z"/>
          </svg>
        </a>

      </div>
      
    </div>
  );
}