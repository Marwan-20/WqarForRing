import { useState, useEffect } from 'react';

// We pass activeCategory and setActiveCategory as props so the parent can access them
export default function Category({ activeCategory, setActiveCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://187.124.131.250/api/categories');
        const data = await response.json();
        
        setCategories(data);
        
        // Default to the first category in the database if nothing is selected yet
        if (data && data.length > 0 && !activeCategory) {
          setActiveCategory(data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div dir="rtl" className="w-full font-['Rubik'] select-none my-8 px-4">
      <div className="w-full flex justify-center">
        <div className="max-w-full overflow-x-auto overflow-y-hidden no-scrollbar py-2">
          <div className="flex items-center justify-center gap-3 whitespace-nowrap mx-auto px-4">
            {categories.map((category, index) => {
              const isActive = activeCategory === category;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)} // Updates the parent state
                  className={`
                    px-6 py-2.5 text-sm font-medium tracking-wide border cursor-pointer
                    transition-all duration-300 ease-in-out transform active:scale-95
                    rounded-full
                    ${
                      isActive
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-105'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}