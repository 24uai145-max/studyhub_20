import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import type { UserRole } from '../types';
import { useAppStore } from '../store/appStore';

export default function RoleGuard({ role, children }: PropsWithChildren<{ role?: UserRole }>) {
  const user = useAppStore((s) => s.user);

  if (!user) return <Navigate to="/auth" replace />;
  if (!user.role) return <Navigate to="/onboarding" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
