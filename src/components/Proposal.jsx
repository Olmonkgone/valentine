import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti'; // We might need to install this or simulate it
import { proposalData } from '../data/memories';

const Proposal = () => {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    const handleYes = () => {
        setAccepted(true);
        // Fire confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            window.confetti && window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            window.confetti && window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const runAway = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPosition({ x, y });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-romantic-200 to-white px-4 py-20 overflow-hidden">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="max-w-2xl w-full bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center border border-white"
            >
                <AnimatePresence mode='wait'>
                    {!accepted ? (
                        <motion.div
                            key="question"
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Heart className="w-20 h-20 text-romantic-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
                            <h2 className="font-serif text-4xl md:text-5xl text-romantic-800 mb-8 leading-tight">
                                {proposalData.question}
                            </h2>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 relative h-32 md:h-20">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleYes}
                                    className="bg-romantic-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-romantic-600 transition-all z-10"
                                >
                                    YES! 💍
                                </motion.button>

                                <motion.button
                                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                                    onHoverStart={runAway}
                                    onClick={runAway}
                                    className="bg-gray-200 text-gray-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors absolute md:relative"
                                >
                                    No
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="py-12"
                        >
                            <div className="mb-6 flex justify-center">
                                <Heart className="w-32 h-32 text-romantic-500 animate-bounce" fill="currentColor" />
                            </div>
                            <h2 className="font-serif text-4xl md:text-6xl text-romantic-600 mb-4">
                                {proposalData.yesMessage}
                            </h2>
                            <p className="text-xl text-gray-600">You've made me the happiest person alive!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Proposal;
