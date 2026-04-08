import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-herbal-cream z-[90] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
              <div className="flex-1">
                <span className="text-xs font-bold tracking-widest uppercase text-herbal-olive mb-2 block">
                  {product.category}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-herbal-leaf mb-4 leading-tight">
                  {product.name}
                </h2>
                <p className="text-2xl font-serif text-herbal-earth mb-6">
                  ${product.price.toFixed(2)}
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Key Benefits</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-5 h-5 bg-herbal-leaf/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-herbal-leaf" />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Ingredients</h4>
                    <p className="text-xs text-gray-500 italic">
                      {product.ingredients.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-4 bg-herbal-leaf text-white rounded-full font-medium flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg shadow-herbal-leaf/20"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Basket
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
