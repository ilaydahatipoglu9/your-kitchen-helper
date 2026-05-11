import AppShell from "@/components/layout/AppShell";
import { CrudTable } from "@/components/entity/CrudTable";

export default function TenantsPage() {
  return (
    <AppShell title="Tenants">
      <div className="grid gap-4">
        <CrudTable
          title="Tenant directory"
          createLabel="New tenant"
          rows={[
            { id: "t1", primary: "Avery Johnson", secondary: "Unit 12B • Lease ends 2026-03-31", status: "Active" },
            { id: "t2", primary: "Morgan Lee", secondary: "Unit 5D • Lease ends 2026-01-15", status: "Active" },
            { id: "t3", primary: "Jordan Patel", secondary: "Unit 2C • Move-out scheduled", status: "Inactive" },
          ]}
        />
      </div>
    </AppShell>
  );
}
