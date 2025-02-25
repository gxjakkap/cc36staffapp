import { ResTable } from "@/components/res-table";
import { db } from "@/db";
import { user } from "@/db/schema";

export default async function Home() {
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
    <div className={`flex flex-col w-screen font-geist-mono`}>
      <ResTable
        data={data.filter(
          (u) =>
            u.fullname !== null &&
            u.email !== null &&
            u.gender !== null &&
            u.phone !== null,
        )}
      />
    </div>
  );
}
