import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Instagram, Twitter, Facebook } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import { products } from './data';
import { Product, CartItem, Category } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const categories: Category[] = ['All', 'Wellness', 'Skincare', 'Tea', 'Immunity'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-grow">
        <Hero />

        {/* Product Section */}
        <section className="py-20 bg-white rounded-t-[60px] md:rounded-t-[100px] -mt-20 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif text-herbal-leaf mb-4">
                  Curated for <span className="italic text-herbal-earth">Your Wellbeing</span>
                </h2>
                <p className="text-gray-500 max-w-md">
                  Explore our range of natural solutions, each carefully selected for its purity and potency.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-herbal-leaf text-white shadow-lg shadow-herbal-leaf/20' 
                        : 'bg-herbal-cream text-herbal-olive hover:bg-herbal-olive/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-herbal-leaf text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                  Rooted in Wisdom, <br />
                  <span className="italic opacity-80">Grown with Care</span>
                </h2>
                <div className="space-y-6 text-lg opacity-90 leading-relaxed">
                  <p>
                    At Sona Herbal, we believe that true wellness comes from aligning ourselves with the rhythms of nature. 
                    Our journey began in a small garden, driven by a passion for the ancient wisdom of herbalism.
                  </p>
                  <p>
                    Every product in our collection is sustainably sourced and rigorously tested to ensure it meets our 
                    highest standards of purity. We don't just sell herbs; we share a lifestyle of intentionality.
                  </p>
                </div>
                <button className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-all">
                  Learn More About Us
                </button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[40px] overflow-hidden rotate-3 shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/garden/800/800" 
                    alt="Our garden" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-herbal-earth rounded-[32px] -rotate-6 flex items-center justify-center p-6 text-center shadow-xl">
                  <p className="font-serif text-xl leading-tight">100% Organic & Sustainable</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-herbal-cream pt-20 pb-10 border-t border-herbal-olive/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Leaf className="text-herbal-leaf w-6 h-6" />
                <span className="font-serif text-xl font-bold tracking-tight text-herbal-leaf">Sona Herbal</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nurturing your body and soul with the purest gifts from nature. Join our community of wellness seekers.
              </p>
              <div className="flex gap-4">
                <button className="p-2 bg-white rounded-full text-herbal-olive hover:text-herbal-leaf transition-colors shadow-sm">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white rounded-full text-herbal-olive hover:text-herbal-leaf transition-colors shadow-sm">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white rounded-full text-herbal-olive hover:text-herbal-leaf transition-colors shadow-sm">
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">Wellness Bundles</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-herbal-leaf transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-serif text-lg mb-6">Newsletter</h4>
              <p className="text-sm text-gray-500">Subscribe to receive wellness tips and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-white border border-herbal-olive/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-herbal-leaf transition-colors"
                />
                <button className="px-6 py-2 bg-herbal-leaf text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-herbal-olive/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            <p>© 2026 Sona Herbal. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-herbal-olive transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-herbal-olive transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
