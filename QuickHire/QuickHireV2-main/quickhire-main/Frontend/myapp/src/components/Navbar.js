import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../img/logo.png";
import CryptoJS from "crypto-js";

function Navbar() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role") && CryptoJS.AES.decrypt(localStorage.getItem("role"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);

  const [menuOpen, setMenuOpen] = useState(false);
  // const [showNewContent, setShowNewContent] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("newuser");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className="Navbar flex justify-center relative m-0 sm:justify-between sm:rounded-none md:rounded-xl md:m-2 items-center bg-[#0A3F5A] flex-wrap text-lg md:text-lg xl:text-2xl">
      <div className="flex gap-5 mx-5 lg:gap-10 lg:mx-10 items-center text-white">
        <Link to="/Home" class="transition duration-300 hover:scale-125">
          {" "}
          <img src={logo} alt="" className="w-24 "></img>
        </Link>
        <div className="md:flex gap-5 md:gap-10 items-center hidden ">
          <Link to="/Home" class="transition duration-300 hover:rotate-12">
            {" "}
            <h1>หน้าแรก</h1>
          </Link>
          {role === "user" && (
            <>
              <Link to="/Profile" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>โปรไฟล์</h1>
              </Link>
              <Link to="/Apply" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>ประวัติการสมัครงาน</h1>
              </Link>
            </>
          )}
          {role === "shop" && (
            <>
              <Link to="/Add" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>เพิ่มประกาศ</h1>
              </Link>
              <Link to="/Approve" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>คัดเลือกผู้สมัคร</h1>
              </Link>
            </>
          )}
          <Link to="/Contact" class="transition duration-300 hover:rotate-12">
            {" "}
            <h1>ติดต่อเรา</h1>
          </Link>
        </div>
        {/* <div className='mt-[0.5px]'><WorkRoundedIcon></WorkRoundedIcon></div> */}
      </div>

      {token ? (
        <div className="md:flex items-center mx-auto lg:mx-5  text-white hidden">
          <Link to="/" onClick={handleLogout} class="transition duration-300 hover:scale-125 border-red-500 border-4 p-2 rounded-xl">
            ออกจากระบบ
          </Link>
        </div>
      ) : (
        <div className="md:flex  items-center mx-auto md:mx-10 lg:mx-5 text-white hidden">
          {/* <button onClick={toggleContent}>เข้าสู่ระบบ</button>
          {showNewContent ? <LoginMain /> : null} */}

          <Link to="/ChooseLogin" class="transition duration-300 hover:scale-125 border-orange-400 border-4 p-2 rounded-xl">
            เข้าสู่ระบบ
          </Link>
          <div></div>
        </div>
      )}

      <div className="md:hidden mx-10 absolute right-0 top-0 translate-y-8">
        <button className="text-white" onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <div className={`w-6 h-1 bg-white my-1 ${menuOpen ? "rotate-45" : ""}`}></div>
          <div className={`w-6 h-1 bg-white ${menuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-1 bg-white my-1 ${menuOpen ? "-rotate-45" : ""}`}></div>
        </button>
      </div>

      {menuOpen && (
        <div className="flex basis-full flex-col items-center flex-wrap gap-5 text-white mb-10">
          <Link to="/Home" className="transition duration-300 hover:rotate-12">
            หน้าแรก
          </Link>
          {/* <Link to="/Profile">โปรไฟล์</Link>
          <Link to="/Job">ค้นหางาน</Link> */}
          {/* {role === "user" && <Link to="/Profile">โปรไฟล์</Link>}
          {role === "shop" && <Link to="/Job">เพิ่มประกาศ</Link>} */}
          {role === "user" && (
            <>
              <Link to="/Profile" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>โปรไฟล์</h1>
              </Link>
              <Link to="/Apply" class="transition duration-300 hover:rotate-12">
                {" "}
                <h1>ประวัติการสมัครงาน</h1>
              </Link>
            </>
          )}
          {role === "shop" && (
            <>
              <Link to="/Add">เพิ่มประกาศ</Link>
              <Link to="/Approve">คัดเลือกผู้สมัคร</Link>
            </>
          )}
          <Link to="/Contact" className="transition duration-300 hover:rotate-12">
            ติดต่อเรา
          </Link>
          {token ? (
            <button onClick={handleLogout} className="transition duration-300 hover:scale-12">
              ออกจากระบบ
            </button>
          ) : (
            <Link to="/ChooseLogin" className="transition duration-300 hover:scale-12 ">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
