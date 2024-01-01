import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { loginUser } from '../apicalls/users'

function Login() {
  const navigate = useNavigate();
  const validateMessages = {
        required: '${label} is required!',
        types: {
          email: 'Entered ${label} is not a valid email!',
        },
  };
  const onFinish = async (values) => {
    const userObj = {
      email: values.email,
      password: values.password,
   }
   try{
      message.loading("Logging In...",0.5)
      const response = await loginUser(userObj);
      if(response.success){
          setTimeout(()=>{
           message.success(response.message);
           localStorage.setItem("token",response.data);
           window.location.href="/home";
          },500)
      }
      else{
          setTimeout(()=>{
              message.error(response.message);
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
            <div data-aos="fade-up" className='mt-2'>
            <h1>Login <i className="ri-user-shared-line"></i></h1>
            <hr/>
            </div>
            <Form layout="vertical" className='mt-4' onFinish={onFinish} validateMessages={validateMessages}>
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
                <div className='d-flex justify-content-between align-items-center' data-aos="fade-up">
                  <Link to="/register">Not Registered, Click here to Register</Link>
                  <button className='primary btn btn-success' type="submit">Login</button>
                </div>
                <div className='mt-2' data-aos="fade-up"><Link to="/verifyEmailLink">Not Verified Yet, Verify your Account here</Link></div>
                <div className='mt-2' data-aos="fade-up"><Link to="/resetPasswordLink">Forgot Password?</Link></div>
            </Form>
        </Col>
        <Col md={6}>
         <div data-aos="fade-up">
         {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_cohxzcyi.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player> */}
         <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_fw6h59eu.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  )
}

export default Login