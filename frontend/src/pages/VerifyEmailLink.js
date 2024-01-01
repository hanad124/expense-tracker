import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link} from 'react-router-dom'
import { verifyemaillink } from '../apicalls/users'

function VerifyEmailLink() {
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
      message.loading(`Sending Verification Link to email ${values.email} ...`,0.5)
      const response = await verifyemaillink(userObj);
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
            <div data-aos="fade-up" className='mt-2'>
            <h1>Verify <i className="ri-user-follow-line"></i></h1>
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
                  <button className='primary btn btn-secondary' type="submit">Verify</button>
                </div>
                <div className='mt-2' data-aos="fade-up"><Link to="/resetPasswordLink">Forgot Password?</Link></div>
            </Form>
        </Col>
        <Col md={6}>
         <div data-aos="fade-up">
         <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_TmlaLLUqvP.json" background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  )
}

export default VerifyEmailLink