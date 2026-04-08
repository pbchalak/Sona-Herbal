import { ShoppingCart, Leaf, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-herbal-cream/80 backdrop-blur-md border-b border-herbal-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Leaf className="text-herbal-leaf w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-tight text-herbal-leaf">Sona Herbal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-herbal-leaf transition-colors">Shop All</a>
            <a href="#" className="text-sm font-medium hover:text-herbal-leaf transition-colors">Wellness</a>
            <a href="#" className="text-sm font-medium hover:text-herbal-leaf transition-colors">Skincare</a>
            <a href="#" className="text-sm font-medium hover:text-herbal-leaf transition-colors">Our Story</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 hover:bg-herbal-olive/5 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-herbal-olive" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-herbal-leaf text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              className="md:hidden p-2 hover:bg-herbal-olive/5 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-herbal-cream border-b border-herbal-olive/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a href="#" className="block text-lg font-serif">Shop All</a>
              <a href="#" className="block text-lg font-serif">Wellness</a>
              <a href="#" className="block text-lg font-serif">Skincare</a>
              <a href="#" className="block text-lg font-serif">Our Story</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
