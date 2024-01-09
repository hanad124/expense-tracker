import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apicalls/users";
import { HiOutlineCreditCard } from "react-icons/hi";
import { LuExternalLink } from "react-icons/lu";

function Login() {
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Entered ${label} is not a valid email!",
    },
  };
  const onFinish = async (values) => {
    const userObj = {
      email: values.email,
      password: values.password,
    };
    try {
      message.loading("Logging In...", 0.5);
      const response = await loginUser(userObj);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          localStorage.setItem("token", response.data);
          window.location.href = "/home";
        }, 500);
      } else {
        setTimeout(() => {
          message.error(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };
  return (
    <div className="md:p-5  " data-aos="fade-up">
      <div className=" w-full flex justify-center">
        <div className="bg-white max-w-fit p-10 rounded-md">
          <div data-aos="" className="">
            {/* <h1 className="flex items-center text-center gap-2 "> */}
            {/* <HiOutlineCreditCard className="text-3xl text-slate-700" /> */}
            <p className="text-2xl font-bold text-slate-700 tracking-widest uppercase">
              {/* EXPENSE TRACKER */}
              login
            </p>
            {/* </h1> */}
            <h1 className="text-lg text-left font-medium text-slate-600 mt-4 tracking-widest">
              Welcome Back 👋
            </h1>
          </div>
          <Form
            layout="vertical"
            className="mt-4"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Email"
              name="email"
              className="text-slate-600 font-light"
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input
                className="border focus:border-blue-600 py-[9px] w-full md:min-w-80 h-full  "
                placeholder="example@gmail.com"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="text-slate-600 font-light"
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                className=" py-[7px] w-full md:min-w-80 h-full "
                placeholder="enter password..."
              />
            </Form.Item>{" "}
            <button
              className="primary btn bg-primary text-white w-full"
              type="submit"
            >
              Login
            </button>
            <div
              className="flex gap-1 items-center mt-4 text-primary"
              // data-aos="fade-up"
            >
              <Link to="/register" className="cursor-pointer">
                Not Registered, Click here to Register
              </Link>
              <LuExternalLink className="" />
            </div>
            <div
              className="mt-2 flex items-center gap-1 text-primary"
              data-aos="fade-up"
            >
              <Link to="/verifyEmailLink">
                Not Verified Yet, Verify your Account here
              </Link>
              <LuExternalLink className="" />
            </div>
            <div
              className="mt-2 flex items-center gap-1 text-primary "
              // data-aos="fade-up "
            >
              <Link to="/resetPasswordLink ">Forgot Password?</Link>
              <LuExternalLink className="" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
