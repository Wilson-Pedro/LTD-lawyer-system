import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROLE } from '@/constants/roles';
import { AdminDashboard } from '../components/AdminDashboard';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mt-6">
        {user?.role === ROLE.ADMIN && <AdminDashboard />}
        {/* próximas roles entram aqui: PROFESSOR, COORDENADOR, etc */}
      </div>
    </div>
  );
}
