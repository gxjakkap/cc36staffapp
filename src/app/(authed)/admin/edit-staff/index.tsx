"use client";

import { createContext } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2Icon } from "lucide-react";

import { UWRWithUsername } from "../staff-table";
import DropdownMenuDeleteStaff from "./delete";
import DropdownMenuEditStaff from "./edit";

interface EditStaffProps {
  user: UWRWithUsername | undefined;
}

export const EditStaffContext = createContext<EditStaffProps>({
  user: undefined,
});

function EditStaff(props: EditStaffProps) {
  return (
    <EditStaffContext.Provider value={props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings2Icon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{props.user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuEditStaff />
          <DropdownMenuDeleteStaff />
        </DropdownMenuContent>
      </DropdownMenu>
    </EditStaffContext.Provider>
  );
}
export default EditStaff;
