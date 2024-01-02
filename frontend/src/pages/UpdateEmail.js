import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { updateUserEmail } from "../apicalls/users";
import DefaultLayout from "../components/DefaultLayout";
import { FiChevronLeft } from "react-icons/fi";

function UpdateEmail() {
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
    };
    try {
      message.loading(
        `Updating your new email details : ${values.email} ...`,
        0.5
      );
      const response = await updateUserEmail(userObj);
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
    <DefaultLayout>
      <div className="flex justify-center items-center" data-aos="fade-up">
        <div className="flex flex-col  w-full md:w-auto" data-aos="fade-down">
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

          <div className=" shadow-lg p-5 bg-white rounded-md">
            <div data-aos="fade-up" className="">
              <p className="text-slate-700 text-xl font-bold">Update Email</p>
            </div>
            <Form
              layout="vertical"
              className="mt-4 "
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
                <Input className="w-full md:min-w-80 h-full py-[10px]" />
              </Form.Item>
              <div className="gap-4" data-aos="fade-up">
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
    </DefaultLayout>
  );
}

export default UpdateEmail;
