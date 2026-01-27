import React from "react";
import Sidebar from "@/components/Dashboard/SideBar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="h-full flex flex-col items-center">
            <Sidebar/>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
}