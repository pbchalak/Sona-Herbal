import { motion } from 'motion/react';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product | null) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-4 bg-white">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onViewDetails(product)}
            className="p-3 bg-white text-herbal-leaf rounded-full hover:bg-herbal-cream transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-3 bg-herbal-leaf text-white rounded-full hover:bg-opacity-90 transition-colors"
            title="Add to Cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full text-herbal-olive">
            {product.category}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-xl text-herbal-leaf group-hover:text-herbal-earth transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
        <p className="font-medium text-herbal-olive">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
