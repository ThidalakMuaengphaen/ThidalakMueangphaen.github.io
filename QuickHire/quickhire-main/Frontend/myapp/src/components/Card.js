import React, { useState, useEffect } from "react";
import gps from "../img/gps.png";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library for creating custom icon
import customMarkerIcon from "../img/pin.png";
import date from "../data/date";
import { applyJob, getUserApplyJob } from "../data/userApplyJob";
import axios from "axios";
import SwapImage from "../pages/Shop/SwapImage";
import { EditBTN } from "../pages/Shop/EditBTN";
import DescBTN from "../pages/BTN/DescBTN";
import DeleteBTN from "../pages/BTN/DeleteBTN";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

function Card({ id, restaurantName, minilocation, position, hourlyIncome, img, lat, long, peopleneed, jobdesc, timework, welfare, location, email, triggerUserApplyJob, showHistory, status_appove, date_month_year, editBTN, triggerShopDeleteJob }) {
  const [showModal, setShowModal] = React.useState(false);
  const useremail = localStorage.getItem("user") && CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const status = "รอดำเนินการ";
  const role = localStorage.getItem("role") && CryptoJS.AES.decrypt(localStorage.getItem("role"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const [user_fullname, setUser_Fullname] = useState("");
  const getUserFullname = async () => {
    const userFullName = await axios.get(`${process.env.REACT_APP_API}getUserinfo/${useremail}`);
    setUser_Fullname(userFullName.data.fullname);
  };
  useEffect(() => {
    if (role === "user") {
      getUserFullname();
    }
  }, []);
  // User apply job at shop
  const userApplyJob = async (useremail, shopname) => {
    applyJob(useremail, user_fullname, email, shopname, status, date);
    triggerUserApplyJob();
  };

  const checkJob = async (shopname) => {
    Swal.fire({
      title: "สมัครงาน!",
      text: "ต้องการสมัครงานนี้หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EC712",
      cancelButtonColor: "#D80000",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("สมัครงานเสร็จสิ้น", "ข้อมูลของคุณได้ถูกส่งไปยังร้านค้าแล้ว", "success");
        userApplyJob(useremail, shopname);
        setShowModal(false);
      }
    });
  };

  const deleteHistoryJobPending = async (id) => {
    console.log("id", id);

    Swal.fire({
      title: "ยกเลิกการสมัครงาน!",
      text: "ต้องการยกเลิกสมัครงานนี้หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EC712",
      cancelButtonColor: "#D80000",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("ยกเลิกการสมัครงานสำเร็จ", "ได้ทำการยกเลิกการสมัครงานนี้เรียบร้อย", "success");
        axios.delete(`${process.env.REACT_APP_API}deleteUserApplyJob/${id}`);
        setShowModal(false);
        triggerUserApplyJob();
      }
    });
  };

  return (
    <div>
      <div className="w-44 h-60 md:h-[19rem] md:w-56 xl:w-80 xl:h-[23rem] border-4 border-[#6C8C9C] rounded-[20px] md:rounded-[40px] cursor-pointer bg-[#C7EFF6]">
        {" "}
        {/* max-w-xs */}
        <div className="flex flex-col rounded-[20px] md:rounded-[40px] relative group" onClick={() => setShowModal(true)}>
          {" "}
          {/*rounded-b-xl*/}
          <div className="flex flex-row rounded-[20px] md:rounded-[40px]">
            {/* {img !== undefined && <img src={img[0]} alt="Restaurant" className="rounded-full m-2 mb-1 mr-0 w-[50px] h-[50px] md:w-[130px] md:h-[130px] transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3" />} */}
            {/* <img src={img[0]} loading="lazy" alt="Restaurant" className="rounded-full m-2 mb-1 mr-0 w-[50px] h-[50px] md:w-[70px] md:h-[70px] xl:w-[130px] xl:h-[130px]  transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3" /> */}
            {/* <img src={img[0]} loading="lazy" alt="Restaurant" className="rounded-full m-2 mb-1 mr-0 max-w-[40px] max-h-[40px] w-[60px] h-[60px] md:max-w-[80px] md:max-h-[80px] md:w-[100px] md:h-[100px]  xl:w-[130px] xl:h-[130px]  transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3" /> */}
            <img
              src={img[0]}
              loading="lazy"
              alt="Restaurant"
              className="rounded-full m-2 mb-1 mr-0 max-w-[40px] max-h-[40px] w-[60px] h-[60px] md:max-w-[80px] md:max-h-[80px] md:w-[100px] md:h-[100px] xl:w-[130px] xl:h-[130px] transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3"
              style={{
                width: "100%", // Ensure the image takes up the full width
                height: "100px", // Allow the height to adjust proportionally
                borderRadius: "50%", // Make it circular
                objectFit: "cover", // Ensure the image is centered and covers the circle
              }}
            />

            <h2 className="w-full flex justify-center text-center px-2 my-auto text-lg font-bold text-[#224555] md:text-3xl">{restaurantName}</h2>
            {/* <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out rounded-b-xl rounded-t-xl">หฟกฟหก</div> */}
          </div>
          <div className="px-2 pt-1 rounded-[20px] md:rounded-[40px] text-xs md:text-base">
            {" "}
            {/*rounded-b-xl*/}
            {/* <h2 className="text-lg font-bold text-[#306279] mb-1 md:text-xl">{restaurantName}</h2> */}
            <div className="flex items-center py-1  xl:py-3">
              <img src="https://cdn-icons-png.flaticon.com/512/8801/8801434.png" alt="Position" className="w-8 h-8 mr-2 rounded-full md:w-10 md:h-10 md:ml-3" />
              <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{position}</p>
            </div>
            <div className="flex items-center py-1  xl:py-3">
              {/* <img src={money} alt="Hourly Income" className="w-6 h-6 mr-4" /> */}
              <img src="https://cdn-icons-png.flaticon.com/512/7280/7280222.png" alt="Location" className="w-8 h-8 mr-2 rounded-full md:w-10 md:h-10 md:ml-3" />
              <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{hourlyIncome} ฿ / ชั่วโมง</p>
            </div>
            <div className="flex items-center py-1  xl:py-3">
              <img src={gps} alt="Location" className="w-8 h-8 mr-2 rounded-full bg-white md:w-10 md:h-10 md:ml-3" />
              {/* <i class="fa-solid fa-money-bill-1" style={{ color: '#0aae1d' }}></i> */}
              {/* <FontAwesomeIcon icon={faMoneyBill} className="text-[#0aae1d]" /> */}
              <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{minilocation}</p>
            </div>
            {!showHistory ? <DescBTN text="ดูรายละเอียดเพิ่มเติม" /> : <DescBTN text={status_appove} />}
          </div>
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-10">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-3 sm:p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{restaurantName}</h3>
                    <button className=" ml-auto bg-transparent border-0 text-black opacity-90  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                      <span className="bg-transparent text-black opacity-90 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                    </button>
                  </div>

                  {/*body*/}
                  <div className="grid grid-cols-1 md:grid md:grid-cols-2 m-3 md:m-5">
                    {/* <img src={img} alt="Restaurant" className=" h-[200px] md:h-[300px] transition-opacity duration-300 ease-in-out rounded-xl mx-auto" /> */}
                    <SwapImage images={img} />
                    {/* Add leaflet tailwind here */}
                    <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={false} className="rounded-xl md:w-[300px] lg:w-[350px] xl:w-[500px]  ">
                      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[lat, long]} icon={L.icon({ iconUrl: customMarkerIcon, iconSize: [30, 30] })}>
                        <Popup>{restaurantName}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>

                  <div className="flex flex-col p-3 sm:p-5 text-sm sm:text-lg gap-2">
                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> รายละเอียดงาน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        💼:
                      </span>
                      <h1 className="">{jobdesc}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> เวลาทำงาน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        🕜:
                      </span>
                      <h1 className="">{timework}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> สวัสดิการ</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        💼:
                      </span>
                      <h1 className="">{welfare}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> จำนวนเงิน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        💵:
                      </span>
                      <h1 className="">{hourlyIncome} บาท / ชั่วโมง</h1>
                    </div>
                    <div className="flex">
                      <h1 className=" whitespace-nowrap">
                        {" "}
                        จำนวนคน{" "}
                        <span role="img" aria-label="sheep" className="mr-2">
                          👨‍🦱:
                        </span>
                      </h1>

                      <h1 className="">{peopleneed}</h1>
                    </div>
                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> สถานที่</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        📍:
                      </span>
                      <h1 className="">{location}</h1>
                    </div>

                    <div className="flex items-center justify-between pb-10">
                      <div className="flex">
                        <h1 className=" whitespace-nowrap  "> สอบถามเพิ่มเติม</h1>
                        <span role="img" aria-label="sheep" className="mr-2">
                          📧:
                        </span>
                        <h1 className="">{email}</h1>
                      </div>
                    </div>
                    <div>
                      {role === "user" ? (
                        <div className="flex justify-end">
                          {/* <button className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                            ปิดหน้าต่าง
                          </button> */}
                          {!showHistory ? (
                            <button className="bg-orange-400 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => checkJob(restaurantName)}>
                              สมัครงานด่วน
                            </button>
                          ) : (
                            <button className="bg-orange-400 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => deleteHistoryJobPending(id)}>
                              ยกเลิกสมัครงาน
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-start">
                          {email === useremail && editBTN && (
                            <div className="flex">
                              <EditBTN id={id} />
                              <DeleteBTN id={id} triggerShopDeleteJob={triggerShopDeleteJob} onClick={() => setShowModal(false)} />
                            </div>
                          )}
                          {/* <button className=" bg-red-500 rounded text-white font-bold uppercase px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base outline-none focus:outline-none ease-linear transition-all duration-150 m-2 sm:m-1" type="button" onClick={() => setShowModal(false)}>
                            ปิดหน้าต่าง
                          </button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <div className="flex justify-center md:text-xl">{date_month_year}</div>
    </div>
  );
}

export default Card;
