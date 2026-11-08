import type { User } from '../api/auth';

interface WelcomeCardProps {
  user: User;
  onLogout: () => void;
}

export default function WelcomeCard({ user, onLogout }: WelcomeCardProps) {
  return (
    <section className="login-card welcome-card" aria-labelledby="welcome-title">
      <h2 id="welcome-title" className="login-card__title welcome-card__title">
        {`Welcome, ${user.name}`}
      </h2>
      <p className="welcome-card__email">{user.email}</p>
      <button type="button" className="btn btn--secondary welcome-card__logout" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
}
