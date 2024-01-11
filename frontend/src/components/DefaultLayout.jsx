import React, { useState, useEffect } from "react";
import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import {
  BiUserCircle,
  BiMailSend,
  BiLockAlt,
  BiMenu,
  BiTransferAlt,
  BiCategory,
} from "react-icons/bi";
import { FiLogOut, FiHome } from "react-icons/fi";
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
import Search from "./Search";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  const handleItemClick = (path) => {
    navigate(path);
  };
  const { user } = useSelector((state) => state.getUserInfoReducer);

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="" />,
    },
    {
      name: "Transaction",
      path: "/transaction",
      icon: <BiTransferAlt className="text-lg" />,
    },
    {
      name: "Category",
      path: "/category",
      icon: <BiCategory className="" />,
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
    <div className="flex flex-col md:flex-row">
      {" "}
      <div className="sidebar hidden md:block sticky top-0 borderstyle dark:border-slate-600 border-r min-w-60 min-h-screen ">
        <div className="flex flex-col gap-y-4 relativeh-full">
          <div className="flex items-center justify-center gap-2 py-4">
            <img
              src={logo}
              alt="logo"
              className="w-7 h-7 cursor-pointer -mt-2"
              onClick={() => {
                navigate("/home");
              }}
            />
            <span
              className="text-xl font-bold text-slate-700 tracking-wide pr-4 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              Expense Tracker
            </span>
          </div>
          <div className="flex flex-col gap-y-2 mt-2">
            {paths.map((path, index) => (
              <div
                key={index}
                className={`cursor-pointer flex items-center font-normal mx-3 gap-2  py-2 px-2
                 ${
                   (path.path === "/home" || path.path === "/dashboard") &&
                   (activePath === "/home" || activePath === "/dashboard")
                     ? "text-white bg-primary rounded-md font-normal"
                     : activePath === path.path
                     ? "text-white bg-primary rounded-md font-normal"
                     : "text-slate-500"
                 }`}
                onClick={() => handleItemClick(path.path)}
              >
                {path.icon}
                {path.name}
              </div>
            ))}
          </div>{" "}
          {/* log out button */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer mx-4 text-slate-500 absolute bottom-1/3 borderstyle border-dashed">
            <FiLogOut className="text-lg" />
            <span
              className="text-base font-medium"
              onClick={() => {
                message.loading("Logging out...", 0.5);
                setTimeout(() => {
                  dispatch(removeUserInfo());
                  message.success("Your Logged Out Successfully");
                  localStorage.removeItem("token");
                  navigate("/login");
                }, 500);
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center bg-white border-b borderstyle py-3 px-[10px] md:px-16 ">
          <Search />
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
        <div className=" py-4 bg-slate-100/50  px-[10px] md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
