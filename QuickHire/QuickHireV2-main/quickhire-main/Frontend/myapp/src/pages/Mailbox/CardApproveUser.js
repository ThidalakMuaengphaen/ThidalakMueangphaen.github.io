import React, { useEffect, useState } from "react";
import date from "../../data/date";
import DescBTN from "../BTN/DescBTN";
import AccAndDenie from "../BTN/AccAndDenie";
import Mymodal from "./modal";
import CryptoJS from "crypto-js";

const CardApproveUser = ({ userData, shopname, date_month_year, hour_minute, status, triggerAccOrDenie }) => {
  const deCryptData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  const birthDate = userData.length !== 0 && new Date(deCryptData(userData.birthdate));
  const birthYear = userData.length !== 0 && birthDate.getFullYear();
  const currentYear = date.getFullYear();
  const age = currentYear - birthYear;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  useEffect(() => {
    if (userData !== undefined && userData.fullname !== undefined && userData.length !== 0) {
      const [firstname, lastname] = deCryptData(userData.fullname).split(" ");
      setFirstname(firstname);
      setLastname(lastname);
    }
  }, [userData]);

  const bool = [false, true];

  // const text = status == "ยินดีด้วยนะ" ? "ยอมรับแล้ว" : "ปฏิเสธแล้ว";

  return (
    // max-h-[19.5rem] md:max-h-[40rem]
    // <div className="flex flex-col max-w-xs max-h-[19rem] md:max-h-[40rem] mx-3 my-3 md:my-5 border-4 border-[#6C8C9C] rounded-[20px] bg-[#C7EFF6] cursor-pointer">
    <>
      <div className="flex flex-col font-semibold">
        <div className="w-[10.5rem] h-auto md:w-[20rem]  mx-auto md:my-1 border-4 border-[#6C8C9C] rounded-[20px] md:rounded-[40px] bg-[#C7EFF6]">
          {userData !== undefined && userData.img !== undefined && userData.length != 0 && (
            <>
              <div className="flex justify-center mt-2 text-base md:text-lg">จากร้าน {shopname}</div>
              <div className="flex justify-center rounded-t-[20px]">
                <img src={JSON.parse(userData.img)[0]} className="rounded-full w-[75px] h-[75px] mt-2 md:w-[130px] md:h-[130px] transition-opacity duration-300 ease-in-out" />
              </div>
              <div className="flex justify-center text-[#08344A]">{deCryptData(userData.nickname)}</div>
              <div className="flex justify-center text-[#F27F0C] text-xl md:hidden">{firstname}</div>
              <div className="flex justify-center text-[#F27F0C] text-xl md:hidden">{lastname}</div>
              <div className="flex justify-center text-[#F27F0C] text-xl">
                <span className="hidden md:block">
                  {firstname} {lastname}
                </span>
              </div>
              <div className="flex justify-center">
                <p className="text-[#08344A]">
                  {deCryptData(userData.birthdate)} อายุ {age} ปี
                </p>
              </div>
              <div className="flex justify-center">
                <p className="text-[#08344A]">
                  เพศ {deCryptData(userData.sex)} สัญชาติ {deCryptData(userData.national)}
                </p>
              </div>
              <div className="flex mx-2">
                <DescBTN text="ดูโปรไฟล์เพิ่มเติม" userData={userData} />
              </div>
              <div className="flex flex-row justify-center rounded-b-[20px] mx-2">
                {status == "รอดำเนินการ" ? (
                  bool.map((data) => {
                    return <AccAndDenie acc_denie={data} user_email={userData.email} user_fullname={deCryptData(userData.fullname)} shopname={shopname} triggerAccOrDenie={triggerAccOrDenie} />;
                  })
                ) : (
                  <DescBTN text={status} shop={true}/>
                  // <div className="flex mb-2 w-full justify-center mx-1">
                  //   <div className={`flex ${style} justify-center items-center py-[0.20rem] px-[0.20rem] text-sm font-bold w-full rounded-[16rem] md:text-2xl md:w-11/12`}>{text}</div>
                  // </div>
                  // <AccAndDenie acc_denie={data} user_email={userData.email} user_fullname={deCryptData(userData.fullname)} shopname={shopname} triggerAccOrDenie={triggerAccOrDenie} />
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center">
          {date_month_year}
          {"  "}
          {hour_minute}
        </div>
      </div>
    </>
  );
};

export default CardApproveUser;
