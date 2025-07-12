import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/login", form);
            localStorage.setItem("email", res.data.email);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100 dark:from-[#1a093b] dark:via-[#2d1a4d] dark:to-[#0a0a23] px-4">
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white/70 dark:bg-black/40 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-xl flex flex-col gap-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">Login</h2>
                <input name="email" type="email" required placeholder="Email" className="rounded-lg p-3 bg-white/80 dark:bg-black/30 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none" value={form.email} onChange={handleChange} />
                <input name="password" type="password" required placeholder="Password" className="rounded-lg p-3 bg-white/80 dark:bg-black/30 border border-white/30 focus:ring-2 focus:ring-purple-300 outline-none" value={form.password} onChange={handleChange} />
                {error && <div className="text-red-500 text-center">{error}</div>}
                <motion.button type="submit" className="mt-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 text-white shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </motion.button>
                <div className="text-center text-sm mt-2 text-gray-500 dark:text-gray-300">
                    Don't have an account? <span className="underline cursor-pointer text-purple-500" onClick={() => navigate('/register')}>Sign Up</span>
                </div>
            </motion.form>
        </div>
    );
};

export default Login; 