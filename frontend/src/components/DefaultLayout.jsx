import React, { useState, useEffect } from "react";
import "../resources/default-layout.css";
import { useDispatch, useSelector } from "react-redux";
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
        <div className="hidden md:flex justify-between items-center bg-white border-b borderstyle py-3 px-[10px] md:px-16 ">
          <Search />
          <AvatorComponent />
        </div>
        <SheetComponent />
        <div className=" py-4 bg-slate-100/50  px-[10px] md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
