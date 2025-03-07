import React, { useState } from "react";
import "./auth.css";
import Input from "../ui/input";
import Button from "../ui/Button";
import { FaFolderPlus } from "react-icons/fa";
import Buttontologin from "../ui/Buttontologin";
import { useNavigate } from "react-router-dom";
import apis from "../../utils/apis";
import { toast } from "react-toastify";
import Spiner from "../ui/Spiner";
import LoddingButoon from "../ui/LoddingButoon";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // `setemail` → `setEmail`
  const [password, setPassword] = useState(""); // `setpassword` → `setPassword`
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(apis().Registeruser, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result?.message || "Registration failed");

      toast.success(result?.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFolderPlus />
            <p className="auth_heading">welcome</p>
            <p className="auth_title">create new account</p>
          </div>
          <div className="auth_item">
            <label>Name *</label>
            <Input
              type="text"
              required
              placeholder="enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label>email *</label>
            <Input
              type="email"
              required
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth_item">
            <label>password *</label>
            <Input
              type="password"
              required
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth_action">
            <Button>
              <LoddingButoon loding={loading} title="register" />
            </Button>
          </div>
          <div className="auth_action">
            <Buttontologin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
