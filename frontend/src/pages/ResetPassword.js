import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import {Form, Input, message} from 'antd';
import axios from "axios";
import { resetPassword } from "../apicalls/users";
function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: 'Entered ${label} is not a valid email!',
    },
};
  const onFinish = async (values) => {
    const tokenObj = {
        pass: values.password,
        token: params.id,
    }
    try {
      if(values.password===values.confirmPassword){
        message.loading("Resetting the password...",0.5);
        const response = await resetPassword(tokenObj);
        if (response.success) {
         setTimeout(()=>{
            message.success(response.message);
            navigate("/login");
        },500)
        } else {
          setTimeout(()=>{
            message.error(response.message);
        },500)
       }
      }
    } catch (error) {
      setTimeout(()=>{
        message.error(error.message);
      },500)
    }
  };

  return (
    <Container className='p-5 register' data-aos="fade-up">
       <Row className='d-flex justify-content-center align-items-center shadow-lg p-5 bg-white' data-aos="fade-down">
        <Col md={6}>
            <div data-aos="fade-up" className='mt-2'>
            <h1>Reset Forgot Password <i className="ri-user-settings-line"></i></h1>
            <hr/>
            </div>
            <Form layout="vertical" className='mt-4' onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item label="New Password" name="password" data-aos="fade-up" 
                 rules={[{
                  required: true,
                 },
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Confirm New Password" name="confirmPassword" data-aos="fade-up" 
                 rules={[{
                  required: true,
                 },
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <div className='d-flex justify-content-between align-items-center' data-aos="fade-up">
                  <Link to="/login">Already have an account, Click here to Login</Link>
                  <button className='primary btn btn-primary' type="submit">Reset</button>
                </div>
                <div className='mt-2' data-aos="fade-up"><Link to="/verifyEmailLink">Not Verified Yet, Verify your Account here</Link></div>
            </Form>
        </Col>
        <Col md={6}>
         <div data-aos="fade-up">
         <lottie-player src="https://lottie.host/af1502aa-38de-4a84-ac67-4172ce27450c/8DXnz7bud0.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  );
}

export default ResetPassword;