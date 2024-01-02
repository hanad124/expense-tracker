import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { updateUserPassword } from "../apicalls/users";
import DefaultLayout from "../components/DefaultLayout";
import { FiChevronLeft } from "react-icons/fi";

function UpdatePassword() {
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
    };
    try {
      if (values.password === values.confirmPassword) {
        message.loading("Updating the password...", 0.5);
        const response = await updateUserPassword(tokenObj);
        if (response.success) {
          setTimeout(() => {
            message.success(response.message);
            navigate("/home");
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
    <DefaultLayout>
      <div className="flex justify-center items-center" data-aos="fade-up">
        <div className="flex flex-col w-full md:w-auto">
          {/* back button  */}
          <div
            className=" ttext-slate-700 flex items-center justify-start gap-1 cursor-pointer flex-start mb-2"
            onClick={() => navigate(-1)}
          >
            <p className="">
              <FiChevronLeft className="text-xl -mb-[2px] text-slate-600" />
            </p>
            <p className="text-slate-600 font-medium">Back to Home</p>
          </div>
          <div
            className="d-flex justify-content-center align-items-center rounded-md shadow-lg p-5 bg-white"
            data-aos="fade-down"
          >
            <div className="  w-full">
              <div data-aos="fade-up" className="mt-2">
                <div data-aos="fade-up" className="">
                  <p className="text-slate-700 text-xl font-bold">
                    Update Password
                  </p>
                </div>
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
                  <Input.Password className="w-full md:min-w-80 h-full py-[8px]" />
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
                  <Input.Password className="w-full md:min-w-80 h-full py-[8px]" />
                </Form.Item>
                <div className="gap-4" data-aos="">
                  <button
                    className="primary btn bg-primary text-white w-full mt-2"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default UpdatePassword;
