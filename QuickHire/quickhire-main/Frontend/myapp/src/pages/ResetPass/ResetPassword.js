import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Axios from "axios";
import CryptoJS from "crypto-js";

const ResetPassword = () => {
  const role = useParams();
  const [getEmail, setGetEmail] = React.useState(""); // Email user who want to reset password
  const [alreadyResetPass, setAlreadyResetPass] = useState(false); // Email user who want to reset password
  const [foundEmail, setFoundEmail] = useState(true); // Email user who want to reset password
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const previousPage = query.get("from") || "/";

  const handleEmailChange = (event) => {
    setGetEmail(event.target.value);
  };

  console.log(location.pathname);
  const resetPass = () => {
    const email = CryptoJS.AES.encrypt(getEmail, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const encodedEmail = encodeURIComponent(email);
    const encodedRole = encodeURIComponent(role.role);

    Axios.post(`${process.env.REACT_APP_API}resetPassword/${encodedRole}/${encodedEmail}`).then((res) => {
      if (!res.data.haveEmail) {
        setFoundEmail(res.data.haveEmail)
      } else {
        setFoundEmail(res.data.haveEmail)
        setAlreadyResetPass(true);
      }
    });
  };

  return (
    <>
      {!alreadyResetPass ? (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl md:w-1/2 shadow-lg p-5 mx-5 md:p-10 mb-8">
            <div className="mb-auto">
              <div className="text-2xl">ลืมรหัสผ่านของคุณหรือเปล่า ?</div>
              <div className="text-sm text-red-500">กรุณากรอกอีเมล์ เพื่อรับลิงก์เพื่อสร้างรหัสผ่านใหม่</div>
            </div>
            <div className="text-xl my-5">
              <div>อีเมล์</div>
              <input
                id="standard-basic"
                label="อีเมล์"
                variant="standard" // Use "standard" as the variant
                value={getEmail}
                onChange={handleEmailChange}
                className="rounded-lg w-full px-5"
              />
            </div>
            {!foundEmail && <div>ไม่พบอีเมล์นี้</div>}
            <button onClick={resetPass} className="bg-[#29F072] rounded-full text-xl py-2 duration-300 mt-4">
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
          <div className="text-center text-xl flex gap-2">
            <span>จำรหัสผ่านได้แล้ว?</span>
            <Link to={previousPage} className="hover:scale-105 duration-300">
              Back to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl shadow-lg w-8/12 h-[18%] p-5 mb-8">
            <div className="mb-2 text-2xl">ลืมรหัสผ่าน!</div>
            <div>
              รหัสผ่านได้ส่งไปยัง {getEmail} <br /> โปรดเช็คที่อีเมล์ของคุณ
            </div>
          </div>
          <Link to={"/ChooseLogin"}>
            <div className="text-center text-xl ">Back to login</div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
