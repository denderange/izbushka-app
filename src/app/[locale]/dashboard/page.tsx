import { requireAdmin } from "@/lib/helpers/require-admin";

export default async function DashboardPage() {
  const session = await requireAdmin();

  return <div>Dashboard</div>;
}
