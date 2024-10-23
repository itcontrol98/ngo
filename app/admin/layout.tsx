import React from "react";
import Menu from "@/app/components/admin/Menu";
import Sidebar from "@/app/components/admin/SideBar";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const metadata = {
  title: "Garbage Admin",
  description: "Garbage Admin Dashboard",
};

const AdminLayout = async({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()
  return (
    <div className="h-screen flex" id="AdminImage">
      <div className="hidden md:block w-[15%] py-3">
        <Menu role={currentUser?.role}/>
      </div>
      <div className="block md:hidden w-[15%] py-3">
        <Sidebar role={currentUser?.role} />
      </div>
      <div className="w-[100%] md:w-[85%] overflow-scroll flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
