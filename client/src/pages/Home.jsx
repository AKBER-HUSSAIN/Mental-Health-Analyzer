import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
    {
        icon: "💬",
        title: "AI-Powered Insights",
        desc: "Get instant, compassionate feedback and tips for your thoughts using advanced AI."
    },
    {
        icon: "📊",
        title: "Mood Tracking",
        desc: "Track your emotional journey and visualize your progress over time."
    },
    {
        icon: "🔒",
        title: "Private & Secure",
        desc: "Your data is confidential and protected with modern security best practices."
    }
];

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100 dark:from-[#1a093b] dark:via-[#2d1a4d] dark:to-[#0a0a23] px-4 overflow-x-hidden">
            {/* Animated floating blobs */}
            <motion.div
                className="fixed top-0 left-0 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl z-0"
                animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="fixed bottom-0 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl z-0"
                animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Hero Section */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center py-24"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                <motion.div
                    className="text-8xl mb-6 drop-shadow-xl"
                    animate={{ y: [0, -16, 0, 16, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    🧠
                </motion.div>
                <motion.h1
                    className="text-5xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Welcome to MindAnalyzer
                </motion.h1>
                <motion.p
                    className="text-xl text-center max-w-2xl text-gray-700 dark:text-gray-200 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    <span className="font-semibold text-purple-500 dark:text-purple-300">Your AI-powered companion for emotional wellness.</span> <br />
                    Analyze your thoughts, get personalized tips, and track your mood journey—all in a private, beautifully designed space.
                </motion.p>
                <div className="flex gap-6 mt-4">
                    <motion.button
                        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </motion.button>
                    <motion.button
                        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </motion.button>
                </div>
            </motion.div>
            {/* Features Section */}
            <motion.div
                className="relative z-10 w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
                }}
            >
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        className="bg-white/80 dark:bg-black/40 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center backdrop-blur-xl border border-white/30 dark:border-white/20"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 80, damping: 18 }}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(168,85,247,0.10)" }}
                    >
                        <div className="text-4xl mb-3 animate-bounce-slow">{f.icon}</div>
                        <div className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            {f.title}
                        </div>
                        <div className="text-gray-700 dark:text-gray-200">{f.desc}</div>
                    </motion.div>
                ))}
            </motion.div>
            {/* Eye-catching Callout */}
            <motion.div
                className="relative z-10 mt-20 mb-10 max-w-2xl text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <div className="inline-block px-8 py-5 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 shadow-xl border border-white/30 dark:border-white/10">
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Start your journey to a healthier mind today. <br />
                        <span className="text-lg font-normal text-gray-700 dark:text-gray-200">No judgment. No pressure. Just support.</span>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
