import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-toastify";
import apis from "../../utils/apis";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(apis().loginuser, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await responce.json();

      if (!responce.ok) {
        // Use responce.ok (not result.ok)
        throw new Error(result?.message || "Login failed");
      }
      if(result?.status){
        toast.success(result?.message);
        localStorage.setItem('accesstoken',result?.token)
      }

     
    } catch (error) {
      // ✅ Define error parameter here
      toast.error(error.message);
    }

    console.log(email, password);
  };

  return (
    <div className="auth_main">
      <form onSubmit={onsubmithandler}>
        <div className="auth_container">
          <div className="auth_header">
            <IoIosLogIn />
            <p className="auth_heading"> welcome back</p>
            <p className="title"> loging to continue</p>
          </div>
          <div className="auth_item">
            <label>Email *</label>
            <Input
              type="email"
              required
              placeholder="enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label>password *</label>
            <Input
              type="password"
              required
              placeholder="enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div className="auth_action">
            <Button>login</Button>
          </div>
          <div className="auth_option">
            <Link to="/">create new account</Link>
            <Link to="/forget/password">forget password</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
