import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductSection({ activeCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent fetching if activeCategory isn't set yet
    if (!activeCategory) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetches products belonging strictly to the selected category
        const response = await fetch(`http://187.124.131.250/api/products?category=${encodeURIComponent(activeCategory)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]); // Re-runs automatically only when the user selects a different category

  if (loading) {
    return (
      <div dir="rtl" className="w-full text-center py-20 font-['Rubik'] text-neutral-400 text-lg">
        جاري تحميل المنتجات...
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full max-w-7xl mx-auto px-4 my-6 font-['Rubik']">
      
      {/* Responsive Grid Layout:
        - grid-cols-1: 1 column on mobile phones
        - sm:grid-cols-2: 2 columns on small tablets
        - lg:grid-cols-3: 3 columns on standard desktops
        - xl:grid-cols-4: 4 columns on large screens
        - gap-6: perfectly spaces out the product containers
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
}