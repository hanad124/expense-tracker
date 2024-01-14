import React, { useState } from "react";

import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/header-icon.png";
import AvatorComponent from "./AvatorComponent";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { BiUserCircle, BiMailSend, BiLockAlt, BiMenu } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
const SheetComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const name = user?.name;

  return (
    <div className="flex md:hidden light:bg-white dark:bg-background border-b py-3 px-[10px] md:px-16 ">
      <div className="flex justify-between w-full items-center">
        <div className="">
          {/* <BiMenu className="w-8 h-8 cursor-pointer text-slate-500" /> */}
          <Sheet>
            <SheetTrigger>
              <BiMenu className="w-8 h-8 cursor-pointer text-slate-500" />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                <SheetDescription>
                  <div className="flex flex-col items-start gap-2 justify-start">
                    <div className="flex items-center gap-2 mt-6">
                      <img
                        src={logo}
                        alt="logo"
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => {
                          navigate("/home");
                        }}
                      />
                      <span
                        className="text-2xl font-bold text-slate-700 dark:text-slate-400 tracking-wider  cursor-pointer"
                        onClick={() => {
                          navigate("/home");
                        }}
                      >
                        Expense Tracker
                      </span>
                    </div>

                    <div className=" text-base flex flex-col items-center font-medium w-full mt-2">
                      {/* activate the menu as its path */}
                      {paths.map((path, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer flex items-start border-b py-3 w-full flex-col-reverse ${
                            (path.path === "/home" ||
                              path.path === "/dashboard") &&
                            (window.location.pathname === "/home" ||
                              window.location.pathname === "/dashboard")
                              ? "text-primary border-primary font-bold"
                              : window.location.pathname === path.path
                              ? "text-primary border-primary font-bold"
                              : "text-slate-500 dark:text-slate-400 "
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
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AvatorComponent />
    </div>
  );
};

export default SheetComponent;
