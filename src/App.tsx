import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate } from
'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { OpportunityDiscovery } from './pages/OpportunityDiscovery';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { SupportCoaching } from './pages/SupportCoaching';
import { getCurrentUser } from './lib/user';
// Layout component to conditionally render Navbar/Footer
function Layout({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/onboarding';
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideNavFooter && <Footer />}
    </div>);

}
export function App() {
  const RequireUser = ({ children }: {children: React.ReactNode;}) => {
    const user = getCurrentUser();
    if (!user) return <Navigate to="/onboarding" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<RequireUser><Dashboard /></RequireUser>} />
          <Route path="/opportunities" element={<OpportunityDiscovery />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/support" element={<SupportCoaching />} />
        </Routes>
      </Layout>
    </Router>);

}