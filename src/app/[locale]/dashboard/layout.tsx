import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { requireAdmin } from "@/lib/helpers/require-admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <DashboardNav />

      <div className="p-4">{children}</div>
    </div>
  );
}
