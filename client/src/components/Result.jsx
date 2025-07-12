import React from "react";
import { motion } from "framer-motion";

// Map emotion to emoji and glow color
const emotionVisuals = {
    joy: { emoji: "😊", glow: "from-yellow-400 via-pink-400 to-purple-500" },
    happy: { emoji: "😃", glow: "from-yellow-300 via-green-300 to-blue-400" },
    sadness: { emoji: "😢", glow: "from-blue-400 via-indigo-500 to-purple-700" },
    angry: { emoji: "😠", glow: "from-red-400 via-orange-400 to-yellow-500" },
    fear: { emoji: "😨", glow: "from-blue-400 via-gray-400 to-black" },
    surprise: { emoji: "😲", glow: "from-pink-400 via-yellow-300 to-purple-400" },
    love: { emoji: "❤️", glow: "from-pink-400 via-red-400 to-purple-500" },
    calm: { emoji: "😌", glow: "from-blue-300 via-teal-300 to-purple-400" },
    default: { emoji: "🧠", glow: "from-purple-500 via-indigo-500 to-blue-700" },
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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a093b] via-[#2d1a4d] to-[#0a0a23] dark:bg-gradient-to-br dark:from-[#1a093b] dark:via-[#2d1a4d] dark:to-[#0a0a23] transition-colors duration-700 px-4">
            <motion.div
                className={`
          relative w-full max-w-md mx-auto
          rounded-3xl shadow-2xl
          bg-white/10 dark:bg-black/40
          border-2 border-transparent
          backdrop-blur-xl
          p-8 pt-12
          flex flex-col items-center
          transition-colors duration-700
        `}
                initial={{ opacity: 0, scale: 0.85, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                {/* Animated Glow Border */}
                <motion.div
                    className={`
            absolute -inset-1.5 rounded-3xl pointer-events-none
            bg-gradient-to-br blur-xl opacity-80
            ${glow}
          `}
                    style={{ zIndex: 0 }}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [0.97, 1.03, 0.97],
                        boxShadow: [
                            "0 0 24px 8px rgba(168,85,247,0.25)",
                            "0 0 40px 16px rgba(168,85,247,0.35)",
                            "0 0 24px 8px rgba(168,85,247,0.25)",
                        ],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
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
                    className="text-lg text-center mb-8 text-gray-800 dark:text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="font-semibold text-purple-500 dark:text-purple-300">Tip:</span> {tip}
                </motion.p>
                {/* Button */}
                <motion.button
                    onClick={onBack}
                    className="mt-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    whileHover={{ scale: 1.08, boxShadow: "0 0 32px 8px #a855f7" }}
                    whileTap={{ scale: 0.96 }}
                >
                    Analyze Another
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Result; 