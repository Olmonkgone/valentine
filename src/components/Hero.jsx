import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero = ({ onStart }) => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-romantic-50 to-romantic-100">
            {/* Floating Background Hearts */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-romantic-300 opacity-30"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                        scale: 0.5 + Math.random(),
                    }}
                    animate={{
                        y: -100,
                        x: Math.random() * window.innerWidth,
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10,
                    }}
                >
                    <Heart size={20 + Math.random() * 30} fill="currentColor" />
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="text-center z-10 px-4"
            >
                <h1 className="font-serif text-5xl md:text-7xl text-romantic-800 mb-6 drop-shadow-sm">
                    A Story About Us
                </h1>
                <p className="font-sans text-romantic-600 text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
                    Every love story is beautiful, but ours is my favorite.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="bg-romantic-500 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:bg-romantic-600 transition-colors font-semibold flex items-center gap-2 mx-auto"
                >
                    Begin Our Journey <Heart size={20} fill="currentColor" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Hero;
