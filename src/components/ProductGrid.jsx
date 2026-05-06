import { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product.id)}
      className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-accent transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.thumbnail || product.mainImage?.url} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-accent uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <span className="text-xs font-medium text-text-secondary">{product.brand}</span>
        </div>
        
        <p className="text-xs text-text-secondary line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-500">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="text-xs font-bold ml-1">{product.rating || '4.5'}</span>
          </div>
          <span className="text-[10px] text-text-secondary">({product.stock || '10'} in stock)</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-black text-text-primary">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] text-green-500 font-bold">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
          <div className="text-accent text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
             View Details
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1, false);
  }, [searchQuery]);

  const fetchProducts = async (pageNum, isAppend = false) => {
    try {
      if (isAppend) setLoadingMore(true);
      else setLoading(true);

      const limit = 20;
      const url = searchQuery 
        ? `https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNum}&limit=${limit}&query=${searchQuery}`
        : `https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNum}&limit=${limit}`;
      
      const response = await fetch(url);
      const json = await response.json();

      if (json.success) {
        const newData = searchQuery ? json.data.data : json.data.data;
        const pagination = json.data;
        
        setProducts(prev => isAppend ? [...prev, ...newData] : newData);
        
        // Handle different pagination field names between public/random and ecommerce APIs
        const hasNext = searchQuery ? pagination.hasNextPage : pagination.nextPage;
        setHasMore(hasNext);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-surface rounded-xl aspect-[3/4] animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" width="32" height="32" className="text-red-500">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">{error}</h2>
        <button 
          onClick={() => fetchProducts(1, false)}
          className="px-6 py-2 bg-brand text-white rounded-full font-bold hover:bg-red-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand/5 blur-3xl rounded-full" />
        <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4 relative z-10">
          Shop <span className="text-brand">Market</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl relative z-10">
          Discover amazing deals on random products. Quality meets variety in our curated marketplace.
        </p>
        <div className="mt-4 text-xs font-bold text-text-secondary uppercase tracking-widest relative z-10">
          {products.length} Items Displayed
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard 
            key={`${product.id}-${Math.random()}`} // Avoid key collisions during random product loads
            product={product} 
            onClick={setSelectedProductId}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={handleShowMore}
            disabled={loadingMore}
            className="group relative flex items-center gap-3 px-8 py-3 bg-surface border border-border rounded-full text-text-primary font-bold hover:border-accent hover:bg-surface-hover transition-all active:scale-95 disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span>Loading more...</span>
              </>
            ) : (
              <>
                <span>Show More Products</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:translate-y-1 transition-transform">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      <ProductModal 
        productId={selectedProductId} 
        onClose={() => setSelectedProductId(null)} 
      />
    </div>
  );
};

export default ProductGrid;
