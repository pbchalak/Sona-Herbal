import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-herbal-olive/10 text-herbal-olive rounded-full">
              Nature's Finest Remedies
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 text-herbal-leaf">
              Holistic Healing <br /> 
              <span className="italic text-herbal-earth">from the Earth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              Discover our curated collection of organic herbal supplements and natural skincare, 
              crafted with wisdom and respect for nature's balance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-herbal-leaf text-white rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 group">
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-herbal-olive/30 text-herbal-olive rounded-full font-medium hover:bg-herbal-olive/5 transition-all">
                Our Philosophy
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative h-full"
        >
          <img 
            src="https://picsum.photos/seed/herbs/1200/1600" 
            alt="Herbal ingredients" 
            className="w-full h-full object-cover rounded-l-[100px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-herbal-cream"></div>
        </motion.div>
      </div>
    </section>
  );
}
