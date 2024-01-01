import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { registerUser } from '../apicalls/users';

function Register() {
  const navigate = useNavigate();
  const validateMessages = {
        required: '${label} is required!',
        types: {
          email: 'Entered ${label} is not a valid email!',
        },
  };
  const onFinish = async(values) => {
     const userObj = {
        name: values.name,
        email: values.email,
        password: values.password,
     }
     try{
       if(values.password===values.confirmPassword){
        message.loading("Registering New User...",0.5)
        const response = await registerUser(userObj);
        if(response.success){
            setTimeout(()=>{
             message.success(response.message);
             navigate("/login");
            },500)
        }
        else{
            setTimeout(()=>{
                message.error(response.message);
            },500)
        }
       }
       else{
        setTimeout(()=>{
            message.error("Entered Passwords don't match.");
        },500)
       }
     }
     catch(error){
        setTimeout(()=>{
            message.error(error.message);
        },500)
     }
  }
  return (
    <Container className='p-5 register' data-aos="fade-up">
       <Row className='d-flex justify-content-center align-items-center shadow-lg p-5 bg-white' data-aos="fade-down">
        <Col md={6}>
         <div data-aos="fade-up">
         {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_cohxzcyi.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player> */}
         <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_yqyt4zdn.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
        <Col md={6}>
            <div data-aos="fade-up" className='mt-2'>
            <h1>Register <i className="ri-user-add-line"></i></h1>
            <hr/>
            </div>
            <Form layout="vertical" className='mt-4' onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item label="Name" name="name" data-aos="fade-up" rules={[{
                  required: true,
                 },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email" data-aos="fade-up" rules={[{
                  required: true,
                  type: 'email'
                 },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" data-aos="fade-up" 
                 rules={[{
                  required: true,
                 },
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Confirm Password" name="confirmPassword" data-aos="fade-up"
                 rules={[{
                  required: true,
                 },
                ]}
                >
                    <Input.Password/>
                </Form.Item>
                <div className='d-flex justify-content-between align-items-center' data-aos="fade-up">
                  <Link to="/login">Already Registered, Click here to Login</Link>
                  <button className='primary btn btn-danger' type="submit">Register</button>
                </div>
            </Form>
        </Col>
       </Row>
    </Container>
  )
}

export default Register