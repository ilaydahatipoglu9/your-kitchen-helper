import AppShell from "@/components/layout/AppShell";
import { CrudTable } from "@/components/entity/CrudTable";

export default function PropertiesPage() {
  return (
    <AppShell title="Properties">
      <div className="grid gap-4">
        <CrudTable
          title="Property inventory"
          createLabel="New property"
          rows={[
            { id: "p1", primary: "Harbor View Apartments", secondary: "24 units • Seattle, WA", status: "Active" },
            { id: "p2", primary: "Pine Street Duplex", secondary: "2 units • Tacoma, WA", status: "Active" },
            { id: "p3", primary: "Cedar Flats", secondary: "8 units • Bellevue, WA", status: "Inactive" },
          ]}
        />
      </div>
    </AppShell>
  );
}
