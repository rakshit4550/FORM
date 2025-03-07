import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../utils/apis";

const Super = () => {
  const [isauth, setisauth] = useState(false);
  const [loding, setloding] = useState(true);

  useEffect(() => {
    const getrouteAccess = async () => {
      try {
        const response = await fetch(apis().getaccess, {
          method: "post",
          body: JSON.stringify({ token: localStorage.getItem("passtoken") }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
          setloding(false);
        }

        if (result?.status) {
          setloding(false);
          setisauth(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getrouteAccess();
  }, []);

  if (loding) {
    return <h2>loding ...</h2>;
  }

  if (isauth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
  return <div>Super</div>;
};

export default Super;
