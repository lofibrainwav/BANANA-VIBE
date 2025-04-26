import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProtectedLayout>
  );
} 