import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RoleGuard from './components/RoleGuard';
import AuthPage from './pages/AuthPage';
import CareerPage from './pages/CareerPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LessonsPage from './pages/LessonsPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/onboarding" element={<RoleGuard><OnboardingPage /></RoleGuard>} />
      <Route element={<RoleGuard><Layout /></RoleGuard>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/lessons" element={<RoleGuard role="teacher"><LessonsPage /></RoleGuard>} />
        <Route path="/career" element={<RoleGuard role="professional"><CareerPage /></RoleGuard>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
