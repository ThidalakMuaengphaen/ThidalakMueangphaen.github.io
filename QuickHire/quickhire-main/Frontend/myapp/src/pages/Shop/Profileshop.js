import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library for creating custom icon
import customMarkerIcon from "../../img/pin.png";
import SwapImage from "./SwapImage";

function Profileshop() {
  const user = localStorage.getItem("user");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const apiUrl = `${process.env.REACT_APP_API}getShopinfo/${user}`;

        const response = await axios.get(apiUrl);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (userData == null) {
    // Return a loading state or null while waiting for the data to be fetched
    return (
      <div className="flex flex-col justify-center mx-auto">
        <Navbar></Navbar>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mx-auto">
      <Navbar></Navbar>
      <h1 className="flex justify-center text-2xl font-medium mt-5">โปรไฟล์ร้านค้า</h1>
      <div className="flex justify-center gap-5 text-white mt-10 mx-10"></div>
      <div>
        <div className="flex justify-center  ">
          <div className="flex justify-center ">
            {userData && <SwapImage images={[JSON.parse(userData.img)]} />}
          </div>
        </div>
        

        <div className="mx-10">
          <div className="flex flex-col">
            
            <h1 className="m-3 text-xl font-medium">ชื่อร้าน</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.shopname}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">ชื่อจริง - นามสกุล (เจ้าของร้าน)</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.fullname}</h1>
          </div>

          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">เวลาทำงาน</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.timework}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">ค่าแรง / ชั่วโมง (บาท)</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.money}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">สวัสดิการ</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.welfare}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">ที่อยู่ร้าน</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.location}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Latitude)</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.lat}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Longitude)</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.long}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">Email</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.email}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
            <h1 class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{userData.telnumber}</h1>
          </div>
          <h1 className="m-3 text-xl font-medium flex justify-center mt-6">แผนที่ร้านค้า</h1>
          <div className="flex  max-w-[1400px] h-[500px] ">
          <MapContainer center={[userData.lat, userData.long]} zoom={14} scrollWheelZoom={false} style={{ width: "1400px"}} className="rounded-xl ">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[userData.lat,userData.long]} icon={L.icon({ iconUrl: customMarkerIcon, iconSize: [30, 30] })}>
              <Popup>{userData.shopname}</Popup>
            </Marker>
          </MapContainer>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
export default Profileshop;
