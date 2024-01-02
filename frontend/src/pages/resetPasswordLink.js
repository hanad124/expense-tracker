import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { sendPasswordResetLink } from "../apicalls/users";
import { LuExternalLink } from "react-icons/lu";

function ResetPasswordLink() {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Entered ${label} is not a valid email!",
    },
  };
  const onFinish = async (values) => {
    const userObj = {
      email: values.email,
    };
    try {
      message.loading(
        `Sending Password Link to email ${values.email} ...`,
        0.5
      );
      const response = await sendPasswordResetLink(userObj);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
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
    <div className="p-5 " data-aos="fade-up">
      <div
        className="flex justify-center items-center shadow-lg p-5 bg-white rounded-md"
        // data-aos="fade-down"
      >
        <div md={6}>
          <div data-aos="fade-up" className="">
            <p className="text-slate-700 uppercase text-xl font-bold">
              Reset Password Request
            </p>
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
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input className="border py-2" />
            </Form.Item>{" "}
            <button
              className="primary btn bg-primary text-white w-full  mt-2"
              type="submit"
            >
              Send Link
            </button>
            <div
              className="d-flex justify-content-between align-items-center mt-4"
              data-aos="fade-up"
            >
              <Link
                to="/login"
                className="text-primary flex items-center gap-1"
              >
                Verified Account, Click here to Login
                <LuExternalLink className="" />
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordLink;
