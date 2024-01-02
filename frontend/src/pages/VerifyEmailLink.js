import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { verifyemaillink } from "../apicalls/users";
import { LuExternalLink } from "react-icons/lu";

function VerifyEmailLink() {
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
        `Sending Verification Link to email ${values.email} ...`,
        0.5
      );
      const response = await verifyemaillink(userObj);
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
    <div className="p-5" data-aos="fade-up">
      <div
        className="flex justify-center items-center shadow-lg p-5 bg-white rounded-md"
        data-aos="fade-down"
      >
        <div md={6}>
          <div data-aos="fade-up" className="">
            <p className="text-slate-700 uppercase text-xl font-bold">
              Verify your account
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
              <Input className="w-full md:min-w-80 h-full border py-2 " />
            </Form.Item>{" "}
            <button
              className="primary btn bg-primary text-white w-full mt-2 tracking-wide font-medium"
              type="submit"
            >
              Verify
            </button>
            <div
              className="flex gap-1 text-primary items-center mt-4"
              data-aos="fade-up"
            >
              <Link to="/login">Verified Account, Click here to Login</Link>
              <LuExternalLink className="" />
            </div>
            <div
              className="mt-2 flex items-center gap-1 text-primary"
              data-aos="fade-up"
            >
              <Link to="/resetPasswordLink">Forgot Password?</Link>
              <LuExternalLink className="" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailLink;
