import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Form, Input, message} from 'antd'
import {Link} from 'react-router-dom'
import { loginUser } from '../apicalls/users'

function LandingPage() {
  return (
    <Container fluid={true}>
       <Row className='d-flex justify-content-center align-items-center mx-5 pt-5 gx-5' data-aos="fade-up">
        <Col md={6} className='d-flex align-items-center'>
            <div data-aos="fade-up" className='d-flex flex-column justify-content-center align-items-center gx-5'>
            <h1 className='d-flex align-self-start'>
                Manage Your Daily Life Expenses
            </h1>
            <h5>Expense Tracker is a simple and efficient personal finance management app that allows you to track your daily expenses and income.</h5>
            <div className='d-flex align-self-start'>
            <Link className='btn btn-success mt-5' to="/login">
                Let's get started
            </Link>
            </div>
            </div>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center my-4'>
         <div data-aos="fade-up" className='d-flex justify-content-center'>
         <lottie-player src="https://lottie.host/fa3b5398-dd91-416a-9ed7-6a84b80f58d5/VgnyZltO3F.json"  background="#B3FFAb"  speed="1"  style={{width:"80%",height:"80%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  )
}

export default LandingPage;