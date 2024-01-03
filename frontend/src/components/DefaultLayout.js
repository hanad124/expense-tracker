import React, { useState } from "react";
import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import { BiUserCircle, BiMailSend, BiLockAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div className="">
      <div className=" flex justify-between items-center bg-primary/95 py-3 px-[10px] md:px-16 ">
        <h1
          className="
          text-white 
          font-bold
          tracking-widest
          uppercase
          text-lg
          cursor-pointer
          md:text-2xl"
          onClick={() => navigate("/")}
        >
          Expense Tracker
        </h1>
        <div className="flex align-items-center text-white">
          <div className="flex items-center text-white border rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className=" text-white flex items-center px-1 py-1 gap-2">
                  <BiUserCircle className="w-6 font-bold text-lg" />
                  <span className="text-sm">{user?.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setShow(true)}
                  className="flex cursor-pointer items-center text-slate-600 gap-1"
                >
                  <BiUserCircle className="w-6 font-bold text-lg" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
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
          </div>
        </div>
      </div>
      {show && (
        <Profile
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
      <Container className=" py-5 rounded mt-10">{children}</Container>
    </div>
  );
}

export default DefaultLayout;
