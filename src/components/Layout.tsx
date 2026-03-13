import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

const links = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/chat', 'Chat'],
  ['/quiz', 'Quiz'],
  ['/lessons', 'Lessons'],
  ['/career', 'Career'],
  ['/profile', 'Profile'],
];

export default function Layout() {
  const { darkMode, toggleDarkMode, user, xp } = useAppStore();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex">
          <aside className="hidden md:block w-64 border-r border-slate-800 p-4">
            <Link to="/" className="text-2xl font-bold text-primary">StudyHub 2.0</Link>
            <nav className="mt-6 space-y-2">
              {links.map(([to, label]) => (
                <NavLink key={to} to={to} className="block rounded px-3 py-2 hover:bg-slate-800 hover:text-white">
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-4 md:p-8">
            <header className="mb-6 flex items-center justify-between rounded-xl bg-slate-200/50 dark:bg-slate-900 p-4">
              <div>
                <p className="text-sm uppercase text-accent">{user?.role ?? 'guest'}</p>
                <h1 className="text-xl font-semibold">Welcome {user?.name ?? 'Learner'}</h1>
              </div>
              <div className="flex gap-3 items-center">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-sm">XP {xp}</span>
                <button onClick={toggleDarkMode} className="rounded bg-primary px-3 py-1 text-white">Toggle Theme</button>
              </div>
            </header>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
