import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import facebook from "../img/facebook.png";
import instagram from "../img/instagram.png";
import emailicon from "../img/gmail.png";
import smartphone from "../img/smartphone.png";
import bas from "../img/bas.png";
import noey from "../img/noey.png";
import boss from "../img/boss.png";
import ping from "../img/ping.png";

const Contact = () => {
  return (
    <div className="Contact mx-auto h-screen">
      <Navbar></Navbar>
      <h1 className="mx-auto flex justify-center text-xl md:text-2xl xl:text-3xl font-medium my-5">ติดต่อเรา Quickhire</h1>
      <div className="flex flex-col mt-5 gap-10">
        <div className="grid grid-cols-2 mx-5 gap-5 md:gap-2 text-xs md:text-base xl:text-xl">
          <div className="flex flex-col gap-4">
            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-full  mx-auto" src={ping} alt="Rounded avatar"></img>
            <h1 className=" mx-auto">Pingping</h1>
          </div>

          <div className=" my-auto -translate-y-3 md:-translate-y-5 ">
            <h1>นางสาวณัฐณิชา ปรีชาอนันตกุล</h1>
            <h1 className=" text-orange-500">CEO & Founder</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-1 items-center">
                <img src={emailicon} alt=" " className="w-6 mr-2"></img>
                <h1>pingnatni@gmail.com</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={facebook} alt=" " className="w-6 mr-2"></img>
                <h1>Natnicha Preechaanantakul</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={instagram} alt=" " className="w-6 mr-2"></img>
                <h1>pinggnp</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mx-5 gap-5 md:gap-2 text-xs md:text-base xl:text-xl">
          <div className="flex flex-col gap-4 ">
            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-full mx-auto" src={boss} alt="Rounded avatar"></img>
            <h1 className=" mx-auto">Boss</h1>
          </div>
          <div className=" my-auto -translate-y-3 md:-translate-y-5">
            <h1>นายอภิสิทธิ์ กันพนม</h1>
            <h1 className=" text-orange-500">Co-Founder</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-1 items-center">
                <img src={emailicon} alt=" " className="w-6 mr-2"></img>
                <div className="grid grid-cols-1 xl:flex">
                  <h1 className="">aphisit.kanphanom</h1>
                  <h1>@gmail.com</h1>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <img src={facebook} alt=" " className="w-6 mr-2"></img>
                <h1>Aphisit Kanphanom</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={instagram} alt=" " className="w-6 mr-2"></img>
                <h1>bboss___</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mx-5 gap-5 md:gap-2 text-xs md:text-base xl:text-xl">
          <div className="flex flex-col gap-4 ">
            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-full mx-auto" src={noey} alt="Rounded avatar"></img>
            <h1 className=" mx-auto">Noeynoey</h1>
          </div>

          <div className=" my-auto -translate-y-3 md:-translate-y-5">
            <h1>นางสาวธิดาลักษณ์ เมืองแพน</h1>
            <h1 className=" text-orange-500">Co-Founder</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-1 items-center">
                <img src={emailicon} alt="" className="w-6 mr-2"></img>
                <div className="grid grid-cols-1 xl:flex">
                  <h1 className="">thidalak.m</h1>
                  <h1>@kkumail.com</h1>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <img src={facebook} alt="" className="w-6 mr-2"></img>
                <h1>Thidalak Mueangphaen</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={instagram} alt="" className="w-6 mr-2"></img>
                <h1>istnoey_ing</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mx-5 gap-5 md:gap-2 text-xs md:text-base xl:text-xl">
          <div className="flex flex-col gap-4 ">
            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] rounded-full mx-auto" src={bas} alt="Rounded avatar"></img>
            <h1 className=" mx-auto">Bas</h1>
          </div>

          <div className=" my-auto -translate-y-3 md:-translate-y-5">
            <h1>นายโยธิน นันต๊ะเสน</h1>
            <h1 className=" text-orange-500">Co-Founder</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex gap-1 items-center">
                <img src={emailicon} alt="" className="w-6 mr-2"></img>
                <h1>yotin.n@kkumail.com</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={facebook} alt="" className="w-6 mr-2"></img>
                <h1>Yotin Nuntasen</h1>
              </div>
              <div className="flex gap-1 items-center">
                <img src={instagram} alt="" className="w-6 mr-2"></img>
                <h1>klestz_01</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
