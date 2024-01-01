import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../apicalls/users';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/actions/userActions';

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.getUserInfoReducer);
  const getData = async() => {
    try{
        message.loading("Getting Logged In User Info...",0.5)
        const response = await getUserInfo();
        if(response.success){
            setTimeout(()=>{
              message.success(response.message);
              dispatch(getUserDetails(response.data));
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
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate("/login");
    }
    else{
        getData();
    }
  },[dispatch])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute