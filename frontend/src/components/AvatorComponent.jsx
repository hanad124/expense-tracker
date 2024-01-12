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

const AvatorComponent = () => {
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
  return (
    <div className="flex items-center text-slate-700 ">
      <div className="flex items-center text-slate-700 rounded-md ">
        <DropdownMenu className="">
          <DropdownMenuTrigger className="">
            <div className="border rounded-full p-[1.4px]">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>{" "}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-56">
            <DropdownMenuItem
              onClick={() => setShow(true)}
              className="flex cursor-pointer items-center text-slate-600 gap-1"
            >
              <BiUserCircle className="w-6 font-bold text-lg" />
              <span>{name}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
            onClick={() => setShow(true)}
            className="flex cursor-pointer items-center text-slate-600 gap-1"
          >
            <BiUserCircle className="w-6 font-bold text-lg" />
            <span>Edit Profile</span>
          </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => navigate("/updateEmail")}
              className="flex gap-1 cursor-pointer items-center text-slate-600"
            >
              <BiMailSend className="w-6 font-bold text-lg" />
              <span> Update Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/updatePassword")}
              className="flex gap-1 cursor-pointer items-center text-slate-600"
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
              className="flex gap-1 cursor-pointer items-center text-slate-600"
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
  );
};

export default AvatorComponent;
