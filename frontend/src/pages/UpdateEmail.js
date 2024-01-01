import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { updateUserEmail } from '../apicalls/users';
import DefaultLayout from '../components/DefaultLayout';

function UpdateEmail() {
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
   }
   try{
      message.loading(`Updating your new email details : ${values.email} ...`,0.5)
      const response = await updateUserEmail(userObj);
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
    <DefaultLayout>
      <Container className='p-5' data-aos="fade-up">
       <Row className='d-flex justify-content-center align-items-center shadow-lg p-5 bg-white' data-aos="fade-down">
        <Col md={6}>
            <div data-aos="fade-up" className='mt-2'>
            <h1>Update Email <i className="ri-user-follow-line"></i></h1>
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
                <Row className='gap-4' data-aos="fade-up">
                  <Col md={1} sm={12}>
                  <button className='btn btn-primary' onClick={()=>navigate(-1)}>Back</button>
                  </Col>
                  <Col md={1} sm={12}>
                  <button className='btn btn-success' type="submit">Update</button>
                  </Col>
                </Row>
            </Form>
        </Col>
        <Col md={6}>
         <div data-aos="fade-up">
         <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_TmlaLLUqvP.json" background="transparent"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
    </DefaultLayout>
  )
}

export default UpdateEmail