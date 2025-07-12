import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval, parseISO } from "date-fns";

const emotionIcons = {
    joy: "😊", happy: "😃", sadness: "😢", angry: "😠", fear: "😨", surprise: "😲", love: "❤️", calm: "😌", neutral: "🧠", error: "⚠️"
};

const emotionColors = {
    joy: "#fbbf24", happy: "#fbbf24", sadness: "#60a5fa", angry: "#f87171", fear: "#a78bfa",
    surprise: "#34d399", love: "#f472b6", calm: "#6ee7b7", neutral: "#a3a3a3", error: "#f59e0b"
};

const emotionScores = {
    joy: 8, happy: 9, sadness: 2, angry: 1, fear: 3, surprise: 6, love: 10, calm: 7, neutral: 5, error: 4
};

const EmotionAnalytics = ({ history }) => {
    // Process data for daily analytics
    const getDailyEmotionData = () => {
        const grouped = {};
        history.forEach(entry => {
            const date = format(new Date(entry.timestamp), 'MMM dd');
            const emotion = entry.emotion?.toLowerCase() || "neutral";
            if (!grouped[date]) grouped[date] = {};
            grouped[date][emotion] = (grouped[date][emotion] || 0) + 1;
        });
        return Object.entries(grouped).map(([date, emotions]) => ({
            date,
            ...emotions,
        }));
    };

    // Process data for emotion distribution pie chart
    const getEmotionDistribution = () => {
        const emotionCounts = {};
        history.forEach(entry => {
            const emotion = entry.emotion?.toLowerCase() || "neutral";
            emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        });
        return Object.entries(emotionCounts).map(([emotion, count]) => ({
            name: emotion,
            value: count,
            color: emotionColors[emotion] || "#a3a3a3"
        }));
    };

    // Calculate mood trend over time
    const getMoodTrend = () => {
        const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return sortedHistory.map((entry, index) => {
            const emotion = entry.emotion?.toLowerCase() || "neutral";
            const score = emotionScores[emotion] || 5;
            return {
                date: format(new Date(entry.timestamp), 'MMM dd'),
                moodScore: score,
                emotion: emotion
            };
        });
    };

    // Generate insights based on emotion patterns
    const generateInsights = () => {
        if (history.length === 0) return [];

        const insights = [];
        const emotionCounts = {};
        const recentEmotions = history.slice(-7).map(h => h.emotion?.toLowerCase());

        // Count emotions
        history.forEach(entry => {
            const emotion = entry.emotion?.toLowerCase() || "neutral";
            emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        });

        // Most common emotion
        const mostCommon = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
        insights.push({
            type: "pattern",
            title: "Most Frequent Emotion",
            description: `You've felt ${mostCommon[0]} most often (${mostCommon[1]} times)`,
            icon: emotionIcons[mostCommon[0]] || "📊"
        });

        // Recent mood trend
        const recentScores = recentEmotions.map(e => emotionScores[e] || 5);
        const avgRecentScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
        const allScores = Object.values(emotionCounts).map(e => emotionScores[e] || 5);
        const avgAllScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;

        if (avgRecentScore > avgAllScore + 1) {
            insights.push({
                type: "positive",
                title: "Improving Mood",
                description: "Your recent mood has been better than your average!",
                icon: "📈"
            });
        } else if (avgRecentScore < avgAllScore - 1) {
            insights.push({
                type: "concern",
                title: "Mood Decline",
                description: "Your recent mood has been lower than usual. Consider reaching out for support.",
                icon: "📉"
            });
        }

        return insights;
    };

    const insights = generateInsights();

    return (
        <div className="space-y-12">
            {/* Daily Emotion Chart */}
            <div className="bg-white/70 dark:bg-black/30 rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Daily Emotion Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getDailyEmotionData()}>
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        {Object.keys(emotionColors).map(emotion => (
                            <Bar key={emotion} dataKey={emotion} stackId="a" fill={emotionColors[emotion]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/70 dark:bg-black/30 rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Emotion Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={getEmotionDistribution()}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {getEmotionDistribution().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/70 dark:bg-black/30 rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Mood Trend Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getMoodTrend()}>
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="moodScore" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Insights Section */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        AI-Generated Insights
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Based on your emotional patterns and trends
                    </p>
                </div>

                {insights.length === 0 ? (
                    <div className="text-center text-gray-500 text-xl">
                        Need more data to generate insights. Keep tracking your emotions!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {insights.map((insight, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-xl shadow-lg backdrop-blur-xl border ${insight.type === "positive"
                                        ? "bg-green-50/80 dark:bg-green-900/30 border-green-200 dark:border-green-700"
                                        : insight.type === "concern"
                                            ? "bg-red-50/80 dark:bg-red-900/30 border-red-200 dark:border-red-700"
                                            : "bg-white/70 dark:bg-black/30 border-white/30 dark:border-white/20"
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl mb-3">{insight.icon}</div>
                                <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                    {insight.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {insight.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Summary Stats */}
                <div className="bg-white/70 dark:bg-black/30 rounded-xl p-6 shadow-lg">
                    <h4 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Summary Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-purple-500">{history.length}</div>
                            <div className="text-gray-600 dark:text-gray-300">Total Entries</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-500">
                                {Object.keys(getEmotionDistribution()).length}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">Unique Emotions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-500">
                                {Math.round((history.length / Math.max(1, Math.ceil((new Date() - new Date(history[0]?.timestamp)) / (1000 * 60 * 60 * 24)))) * 10) / 10}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">Entries/Day</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-500">
                                {Math.round((getMoodTrend().reduce((sum, item) => sum + item.moodScore, 0) / getMoodTrend().length) * 10) / 10}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">Avg Mood Score</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmotionAnalytics; 