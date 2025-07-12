import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Result from './components/Result';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';

function ResultPageWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { emotion, tip } = location.state || {};
  return (
    <Result
      emotion={emotion}
      tip={tip}
      onBack={() => navigate('/')}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/result" element={<ResultPageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
