import React from "react";
import { motion } from "framer-motion";

// Map emotion to emoji and glow color
const emotionVisuals = {
    joy: { emoji: "😊", glow: "from-yellow-200 via-pink-200 to-purple-200" },
    happy: { emoji: "😃", glow: "from-yellow-200 via-green-200 to-blue-200" },
    sadness: { emoji: "😢", glow: "from-blue-200 via-indigo-200 to-purple-200" },
    angry: { emoji: "😠", glow: "from-red-200 via-orange-200 to-yellow-200" },
    fear: { emoji: "😨", glow: "from-blue-200 via-gray-200 to-purple-200" },
    surprise: { emoji: "😲", glow: "from-pink-200 via-yellow-200 to-purple-200" },
    love: { emoji: "❤️", glow: "from-pink-200 via-red-200 to-purple-200" },
    calm: { emoji: "😌", glow: "from-blue-100 via-teal-100 to-purple-200" },
    default: { emoji: "🧠", glow: "from-purple-200 via-indigo-200 to-blue-200" },
};

function getVisuals(emotion) {
    if (!emotion) return emotionVisuals.default;
    const key = Object.keys(emotionVisuals).find(k =>
        emotion.toLowerCase().includes(k)
    );
    return emotionVisuals[key] || emotionVisuals.default;
}

const Result = ({ emotion, tip, onBack }) => {
    const { emoji, glow } = getVisuals(emotion);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100 dark:bg-gradient-to-br dark:from-[#1a093b] dark:via-[#2d1a4d] dark:to-[#0a0a23] transition-colors duration-700 px-4">
            <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
                {/* Thin Border Glow Effect */}
                <motion.div
                    className={`
                        absolute -inset-0.5 rounded-3xl pointer-events-none
                        z-0
                        bg-gradient-to-br ${glow}
                        opacity-60
                        border-2 border-transparent
                    `}
                    style={{
                        filter: "blur(3px)",
                        boxShadow: "0 0 0 2px rgba(168,85,247,0.10)",
                    }}
                    initial={{ opacity: 0.3, scale: 1 }}
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.01, 1],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Card */}
                <motion.div
                    className={`
                        relative w-full rounded-3xl shadow-xl
                        bg-white/70 dark:bg-black/40
                        border border-white/40 dark:border-white/20
                        backdrop-blur-xl
                        p-8 pt-12
                        flex flex-col items-center
                        transition-colors duration-700
                        z-10
                    `}
                    initial={{ opacity: 0, scale: 0.92, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                >
                    {/* Emoji */}
                    <motion.div
                        className="text-6xl mb-4 z-10"
                        initial={{ scale: 0.7, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                    >
                        {emoji}
                    </motion.div>
                    {/* Emotion Label */}
                    <motion.h2
                        className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent dark:from-pink-300 dark:via-purple-300 dark:to-blue-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Emotion: {emotion}
                    </motion.h2>
                    {/* Tip */}
                    <motion.p
                        className="text-lg text-center mb-8 text-gray-700 dark:text-gray-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="font-semibold text-purple-400 dark:text-purple-300">Tip:</span> {tip}
                    </motion.p>
                    {/* Button */}
                    <motion.button
                        onClick={onBack}
                        className="mt-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 text-white shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600"
                        whileHover={{ scale: 1.06, boxShadow: "0 0 16px 4px #a855f7" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Analyze Another
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Result; 