import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyemail } from "../apicalls/users";
import {message} from 'antd';
import {Container, Row, Col} from 'react-bootstrap';

function VerifyEmail() {
  const [emailVerified, setEmailVerified] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const verifyToken = async () => {
    const tokenObj = {
        token: params.id,
    }
    try {
      message.loading("Wait your email is getting verified...",0.5);
      const response = await verifyemail(tokenObj);
      if (response.success) {
        setTimeout(()=>{
            message.success(response.message);
            setEmailVerified("true");
        },500)
      } else {
        setTimeout(()=>{
            message.error(response.message);
            setEmailVerified("false");
        },500)
      }
    } catch (error) {
        setTimeout(()=>{
            message.error(error.message);
            setEmailVerified("false");
        },500)
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Container className='p-5 register' data-aos="fade-up">
       <Row className='d-flex justify-content-center align-items-center shadow-lg p-5 bg-white' data-aos="fade-down">
        <Col md={6}>
            <div data-aos="fade-up" className='mt-2'>
            {emailVerified === "" && <h1 className="">Please wait we are verifying your email.</h1>}
            {emailVerified === "true" && <h1 className="">Your email verified successfully.</h1>}
            {emailVerified === "false" && <h1 className="">Expired or Invalid Link</h1>}
            <hr/>
            </div>
            <button className='primary btn btn-success' onClick={()=>{
                navigate("/login");
            }}>Back to Login</button>
        </Col>
        <Col md={6}>
         <div data-aos="fade-up">
         {emailVerified === "" && <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_p8bfn5to.json"   background="transparent" speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>}
         {emailVerified === "true" && <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_tv6zgylv.json"  background="#38F9D7" speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>}
         {emailVerified === "false" && <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_pqpmxbxp.json"  background="transparent" speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>}
         </div>
        </Col>
       </Row>
    </Container>
  );
}

export default VerifyEmail;