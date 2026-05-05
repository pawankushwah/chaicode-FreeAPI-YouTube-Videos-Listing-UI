import React, { useState, useEffect } from 'react';

const ProductModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
      setCurrentImageIndex(0); // Reset for new product
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts/${productId}`);
      const json = await response.json();
      if (json.success) {
        setProduct(json.data);
      } else {
        setError('Failed to load product details');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (!productId) return null;

  return (
    <div className="fixed inset-0 z-3000 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="bg-surface w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-y-auto relative z-10 flex flex-col md:flex-row animate-in zoom-in-95 duration-300 border border-border">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {loading ? (
          <div className="w-full h-96 flex items-center justify-center bg-surface animate-pulse">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="w-full p-20 text-center">
             <p className="text-red-500 font-bold mb-4">{error}</p>
             <button onClick={onClose} className="text-text-secondary hover:text-white underline">Close</button>
          </div>
        ) : (
          <>
            {/* Image Carousel Section */}
            <div className="w-full md:w-1/2 bg-surface-hover flex flex-col items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-border min-h-[400px]">
              <div className="relative w-full group">
                <img 
                  src={product.images?.[currentImageIndex] || product.thumbnail} 
                  alt={product.title} 
                  className="w-full aspect-[4/3] object-contain rounded-xl shadow-2xl transition-all duration-500"
                />
                
                {product.images?.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 p-2 mt-6 overflow-x-auto pb-2 w-full justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-12 h-12 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all ${currentImageIndex === idx ? 'border-accent scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-text-secondary font-medium">• {product.brand}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-4 leading-tight">
                {product.title}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-lg">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span className="text-sm font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-text-secondary">
                  <span className="font-bold text-green-500">{product.stock}</span> units available
                </span>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Description</h4>
                <p className="text-text-primary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-border">
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl font-black text-text-primary">${product.price}</span>
                  {product.discountPercentage > 0 && (
                    <div className="mb-1">
                      <span className="text-sm text-text-secondary line-through block leading-none">
                        ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                      </span>
                      <span className="text-sm text-green-500 font-bold">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
;
;

export default ProductModal;
