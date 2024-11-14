import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import SwapImage from "./Shop/SwapImage";
import LoadingPage from "./LoadingPage";
import CryptoJS from "crypto-js";

function Profile() {
  const user = CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const [userData, setUserData] = useState(null);

  const deCryptoData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const apiUrl = `${process.env.REACT_APP_API}getUserinfo/${user}`;

        const response = await axios.get(apiUrl);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const birthYear = userData ? new Date(deCryptoData(userData.birthdate)).getFullYear() : 0;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  // console.log(userData);
  // console.log(userData.languages.length)
  return (
    <>
      {userData == null ? (
        <LoadingPage />
      ) : (
        <div>
          <Navbar />
          <div className="flex flex-col mx-auto justify-center">
            <div className="flex md:justify-center justify-between relative ml-10 mt-5">
              <h1 className=" text-2xl font-medium">
                <span className="text-[#F17F0D]">โปรไฟล์</span>
                <span className="text-[#419DBB]">ของคุณ</span>
              </h1>
              <Link to={`/Editprofile/${userData._id}`} className="absolute right-10 rounded-3xl px-2 bg-[#F17F0D] text-white">
                แก้ไขประวัติ
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 m-10 gap-10">
              <div className="flex flex-col w-full justify-center bg-[#C7EFF6] rounded-2xl  py-5">
                {/* <img className="w-[200px] h-[200px] rounded-full mx-auto" src={decodeBlobToImageUrl(userData.img)} alt="Rounded avatar"></img> */}
                <div className="m-5">{userData.img !== null && <SwapImage images={JSON.parse(userData.img)} forProfile={true} />}</div>
                <h1 className="mx-auto mt-2 text-xl md:text-2xl  font-bold text-[#F17F0D]">{deCryptoData(userData.nickname)}</h1>
                <h1 className="mx-auto mt-2 text-xl md:text-2xl">{deCryptoData(userData.fullname)}</h1>
                <h1 className="mx-auto mt-2 text-lg md:text-xl">
                  {deCryptoData(userData.birthdate)} อายุ {age} ปี
                </h1>
                <h1 className="mx-auto mt-2 text-lg md:text-xl">
                  เพศ {deCryptoData(userData.sex)} สัญชาติ {deCryptoData(userData.national)}
                </h1>
              </div>

              <div className="flex flex-col mx-auto justify-center gap-10 w-full ">
                <div className="relative ">
                  <div className=" rounded-full bg-[#419DBB] text-white p-2 w-40 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                    <h1 className="font-bold">ประวัติการศึกษา</h1>
                  </div>
                  <div className=" rounded-2xl  bg-[#c7eff6] h-64 overflow-y-auto ">
                    <h1 className="p-10 text-lg md:text-xl break-words ">{deCryptoData(userData.degree)}</h1>
                  </div>
                </div>

                <div className="relative">
                  <div className=" rounded-full  bg-[#419dbb] text-white p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                    <h1 className="font-bold">ประวัติการทำงาน / ฝึกงาน</h1>
                  </div>
                  <div className=" rounded-2xl bg-[#c7eff6] h-64 overflow-y-auto ">
                    <h1 className="p-10  text-lg md:text-xl break-words ">{deCryptoData(userData.workexp)}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-10 mx-10 gap-10 ">
              <div className="relative">
                <div className=" rounded-full bg-[#419dbb] text-white p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                  <h1>ความสามารถด้านภาษา</h1>
                </div>
                <div className="flex rounded-2xl bg-[#c7eff6] h-36 items-center justify-center text-sm md:text-lg md:px-2  lg:px-2  lg:text-lg  ">
                  {userData.languages.length !== 1 ? (
                    <div className="grid grid-cols-2 md:gap-10 gap-5 my-4">
                      {/* Languages */}
                      {userData.languages &&
                        userData.languages.map((language) => {
                          return (
                            <div className="lg:flex gap-3  md:gap-5">
                              <span className="flex font-bold justify-center lg:justify-start"> {language.name} :</span>
                              <div className="grid grid-cols-2 lg:flex gap-1 md:gap-5">
                                <div>
                                  <input checked={language.listen} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    ฟัง
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.talk} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    พูด
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.read} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium ">
                                    อ่าน
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.write} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    เขียน
                                  </label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1">
                      {/* Languages */}
                      {userData.languages &&
                        userData.languages.map((language) => {
                          return (
                            <div className="grid md:flex gap-3 md:gap-5">
                              <span className="flex font-bold justify-center"> {language.name}</span>
                              <div className="grid grid-cols-2 md:flex gap-1 md:gap-5">
                                <div>
                                  <input checked={language.listen} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    ฟัง
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.talk} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    พูด
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.read} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium ">
                                    อ่าน
                                  </label>
                                </div>
                                <div>
                                  <input checked={language.write} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    เขียน
                                  </label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
              {/* license driving */}
              <div className="relative ">
                <div className=" rounded-full bg-[#419dbb] text-white p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5 ">
                  <h1>ความสามารถในการขับรถ</h1>
                </div>
                <div className=" flex rounded-2xl bg-[#c7eff6] h-36  items-center justify-center text-sm  md:px-5  md:py-5 md:text-xl  ">
                  {/* <h1 className="p-10">{userData.vehicle}</h1> */}
                  {/* <div className="grid grid-cols-2 md:flex gap-1 md:gap-5 "> */}
                  {/* Vehicles */}
                  {userData.vehicles &&
                    userData.vehicles.map((vehicle) => {
                      return (
                        <div className="grid grid-cols-2 md:flex gap-1 md:gap-5 ">
                          <div>
                            <input checked={vehicle.noMotorcycle} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="checked-checkbox" class="ml-2 font-medium">
                              ไม่มี
                            </label>
                          </div>
                          <div>
                            <input checked={vehicle.motorcycle} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="checked-checkbox" class="ml-2 font-medium">
                              รถจักรยานยนต์
                            </label>
                          </div>
                          <div>
                            <input checked={vehicle.threeWheeler} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="checked-checkbox" class="ml-2 font-medium">
                              รถยนต์สามล้อ
                            </label>
                          </div>
                          <div>
                            <input checked={vehicle.car} id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="checked-checkbox" class="ml-2 font-medium">
                              รถยนต์
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
export default Profile;
