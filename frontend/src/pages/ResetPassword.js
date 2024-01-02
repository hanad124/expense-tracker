import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import axios from "axios";
import { resetPassword } from "../apicalls/users";
function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Entered ${label} is not a valid email!",
    },
  };
  const onFinish = async (values) => {
    const tokenObj = {
      pass: values.password,
      token: params.id,
    };
    try {
      if (values.password === values.confirmPassword) {
        message.loading("Resetting the password...", 0.5);
        const response = await resetPassword(tokenObj);
        if (response.success) {
          setTimeout(() => {
            message.success(response.message);
            navigate("/login");
          }, 500);
        } else {
          setTimeout(() => {
            message.error(response.message);
          }, 500);
        }
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };

  return (
    <Container className="p-5 " data-aos="fade-up">
      <div className=" w-full flex justify-center">
        <div
          className="bg-white max-w-fit p-10 rounded-md"
          data-aos="fade-down"
        >
          <div md={6}>
            <div data-aos="fade-up" className="">
              <p className="text-slate-700 uppercase text-xl font-bold">
                Reset Forgot Password
              </p>
            </div>
            <Form
              layout="vertical"
              className="mt-4"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                label="New Password"
                name="password"
                data-aos="fade-up"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password className="w-full md:min-w-80 h-full py-[5px]" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                data-aos="fade-up"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password className="w-full md:min-w-80 h-full py-[5px]" />
              </Form.Item>
              <button
                className="primary btn bg-primary text-white w-full mt-2"
                type="submit"
              >
                Reset
              </button>
              <div
                className="d-flex justify-content-between align-items-center mt-4"
                data-aos="fade-up"
              >
                <Link to="/login">
                  Already have an account, Click here to Login
                </Link>
              </div>
              <div className="mt-2" data-aos="fade-up">
                <Link to="/verifyEmailLink">
                  Not Verified Yet, Verify your Account here
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ResetPassword;
