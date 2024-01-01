import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function PublicRoute({children}) {
  const navigate = useNavigate();
  useEffect(()=>{
   if(localStorage.getItem("token")){
      navigate("/home");
   }
  },[])
  return (
    <Container fluid={true} className='register m-0 p-0'>
        {children}
    </Container>
  )
}

export default PublicRoute