import React, { useEffect, useRef, useState } from "react";
import { FaFingerprint } from "react-icons/fa";
import Button from "../ui/Button";
import Buttontologin from "../ui/Buttontologin";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../../utils/apis";

const VerifyOtp = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otptime, setotptime] = useState(null);
  const [isexpiry, setisexpiry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = Array(6).fill(null);

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    const gettime = async () => {
      try {
        const response = await fetch(apis().otptime, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passtoken") }),
          headers: { "Content-Type": "application/json" },
        });

        // const text = await response.text();
        // const result = text ? JSON.parse(text) : {};
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch OTP time.");
        }
        if (result?.status) {
          const reminengtime =
            new Date(result?.sendTime).getTime() - new Date().getTime();
          if (reminengtime > 0) {
            setotptime(reminengtime);
          } else {
            setisexpiry(true);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    gettime();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otp.includes("")) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    try {
      const response = await fetch(apis().otpverify, {
        method: "POST",
        body: JSON.stringify({ otp: otpValue }),
        headers: { "Content-Type": "application/json" },
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result?.message || "OTP verification failed.");
      }
      if (result?.status) {
        toast.success(result?.message);
        navigate("/password/verify");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resendhandelar = async () => {
    try {
      const response = await fetch(apis().forgetpassword, {
        // ✅ await here
        method: "POST",
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json(); // ✅ response.json() now works

      if (!response.ok) {
        throw new Error(result?.message);
      }
      if (result?.status) {
        toast.success(result.message);
        localStorage.setItem("passtoken",result?.token)
        setotptime(1*60*1000)
        setisexpiry(false)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth_main">
      <div className="auth_header">
        <FaFingerprint />
        <p className="auth_heading">Verify Your OTP</p>
        <p className="title">Enter the 6-digit OTP sent to your email</p>
      </div>
      <div className="auth_item">
        <form onSubmit={handleSubmit}>
          <label>OTP*</label>
          <div className="otp_input_container">
            {otp.map((_, index) => (
              <input
                required
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="ui_input otp_input"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div className="auth_action">
            <Button type="submit">Verify</Button>
          </div>
          <div className="timer">
            {otptime !== null && !isexpiry ? (
              <Timer setisexpiry={setisexpiry} time={otptime} />
            ) : (
              <span onClick={resendhandelar} className="jay">
                Resend
              </span>
            )}
          </div>
        </form>
      </div>
      <div className="vijay">
        <Buttontologin />
      </div>
    </div>
  );
};

export default VerifyOtp;
