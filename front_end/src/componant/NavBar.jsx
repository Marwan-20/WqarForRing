import headerLogo from '../assets/logoNav.jpg'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Container with fixed height for consistent vertical rhythm */}
        <div className="flex items-center justify-between h-20 relative">

          {/* RIGHT SIDE: Logo Placeholder */}
          {/* Arranged on the right because of the global dir="rtl" setting */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 group-hover:scale-105 transition-all duration-300">
              <img 
            src={headerLogo} 
            alt="وقار للخواتم" 
            className="w-10 h-10 object-contain" 
            />
            </div>
          </div>

          {/* CENTER: Brand Title */}
          {/* Using absolute positioning to guarantee perfect centering regardless of side elements' widths */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              وقار للخواتم
            </h1>
          </div>

          {/* LEFT SIDE: Connect Action Button */}
        <div className="flex-shrink sm:flex-shrink-0">
  <a
    href="https://wa.me/message/ESECVQNKSFSZD1"
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center justify-center
      px-4 sm:px-6
      py-2 sm:py-2.5
      text-sm sm:text-base
      font-medium text-white
      bg-slate-900 rounded-full
      hover:bg-slate-800
      active:bg-slate-950 active:scale-95
      transition-all duration-200
      shadow-sm hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900
      whitespace-nowrap
    "
  >
    تواصل معنا
  </a>
</div>

        </div>
      </div>
    </header>
  );
}
