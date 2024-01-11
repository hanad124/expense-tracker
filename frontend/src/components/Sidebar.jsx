import React, { useState, useEffect } from "react";
import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import { FiLogOut, FiHome } from "react-icons/fi";
import logo from "../assets/header-icon.png";
import {
  BiUserCircle,
  BiMailSend,
  BiLockAlt,
  BiMenu,
  BiTransferAlt,
  BiCategory,
} from "react-icons/bi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      name: "Transaction",
      path: "/transaction",
      icon: <BiTransferAlt className="text-lg" />,
    },
    {
      name: "Category",
      path: "/category",
      icon: <BiCategory className="text-lg" />,
    },
  ];
  return (
    <div>
      <div className="sidebar hidden md:block sticky top-0 borderstyle dark:border-slate-600 border-r min-w-60 min-h-screen ">
        <div className="flex flex-col gap-y-4 relativeh-full">
          <div className="flex items-center justify-center gap-2 py-4">
            <img
              src={logo}
              alt="logo"
              className="w-7 h-7 cursor-pointer -mt-1"
              onClick={() => {
                navigate("/home");
              }}
            />
            <span
              className="text-xl font-bold text-primary tracking-wide pr-4 cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              Exp. Tracker
            </span>
          </div>
          <div className="flex flex-col gap-y-2 mt-2">
            {paths.map((path, index) => (
              <div
                key={index}
                className={`cursor-pointer flex items-center font-normal mx-3 gap-3  py-2 px-2
                 ${
                   (path.path === "/home" || path.path === "/dashboard") &&
                   (activePath === "/home" || activePath === "/dashboard")
                     ? "text-primary bg-blue-500/10   rounded-md font-normal"
                     : activePath === path.path
                     ? "text-primary bg-blue-500/10  rounded-md font-normal"
                     : "text-slate-600 font-normal"
                 }`}
                onClick={() => handleItemClick(path.path)}
              >
                {path.icon}
                {path.name}
              </div>
            ))}
          </div>{" "}
          {/* log out button */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer  text-slate-600 -mt-3">
            <FiLogOut className="text-lg" />
            <span
              className="text-base font-normal"
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
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
