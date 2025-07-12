import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const pastelLight = {
    bg: "bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100",
    blob1: "from-pink-300/40 to-violet-300/40",
    blob2: "from-blue-300/40 to-cyan-300/40",
    blob3: "from-violet-300/40 to-pink-200/40",
    card: "bg-white/60 border-white/40",
    text: "text-gray-800",
    subtext: "text-gray-500",
    nav: "bg-white/40 border-white/30",
    navText: "text-violet-700",
    button: "bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-white",
    buttonGlow: "from-pink-300 via-violet-300 to-blue-300",
    result: "bg-white/70 border-white/40",
};
const pastelDark = {
    bg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    blob1: "from-pink-500/20 to-purple-500/20",
    blob2: "from-blue-500/20 to-cyan-500/20",
    blob3: "from-violet-500/20 to-pink-500/20",
    card: "bg-white/10 border-white/20",
    text: "text-white",
    subtext: "text-gray-300",
    nav: "bg-black/30 border-white/10 backdrop-blur-md",
    navText: "text-white",
    button: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white",
    buttonGlow: "from-purple-400 via-pink-400 to-blue-400",
    result: "bg-white/10 border-white/20",
};

const sunPath = "M12 4V2m0 20v-2m8-8h2M2 12H4m15.07-7.07l1.42-1.42M4.93 19.07l1.42-1.42M19.07 19.07l-1.42-1.42M4.93 4.93L6.35 6.35M12 6a6 6 0 100 12 6 6 0 000-12z";
const moonPath = "M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z";

