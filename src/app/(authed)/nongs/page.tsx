import { Suspense } from "react";
import { ResTable } from "@/components/res-table";
import { db } from "@/db";
import { user } from "@/db/schema";

function TableSkeleton() {
  return (
    <div className="container mx-auto mt-4">
      <div className="rounded-md border animate-pulse">
        <div className="h-[400px] bg-muted" />
      </div>
    </div>
  );
}

async function DataTable() {
  const data = await db
    .select({
      id: user.id,
      fullname: user.fullname,
      gender: user.gender,
      phone: user.telephone,
      email: user.email,
      hasSubmit: user.hasSubmitAnswer,
    })
    .from(user);

  return (
    <ResTable
      data={data.filter(
        (u) =>
          u.fullname !== null &&
          u.email !== null &&
          u.gender !== null &&
          u.phone !== null,
      )}
    />
  );
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
