import Navbar from "@/components/layout/navbar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex justify-center bg-slate-100 p-2 min-h-screen">
      <div className="w-full sm:w-[95%] md:w-[90%]">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
