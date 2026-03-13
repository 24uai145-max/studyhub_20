import { useAppStore } from '../store/appStore';

export default function ProfilePage() {
  const { user, badges, xp, streak } = useAppStore();

  return (
    <div className="space-y-3 rounded border p-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Level: {user?.level}</p>
      <p>Goals: {user?.goals}</p>
      <p>XP: {xp}</p>
      <p>Streak: {streak}</p>
      <p>Badges: {badges.join(', ') || 'No badges yet'}</p>
    </div>
  );
}
