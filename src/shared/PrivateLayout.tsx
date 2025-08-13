import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function PrivateLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-10 h-screen w-screen bg-slate-200">
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        handleOpenSideBar={() => setIsSideBarOpen((prev) => !prev)}
      />
      <Outlet />
    </div>
  );
}
