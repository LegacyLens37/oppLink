import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { OpportunityDiscovery } from './pages/OpportunityDiscovery';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { SupportCoaching } from './pages/SupportCoaching';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/onboarding';
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}

export function App() {
  return (
    <AuthProvider>
      <OpportunitiesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/onboarding"
              element={
                <RequireAuth>
                  <Onboarding />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/opportunities" element={<OpportunityDiscovery />} />
            <Route
              path="/opportunities/:id"
              element={
                <RequireAuth>
                  <OpportunityDetail />
                </RequireAuth>
              }
            />
            <Route path="/support" element={<SupportCoaching />} />
          </Routes>
        </Layout>
      </Router>
      </OpportunitiesProvider>
    </AuthProvider>
  );
}
