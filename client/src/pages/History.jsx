import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EmotionAnalytics from "../components/EmotionAnalytics";

const emotionIcons = {
    joy: "😊", happy: "😃", sadness: "😢", angry: "😠", fear: "😨", surprise: "😲", love: "❤️", calm: "😌", neutral: "🧠", error: "⚠️"
};

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("table");
    const email = localStorage.getItem("email") || "";

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.post("http://localhost:5000/history", { email });
                setHistory(res.data.history || []);
            } catch (err) {
                setError("Failed to fetch history");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [email]);

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100 dark:from-[#1a093b] dark:via-[#2d1a4d] dark:to-[#0a0a23]">
            {/* Hero Section */}
            <motion.div className="w-full text-center py-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }}>
                <div className="text-5xl mb-2">📊</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">Your Emotional Analytics</h2>
                <p className="text-xl text-gray-700 dark:text-gray-200">Discover patterns, trends, and insights from your emotional journey.</p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white/80 dark:bg-black/40 rounded-xl p-2 backdrop-blur-xl border border-white/30 dark:border-white/20">
                    {["table", "analytics"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab
                                    ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
                                    : "text-gray-600 dark:text-gray-300 hover:text-purple-500"
                                }`}
                        >
                            {tab === "table" && "📋 History"}
                            {tab === "analytics" && "📊 Analytics"}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div className="flex-1 w-full h-full bg-white/80 dark:bg-black/40 shadow-2xl p-0 m-0 backdrop-blur-xl border-t border-white/30 dark:border-white/20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                {loading ? (
                    <div className="text-center text-purple-400 pt-20 text-2xl">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 pt-20 text-2xl">{error}</div>
                ) : history.length === 0 ? (
                    <div className="text-center text-gray-500 pt-20 text-2xl">No history found.</div>
                ) : (
                    <div className="p-8">
                        {activeTab === "table" && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-lg text-left">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
                                            <th className="px-8 py-6 text-xl">Date</th>
                                            <th className="px-8 py-6 text-xl">Emotion</th>
                                            <th className="px-8 py-6 text-xl">Tip</th>
                                            <th className="px-8 py-6 text-xl">Text</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((entry, i) => (
                                            <motion.tr
                                                key={i}
                                                className="border-t border-white/20 hover:bg-pink-50/40 dark:hover:bg-purple-900/30 transition-colors"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + i * 0.04 }}
                                            >
                                                <td className="px-8 py-6 font-mono text-base text-gray-500 dark:text-gray-400 whitespace-nowrap">{new Date(entry.timestamp).toLocaleString()}</td>
                                                <td className="px-8 py-6 text-3xl">
                                                    <span className="mr-2 align-middle">{emotionIcons[entry.emotion?.toLowerCase()] || emotionIcons.neutral}</span>
                                                    <span className="font-semibold capitalize bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent text-xl align-middle">{entry.emotion}</span>
                                                </td>
                                                <td className="px-8 py-6 max-w-2xl truncate text-gray-700 dark:text-gray-200" title={entry.tip}>{entry.tip}</td>
                                                <td className="px-8 py-6 max-w-2xl truncate text-gray-500 dark:text-gray-300" title={entry.text}>{entry.text}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === "analytics" && (
                            <EmotionAnalytics history={history} />
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default History; 