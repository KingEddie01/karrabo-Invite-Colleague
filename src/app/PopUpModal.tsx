import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdOutlineCalendarViewDay, MdOutlineAddReaction } from "react-icons/md";
import { Colleague } from "./types";

interface PopoverDemoProps {
  onUpdateRole: (role: Colleague | null) => void;
  selectedRole: Colleague | null;
}

export function PopoverDemo({ onUpdateRole, selectedRole }: PopoverDemoProps) {
  return (
    <div className="w-96 flex flex-col justify-start gap-2 p-2 rounded-lg">
      <Button
        className="bg-transparent text-[#48505E] flex gap-2 hover:bg-[#E9F0E7] w-52 py-6 border-none shadow-none justify-start hover:text-[#235C0F]"
        onClick={() => onUpdateRole(selectedRole)}
        aria-label="Update role"
      >
        <MdOutlineAddReaction className="text-2xl" />
        Update role
      </Button>
      <Button
        className="bg-transparent text-[#48505E] flex gap-2 hover:bg-[#E9F0E7] w-52 py-6 border-none shadow-none justify-start hover:text-[#235C0F]"
        aria-label="Edit details"
      >
        <MdOutlineCalendarViewDay className="text-2xl" />
        Edit details
      </Button>
      <Button
        className="bg-transparent flex gap-2 hover:bg-[#E9F0E7] hover:border-[#E9F0E7] w-52 py-6 border-none shadow-none justify-start"
        aria-label="Deactivate"
      >
        <Image src="/switch.png" width={19} height={16} alt="edit-icon" />
        <span className="text-[#F04438]">Deactivate</span>
      </Button>
    </div>
  );
}
