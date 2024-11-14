import React from "react";
import Modal from "react-modal";
import SwapImage from "../Shop/SwapImage";
import CryptoJS from "crypto-js";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Mymodal = ({ isOpen, onClose, userData }) => {
  console.log(userData);
  const deCryptData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  const birthYear = userData ? new Date(deCryptData(userData.birthdate)).getFullYear() : 0;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal" shouldCloseOnOverlayClick={false} className="flex items-center justify-center h-screen rounded-md ">
      <div className="flex flex-col bg-gray-100  rounded-2xl shadow-lg md:max-w-5xl m-3 h-fit">
        <div className="p-5 items-center text-xs md:text-lg">
          {/* profile */}
          <div className="px-5 md:px-10  ">
            {userData.img !== undefined && <SwapImage images={JSON.parse(userData.img)} />}
            <div className="flex justify-center text-lg font-bold mb-3 text-[#0A3F5A]">{deCryptData(userData.fullname)}</div>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <div>
                  <span className="font-bold text-[#0A3F5A]">ชื่อเล่น :</span> {deCryptData(userData.nickname)}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]">เพศ :</span> {deCryptData(userData.sex)}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]">สัญชาติ :</span> {deCryptData(userData.national)}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]">วันเกิด :</span> {deCryptData(userData.birthdate)}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]">อายุ :</span> {age}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]">เบอร์ :</span> {deCryptData(userData.telnumber)}
                </div>
              </div>
              <div>
                <span className="font-bold text-[#0A3F5A]">Email :</span> {userData.email}
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <span className="font-bold text-[#0A3F5A]">การศึกษา :</span> {deCryptData(userData.degree)}
                </div>
                <div>
                  <span className="font-bold text-[#0A3F5A]"> ประสบการณ์ทำงาน :</span> {deCryptData(userData.workexp)}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-[90%] ">
                <div>
                  <span className="font-bold text-[#0A3F5A]">ความสามารถด้านภาษา</span>
                  <div className="flex text-xs md:text-lg p-1 ">
                    {userData.languages.length > 1 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">
                        {/* Languages */}
                        {userData.languages &&
                          userData.languages.map((language) => {
                            return (
                              <div>
                                <span className="flex font-bold justify-around"> {language.name} :</span>
                                <div className="grid grid-cols-2 gap-1 md:gap-5">
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
                      <div className="grid grid-cols-1 md:gap-3 gap-5">
                        {/* Languages */}
                        {userData.languages &&
                          userData.languages.map((language) => {
                            return (
                              <div className="md:flex gap-3 md:gap-5">
                                <span className="flex font-bold justify-start "> {language.name} :</span>
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
                <div>
                  <span className="font-bold text-[#0A3F5A]">ความสามารถในการขับรถ</span>
                  <div className=" flex  text-xs md:text-lg p-1">
                    {/* <h1 className="p-10">{userData.vehicle}</h1> */}
                    {/* <div className="grid grid-cols-2 md:flex gap-1 md:gap-5 "> */}
                    {/* Vehicles */}
                    {userData.vehicles &&
                      userData.vehicles.map((vehicle) => {
                        return (
                          <div className="grid grid-cols-2 md:flex md: gap-1 md:gap-5 ">
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
                {/* talent */}
                <div className="relative mx-10"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex duration-300 justify-center items-center ">
          <button type="button" onClick={onClose} class="text-red-700 rounded-b-2xl hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold w-full text-sm px-5 py-2.5 text-center ">
            CLOSE
          </button>
        </div>
      </div>
      {/* <div className="container w-5/6 rounded-md bg-white flex flex-col justify-center m-auto shadow-lg">
        <div className="flex flex-col p-5">
          {userData.img !== undefined && <SwapImage images={JSON.parse(userData.img)} />}
          <div className="flex justify-center text-lg font-bold mb-3">{deCryptData(userData.fullname)}</div>
          <div className="grid grid-cols-2 gap-6">
            <div>ชื่อเล่น : {deCryptData(userData.nickname)}</div>
            <div>เพศ : {deCryptData(userData.sex)}</div>
          </div>
          <div>Email : {userData.email}</div>
          <div>เบอร์โทรศัพท์ : {deCryptData(userData.telnumber)}</div>
          <div>วันเกิด : {deCryptData(userData.birthdate)}</div>
          <div>สัญชาติ : {deCryptData(userData.national)}</div>
          <div>การศึกษา : {deCryptData(userData.degree)}</div>
          <div>ประสบการณ์ทำงาน : {deCryptData(userData.workexp)}</div>
        </div>
        <div className="flex flex-col">
          <button type="button" onClick={onClose} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-b-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            CLOSE
          </button>
        </div>
      </div> */}
    </Modal>
  );
};

export default Mymodal;
