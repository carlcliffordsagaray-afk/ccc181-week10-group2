import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Navbar from './components/Navbar';
import BrandPanel from './components/BrandPanel';
import LoginForm from './components/LoginForm';
import WelcomeCard from './components/WelcomeCard';
import Footer from './components/Footer';
import { ApiError, clearToken, getMe, readToken, saveToken } from './api/auth';
import type { LoginResult, User } from './api/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
 
  const [checking, setChecking] = useState<boolean>(() => readToken() !== null);


  useEffect(() => {
    const token = readToken();
    if (!token) return;

    let ignore = false;
    getMe(token)
      .then((me) => {
        if (!ignore) setUser(me); 
      })
      .catch((error: unknown) => {
       
        if (error instanceof ApiError && error.kind === 'unauthorized') clearToken();
      })
      .finally(() => {
        if (!ignore) setChecking(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handleLoginSuccess(result: LoginResult) {
    saveToken(result.token);
    setUser(result.user);
  }

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  let panel: ReactNode;
  if (checking) {
    panel = (
      <section className="login-card session-check" role="status">
        <p className="session-check__text">Checking your session...</p>
      </section>
    );
  } else if (user) {
    panel = <WelcomeCard user={user} onLogout={handleLogout} />;
  } else {
    panel = <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="login-layout">
          <BrandPanel />
          {panel}
        </div>
      </main>
      <Footer />
    </div>
  );
}
