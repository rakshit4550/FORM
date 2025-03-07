import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import Buttontologin from "../ui/Buttontologin";
import { MdOutlineUpdate } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import apis from "../../utils/apis";

const Update = () => {
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const navigate = useNavigate()

    const submithandler =async (e)=>{
      e.preventDefault();
      try {
        const response = await fetch(apis().updatepassword,{
          method:'post',
          body:JSON.stringify({password,confirmpassword,token:localStorage.getItem('passtoken')}),
          headers: { "Content-Type": "application/json" },
        })

        // console.log(response)

        const result = await response.json()

        if(!response.ok){
          throw new Error(result?.message)
        }
        if(result?.status){
          console.log(result)
          toast.success(result?.message)
          navigate('/login')
          localStorage.removeItem('email')
          localStorage.removeItem('passtoken')
        }
        
      } catch (error) {
        toast.error(error.message)
      }
        e.preventDefault();
        console.log(password,confirmpassword);
        // navigate('/login')
    }
  return (
    <div className="auth_main">
      <form onSubmit={submithandler}>
        <div className="auth_container">
          <div className="auth_header">
            <MdOutlineUpdate />
            <p className="auth_heading">new Password</p>
            <p className="title"> Enter atlist 6-digits long password</p>
          </div>
          <div className="auth_item">
            <label>Password *</label>
            <Input type="text" required placeholder="new password" onChange={(e)=>setpassword(e.target.value)}/>
          </div>
          <div className="auth_item">
            <label>confirm password *</label>
            <Input type="text" required placeholder="confirm password" onChange={(e)=>setconfirmpassword(e.target.value)}/>
          </div>
          <div className="auth_action">
            <Button>update password</Button>
          </div>
          <div>
            <Buttontologin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