const Home = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const theme = isDarkMode ? pastelDark : pastelLight;

    const analyzeEmotion = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            const response = await axios.post("http://localhost:5000/analyze", { text });
            setResult(response.data);
        } catch (error) {
            setResult({
                emotion: "Error",
                tip: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const navVariants = {
        hidden: { y: -80, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    };
    const logoVariants = {
        animate: {
            y: [0, -10, 0, 10, 0],
            rotate: [0, 10, -10, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        },
    };
    const blobVariants = {
        animate: {
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
            transition: { duration: 18, repeat: Infinity, ease: "linear" },
        },
    };
    const heroVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
    };
    const buttonVariants = {
        hover: { scale: 1.07, boxShadow: "0 0 40px 10px rgba(168,85,247,0.25)", transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } },
    };
    const resultVariants = {
        hidden: { opacity: 0, rotateY: -90 },
        visible: { opacity: 1, rotateY: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, rotateY: 90, transition: { duration: 0.5 } },
    };

    return (
        <div className={`min-h-screen w-full ${isDarkMode ? 'dark' : ''} relative transition-colors duration-700`}>
            {/* Full viewport background gradient */}
            <motion.div
                className={`fixed inset-0 z-0 w-screen h-screen ${theme.bg} transition-colors duration-700`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
            {/* Animated background blobs */}
            <div className="fixed inset-0 z-10 pointer-events-none">
                <motion.div
                    className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-r ${theme.blob1} rounded-full blur-3xl`}
                    variants={blobVariants}
                    animate="animate"
                />
                <motion.div
                    className={`absolute top-40 right-20 w-96 h-96 bg-gradient-to-r ${theme.blob2} rounded-full blur-3xl`}
                    variants={blobVariants}
                    animate="animate"
                    transition={{ delay: 5 }}
                />
                <motion.div
                    className={`absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r ${theme.blob3} rounded-full blur-3xl`}
                    variants={blobVariants}
                    animate="animate"
                    transition={{ delay: 10 }}
                />
            </div>
            {/* Main content wrapper above all backgrounds */}
            <div className="relative z-20 flex flex-col min-h-screen w-full items-center justify-start">
                {/* Animated Navbar */}
                <motion.nav
                    className={`sticky top-0 z-30 w-full flex items-center justify-between px-6 py-3 ${theme.nav} backdrop-blur-xl shadow-lg transition-colors duration-700`}
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                        <motion.div className="text-3xl" variants={logoVariants} animate="animate">
                            🧠
                        </motion.div>
                        <span className={`font-extrabold text-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-md transition-colors duration-700`}>MindAnalyzer</span>
                    </motion.div>
                    {/* Animated Light/Dark Toggle */}
                    <motion.button
                        onClick={() => setIsDarkMode((d) => !d)}
                        className="relative w-12 h-12 flex items-center justify-center rounded-full border border-white/30 bg-white/20 dark:bg-black/30 shadow-lg overflow-hidden group focus:outline-none"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.95, rotate: -10 }}
                        aria-label="Toggle light/dark mode"
                    >
                        <motion.svg
                            key={isDarkMode ? 'moon' : 'sun'}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-7 h-7 text-yellow-400 dark:text-purple-300"
                            initial={{ rotate: isDarkMode ? 90 : -90, scale: 0.7, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: isDarkMode ? -90 : 90, scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isDarkMode ? moonPath : sunPath}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.7 }}
                            />
                        </motion.svg>
                    </motion.button>
                </motion.nav>
                {/* Main Content */}
                <motion.div
                    className="flex flex-col items-center justify-center flex-1 w-full px-4 py-10"
                    initial="hidden"
                    animate="visible"
                >
                    {/* Hero Section */}
                    <motion.div className="text-center mb-12" variants={heroVariants} initial="hidden" animate="visible">
                        <motion.div className="text-8xl sm:text-9xl mb-6" variants={logoVariants} animate="animate">
                            🧠
                        </motion.div>
                        <motion.h1
                            className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Mental Health Analyzer
                        </motion.h1>
                        <motion.p
                            className={`text-xl max-w-2xl mx-auto leading-relaxed ${theme.subtext}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            Share your thoughts and receive personalized insights with AI-powered emotion analysis
                        </motion.p>
                    </motion.div>
                    {/* Input Card */}
                    <motion.div className={`w-full max-w-3xl mb-8 rounded-2xl shadow-2xl ${theme.card} transition-colors duration-700`} variants={cardVariants} initial="hidden" animate="visible">
                        <motion.textarea
                            className={`w-full h-48 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 transition-all duration-300 ${theme.text}`}
                            placeholder="How are you feeling today? Share your thoughts, emotions, or what's on your mind..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            whileFocus={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)", transition: { duration: 0.2 } }}
                        />
                    </motion.div>
                    {/* Analyze Button */}
                    <motion.button
                        className={`relative px-10 py-4 rounded-xl font-semibold text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group transition-colors duration-700 ${theme.button}`}
                        onClick={analyzeEmotion}
                        disabled={loading || !text.trim()}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {/* Glowing effect */}
                        <motion.div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-gradient-to-r ${theme.buttonGlow}`}
                            layoutId="button-glow"
                        />
                        <span className="relative z-10 flex items-center gap-3">
                            {loading ? (
                                <>
                                    <motion.div
                                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    ✨ Analyze Emotion
                                </>
                            )}
                        </span>
                    </motion.button>
                    {/* Loading Animation */}
                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                className="mt-8 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="font-medium text-lg mb-4 text-purple-400 dark:text-purple-200"
                                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Processing your thoughts...
                                </motion.div>
                                <motion.div className="flex justify-center space-x-2">
                                    {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Result Section */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                className={`w-full max-w-3xl mt-8 rounded-2xl shadow-2xl ${theme.result} relative overflow-hidden transition-colors duration-700`}
                                variants={resultVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-xl translate-y-12 -translate-x-12" />
                                <div className="relative z-10">
                                    {/* Emotion Result */}
                                    <motion.div
                                        className="text-center mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                                            Detected Emotion
                                        </h3>
                                        <motion.div
                                            className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-2xl shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {result.emotion}
                                        </motion.div>
                                    </motion.div>
                                    {/* AI Insight */}
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                💡
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white mb-3 text-lg">
                                                    AI Insight
                                                </h4>
                                                <p className="text-gray-300 leading-relaxed text-lg">
                                                    {result.tip}
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
                                        <p className="text-gray-400 italic">
                                            Remember, your feelings are valid and you're not alone. 🌟
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
