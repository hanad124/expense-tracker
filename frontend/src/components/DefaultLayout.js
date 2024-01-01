import React, {useState} from 'react'
import '../resources/default-layout.css'
import { Dropdown, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserInfo } from '../redux/actions/userActions'
import { message } from 'antd'
import Profile from './Profile'

function DefaultLayout({children}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show,setShow] = useState(false);
  const {user} = useSelector((state)=>state.getUserInfoReducer);
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }
  return (
    <div className='layout'>
      <div className='header d-flex justify-content-between'>
        <div>
          <h1 className='logo'><i className="ri-wallet-3-fill"></i> Expense Tracker</h1>
        </div>
        <div className='d-flex align-items-center text-white'>
        <h5></h5>
          <Dropdown>
          <Dropdown.Toggle className='btn btn-primary'>
          <i className="ri-user-3-line"></i> {user?.name}
          {/* <img src={user?.profilePicture} width="2%" height="2%" alt="..." /> */}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>setShow(true)}>Edit Profile</Dropdown.Item>
            <Dropdown.Item onClick={()=>navigate("/updateEmail")}>Update Email</Dropdown.Item>
            <Dropdown.Item onClick={()=>navigate("/updatePassword")}>Update Password</Dropdown.Item>
            <Dropdown.Item onClick={()=>{ 
               message.loading("Logging out...",0.5)
               setTimeout(()=>{
                dispatch(removeUserInfo());
                message.success("Your Logged Out Successfully")
                localStorage.removeItem("token")
                navigate("/")
               },500)
            }}>Logout</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {show&&<Profile show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>}
      <Container className='shadow-lg p-5 bg-body-tertiary rounded'>
        {children}
      </Container>
    </div>
  )
}

export default DefaultLayout