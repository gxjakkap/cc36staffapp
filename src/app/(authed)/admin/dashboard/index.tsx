import { BoxIcon, PanelsTopLeftIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Academic from "./academic";

function Dashboard() {
  return (
    <Tabs defaultValue="tab-1" className="flex items-start justify-start">
      <TabsList className="flex h-auto items-start justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="tab-1"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <PanelsTopLeftIcon
            className="mb-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          วิชาการ
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <BoxIcon className="mb-1.5 opacity-60" size={16} aria-hidden="true" />
          ทะเบียน
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Academic />
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="text-muted-foreground p-4 text-center text-xl">
          Coming Soon
        </p>
      </TabsContent>
    </Tabs>
  );
}
export default Dashboard;
