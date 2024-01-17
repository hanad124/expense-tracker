import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle, BiMailSend, BiLockAlt, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const AvatorComponent = () => {
  const { setTheme, themes, theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const name = user?.name;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

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

  // log the current theme

  return (
    <>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="dark:bg-background border-[.6px] dark:border-slate-700 "
          >
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] dark:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-[.7px] dark:border-slate-700"
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center dark:text-slate-400 ">
          <div className="flex items-center dark:text-slate-400 rounded-md ">
            <DropdownMenu className="">
              <DropdownMenuTrigger className="">
                <div className=" border-slate-400 border-[1px] dark:border-slate-600 dark:border-[1px] rounded-full p-[1.4px]">
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>{" "}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-56 border-[.7px] dark:border-slate-700">
                <DropdownMenuItem
                  onClick={() => setShow(true)}
                  className="flex cursor-pointer items-center text-slate-600 dark:text-slate-400 gap-1"
                >
                  <BiUserCircle className="w-6 font-bold text-lg" />
                  <span>{name}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem
            onClick={() => setShow(true)}
            className="flex cursor-pointer items-center text-slate-600 dark:text-slate-400 gap-1"
          >
            <BiUserCircle className="w-6 font-bold text-lg" />
            <span>Edit Profile</span>
          </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={() => navigate("/updateEmail")}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <BiMailSend className="w-6 font-bold text-lg" />
                  <span> Update Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/updatePassword")}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <BiLockAlt className="w-6 font-bold text-lg" />
                  <span>Edit Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    message.loading("Logging out...", 0.5);
                    setTimeout(() => {
                      dispatch(removeUserInfo());
                      message.success("Your Logged Out Successfully");
                      localStorage.removeItem("token");
                      navigate("/login");
                    }, 500);
                  }}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <FiLogOut className="w-6 font-bold text-lg" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {show && (
              <Profile
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatorComponent;
