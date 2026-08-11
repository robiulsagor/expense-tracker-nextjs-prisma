"use client";

import { useSidebar } from "@/store";
import { Menu } from "lucide-react";
import MobileSidebar from "../shared/MobileSidebar";

const SidebarWrapper = () => {
    const toggleSidebar = useSidebar(state=> state.toggle);
  return (
    <div className="md:hidden">
      <Menu className="w-8 h-8 text-slate-700 md:hidden cursor-pointer" onClick={toggleSidebar} />

      <MobileSidebar/>
    </div>
  )
}

export default SidebarWrapper
