import React, { useState, useEffect } from "react";
import "../resources/default-layout.css";
import Profile from "./Profile";
import SheetComponent from "./Sheet";
import AvatorComponent from "./AvatorComponent";
import Search from "./Search";
import Sidebar from "./Sidebar";

function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row">
      {" "}
      {/* sidebar */}
      <Sidebar />
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center light:bg-white dark:bg-background border-b light:borderstyle dark:border-none py-3 px-[10px] md:px-16 ">
          <Search />
          <AvatorComponent />
        </div>
        <SheetComponent />
        <div className="min-h-screen py-4  bg-slate-100/50 dark:bg-[#091127] px-[10px] md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
