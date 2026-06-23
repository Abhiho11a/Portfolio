import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { DataProvider } from './DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NeuralMap from './components/NeuralMap';
import ProjectLab from './components/ProjectLab';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import TerminalUI from './components/Terminal';
import ProofOfWork from './components/ProofOfWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ThemeSwitcher from './components/ThemeSwitcher';
import AmbientBackground from './components/AmbientBackground';
import SectionDivider from './components/SectionDivider';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor from './pages/AdminEditor';
import ProtectedRoute from './components/ProtectedRoute';

// Toaster
import { Toaster } from 'react-hot-toast';

function PortfolioLayout() {
  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans relative overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="fixed inset-0 z-[999] pointer-events-none bg-noise" />
      <CursorGlow />
      <ThemeSwitcher />
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <NeuralMap />
        <SectionDivider />
        <ProjectLab />
        <SectionDivider />
        <CurrentlyBuilding />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <TerminalUI />
        <SectionDivider />
        <ProofOfWork />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit/:section" 
            element={
              <ProtectedRoute>
                <AdminEditor />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card-strong)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
            },
          }}
        />
      </DataProvider>
    </ThemeProvider>
  );
}
