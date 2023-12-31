import React, { useState } from "react";
import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import { BiUserCircle, BiMailSend, BiLockAlt, BiMenu } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/header-icon.png";
import SheetComponent from "./Sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AvatorComponent from "./AvatorComponent";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.getUserInfoReducer);

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Transaction",
      path: "/transaction",
    },
    {
      name: "Category",
      path: "/category",
    },
  ];

  const name = user?.name;

  let initials = "";
  if (name) {
    const words = name.split(/\s+/); // Split by whitespace to handle multiple spaces

    // Check if there are words to create initials
    if (words.length > 0) {
      initials = words
        .slice(0, 2) // Take the first two words
        .map((word) => word.charAt(0).toUpperCase()) // Get the first letter (and convert to uppercase)
        .join(""); // Join the letters together
    }
  }

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div className="">
      <div className="hidden md:flex justify-between items-center bg-white border-b py-3 px-[10px] md:px-16 ">
        <div className="flex items-center gap-3 ">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            />
            <span
              className="text-2xl font-bold text-slate-700 tracking-wider border-r-2  border-r-slate-300 pr-4 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              Expense Tracker
            </span>
            <div className="ml-3 text-base flex items-center gap-4 font-medium ">
              {/* activate the menu as its path */}
              {paths.map((path, index) => (
                <div
                  key={index}
                  className={`cursor-pointer flex items-center font-normal flex-col-reverse ${
                    (path.path === "/home" || path.path === "/dashboard") &&
                    (window.location.pathname === "/home" ||
                      window.location.pathname === "/dashboard")
                      ? "text-primary border-slate-800 font-normal"
                      : window.location.pathname === path.path
                      ? "text-primary border-slate-800 font-normal"
                      : "text-slate-700"
                  }`}
                  onClick={() => {
                    navigate(path.path);
                  }}
                >
                  {path.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AvatorComponent />
      </div>
      <SheetComponent />
      {show && (
        <Profile
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
      <div className=" py-5 bg-slate-100/50  px-[10px] md:px-16">
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
