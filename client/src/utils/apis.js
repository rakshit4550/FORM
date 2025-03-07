import React from 'react'
import Register from '../components/auth/Register'

const apis = () => {
  const local ='http://localhost:5000/'

  const list ={
    Registeruser :`${local}user/register`,
    loginuser :`${local}user/login`,
    forgetpassword:`${local}user/forget-password`,
    otpverify:`${local}user/otp-verify`,
    otptime:`${local}user/otp-time`,
    updatepassword:`${local}user/update-password`,
    getaccess:`${local}user/get-access`
  }
  return list
}

export default apis