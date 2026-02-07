import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { memories } from '../data/memories';

// Placeholder image component if real images aren't found
const PlaceholderImage = ({ text }) => (
    <div className="w-full h-full bg-romantic-200 flex items-center justify-center text-romantic-500 font-serif text-xl">
        {text}
    </div>
);

const MemoryItem = ({ memory, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            <div className="w-full md:w-1/2 ">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* In a real app, use an <img> tag. For demo we use a placeholder color block if src fails */}
                    <div className="w-full h-full bg-gray-200">
                        {/* Replace with <img src={memory.image} alt={memory.title} className="w-full h-full object-cover" /> */}
                        <PlaceholderImage text={memory.title} />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left px-4">
                <span className="inline-block px-4 py-1 bg-romantic-100 text-romantic-600 rounded-full text-sm font-semibold mb-4">
                    {memory.date}
                </span>
                <h3 className="font-serif text-3xl text-romantic-800 mb-4">{memory.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {memory.description}
                </p>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <div className="min-h-screen py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-serif text-4xl text-romantic-900 mb-4">Our Memory Lane</h2>
                    <div className="w-24 h-1 bg-romantic-300 mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-romantic-200 -translate-x-1/2"></div>

                    {memories.map((memory, index) => (
                        <MemoryItem key={memory.id} memory={memory} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
