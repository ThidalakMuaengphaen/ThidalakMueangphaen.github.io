import React from "react";
import logo from "../img/logo.png";
import facebook from "../img/facebook.png";
import line from "../img/line.png";
import tiktok from "../img/tiktok.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 text-xs  gap-2 mt-7 xl:grid-cols-3 bg-[#0A3F5A] text-white rounded-t-2xl pt-4 w-full bottom-0   ">
      <div className="hidden lg:block   lg:place-self-center lg:px-3">
        <img src={logo} alt="/" className="w-28 -mt-7 mx-auto"></img>
        <div className=" md:place-self-center">
          <h1 className="md:text-lg lg:text-xl">ที่อยู่ : มหาวิทยาลัยขอนแก่น</h1>
          <h1 className="md:text-lg lg:text-xl">ติดต่อสอบถาม : quickhire@gmail.com</h1>
        </div>
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1 md:col-span-0 mx-4 gap-y-3 md:place-self-center lg:col-span-1 lg:place-self-start xl:place-self-center">
        <h1 className=" text-lg lg:text-2xl">
          ติดตาม <span className="text-yellow-500">Quick</span>
          <span className="text-cyan-600">hire</span> ได้ที่
        </h1>
        <div className="flex gap-2 mx-6 ">
          <img src={facebook} alt="/" className="w-6"></img>
          <Link to="https://www.facebook.com/profile.php?id=100095083393781&mibextid=ZbWKwL">
            <h1 className="md:text-xl">quickhire</h1>
          </Link>
        </div>
        <div className="flex gap-2 mx-6 ">
          <img src={line} alt="/" className="w-6"></img>
          <h1 className="md:text-xl">@quickhire</h1>
        </div>
        <div className="flex gap-2 mx-6 ">
          <img src={tiktok} alt="/" className="w-6"></img>
          <h1 className="md:text-xl">quickhire tiktok</h1>
        </div>
      </div>
      <div className="flex flex-col md:place-self-center gap-2 px-3 lg:mx-auto">
        <h1 className=" md:text-lg lg:text-xl ">ช่วยเหลือ</h1>
        <h1 className=" md:text-lg lg:text-xl">ติดต่อเรา</h1>
        <h1 className=" md:text-lg lg:text-xl">คำถามที่พบบ่อย</h1>
        <h1 className=" md:text-lg lg:text-xl">วิธีใช้งาน</h1>
      </div>
      <div className="text-center bg-[#419DBB] text-white col-span-3 gap-2 rounded-t-2xl bottom-0 p-3">@ 2023 All Rights Reserved by Quickhire</div>
    </div>
  );
}

export default Footer;
