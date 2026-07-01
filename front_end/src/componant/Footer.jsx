import footerLogo from '../assets/footerLogo.jpg'


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      dir="rtl" 
      className="w-full bg-white border-t border-neutral-100 py-10 px-4 font-['Rubik'] select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        
        {/* --- TOP SECTION: LOGO PLACEHOLDER & STORE NAME --- */}
        <div className="flex flex-col items-center gap-3 text-center">
          {/* Logo Placeholder Box */}
          <div className="w-16 h-16 bg-neutral-50 border border-neutral-200 text-neutral-400 text-xs flex items-center justify-center rounded-2xl tracking-wider shadow-inner">
          <img 
            src={footerLogo} 
            alt="شعار وقار" 
            className="w-16 h-16 mx-auto object-contain mb-2" 
          />
          </div>
          {/* Store Name */}
          <h2 className="text-xl font-bold text-neutral-900">متجر وقار للخواتم</h2>
        </div>

        {/* --- MIDDLE SECTION: SHIPPING & REGISTRATION INFO --- */}
        {/* Stacks elements nicely on mobile, separates them into a clean layout on tablet/desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center text-sm text-neutral-600 w-full max-w-2xl border-y border-neutral-50 py-6">
          
          {/* Shipping Information */}
          <p className="flex items-center gap-2">
            <span className="text-neutral-400">🌍</span>
            <span>التوصيل متوفر لجميع دول الخليج ومعظم دول العالم</span>
          </p>
          
          {/* Divider Line visible only on Desktop */}
          <div className="hidden md:block w-px h-4 bg-neutral-200"></div>

          {/* Registration / License Number */}
          <p className="font-mono bg-neutral-50 px-3 py-1 rounded-lg border border-neutral-100 text-xs text-neutral-500 tracking-wide">
            FL-160306023
          </p>
          
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="text-center text-xs text-neutral-400 font-light">
          &copy; {currentYear} متجر وقار للخواتم. جميع الحقوق محفوظة.
        </div>

      </div>
    </footer>
  );
}