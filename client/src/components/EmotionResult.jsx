import React from "react";
import { motion } from "framer-motion";

const EmotionResult = ({ emotion, tip }) => {
    // Get emotion color based on emotion type
    const getEmotionColor = (emotion) => {
        const emotionLower = emotion.toLowerCase();
        if (emotionLower.includes('happy') || emotionLower.includes('joy') || emotionLower.includes('excited')) {
            return 'from-green-400 to-emerald-500';
        } else if (emotionLower.includes('sad') || emotionLower.includes('depressed') || emotionLower.includes('melancholy')) {
            return 'from-blue-400 to-cyan-500';
        } else if (emotionLower.includes('angry') || emotionLower.includes('frustrated') || emotionLower.includes('irritated')) {
            return 'from-red-400 to-orange-500';
        } else if (emotionLower.includes('anxious') || emotionLower.includes('worried') || emotionLower.includes('nervous')) {
            return 'from-yellow-400 to-amber-500';
        } else if (emotionLower.includes('calm') || emotionLower.includes('peaceful') || emotionLower.includes('relaxed')) {
            return 'from-teal-400 to-blue-500';
        } else if (emotionLower.includes('love') || emotionLower.includes('grateful') || emotionLower.includes('appreciative')) {
            return 'from-pink-400 to-rose-500';
        } else {
            return 'from-violet-400 to-purple-500';
        }
    };

    const emotionColor = getEmotionColor(emotion);

    return (
        <motion.div
            className="bg-white/25 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-2xl -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-xl translate-y-12 -translate-x-12" />

            <div className="relative z-10">
                {/* Emotion section */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h3 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                        Detected Emotion
                    </h3>
                    <motion.div
                        className={`inline-block bg-gradient-to-r ${emotionColor} text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        {emotion}
                    </motion.div>
                </motion.div>

                {/* Tip section */}
                <motion.div
                    className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            💡
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Personalized Insight
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                                {tip}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Encouraging message */}
                <motion.div
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <p className="text-sm text-gray-600 italic">
                        Remember, it's okay to feel this way. You're not alone. 🌟
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EmotionResult;
