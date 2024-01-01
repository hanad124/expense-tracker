import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link} from 'react-router-dom'
import { sendPasswordResetLink } from '../apicalls/users'

function ResetPasswordLink() {
  const validateMessages = {
        required: '${label} is required!',
        types: {
          email: 'Entered ${label} is not a valid email!',
        },
  };
  const onFinish = async (values) => {
    const userObj = {
      email: values.email,
   }
   try{
      message.loading(`Sending Password Link to email ${values.email} ...`,0.5)
      const response = await sendPasswordResetLink(userObj);
      if(response.success){
          setTimeout(()=>{
           message.success(response.message);
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
         <div data-aos="fade-up">
         <lottie-player src="https://lottie.host/82ffd468-ea6c-4858-9f43-7cb2a4e546d3/6Fia2MKdIk.json"  background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
        <Col md={6}>
            <div data-aos="fade-up" className='mt-2'>
            <h1>Reset Password Request <i className="ri-user-search-line"></i></h1>
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
                <div className='d-flex justify-content-between align-items-center' data-aos="fade-up">
                  <Link to="/login">Verified Account, Click here to Login</Link>
                  <button className='primary btn btn-secondary' type="submit">Send Link</button>
                </div>
            </Form>
        </Col>
       </Row>
    </Container>
  )
}

export default ResetPasswordLink