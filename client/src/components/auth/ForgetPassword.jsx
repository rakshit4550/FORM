import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import Buttontologin from "../ui/Buttontologin";
import { MdAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../../utils/apis";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apis().forgetpassword,{
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response)
     

      const result = await response.json();
      

      if (!response.ok) {
        throw new Error(result?.message );
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("passtoken",result?.token)
        localStorage.setItem('email',email)
        navigate("/otp/verify"); // Redirect to OTP verification page
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <MdAttachEmail />
            <p className="auth_heading">Forget Your Password</p>
            <p className="auth_title">
              Enter your registered email. We will send a 6-digit OTP.
            </p>
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              type="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth_action">
            <Button>Send OTP</Button>
          </div>
          <div>
            <Buttontologin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
