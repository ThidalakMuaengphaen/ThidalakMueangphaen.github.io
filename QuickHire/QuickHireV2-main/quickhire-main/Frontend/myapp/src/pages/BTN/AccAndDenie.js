import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

const AccAndDenie = ({ acc_denie, user_email, user_fullname, shopname, triggerAccOrDenie }) => {
 
  const email_shopname = localStorage.getItem("user") && CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const text = acc_denie ? "ยอมรับ" : "ปฏิเสธ";
  const style = acc_denie ? "text-[#1EC125] border-[#1EC125]" : "text-[#DE3C00] border-[#DE3C00]";

  const handleClick = async () => {
    if (acc_denie) {
      await Swal.fire({
        title: "รับพนักงาน!",
        text: "ต้องการรับพนักงานหรือไม่",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3EC712",
        cancelButtonColor: "#D80000",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("รับพนักงาน!", "รับพนักงานเรียบร้อย", "success");
          axios.post(`${process.env.REACT_APP_API}acceptjob`, { user_email: user_email, email_shopname: email_shopname, shopname: shopname, status: "ยินดีด้วยนะ" });
        }
      });
    } else {
      await Swal.fire({
        title: "ไม่รับพนักงาน!",
        text: "ต้องการปฏิเสธพนักงานหรือไม่",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3EC712",
        cancelButtonColor: "#D80000",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("ไม่รับพนักงาน!", "ปฏิเสธพนักงานเรียบร้อย", "success");
          axios.post(`${process.env.REACT_APP_API}acceptjob`, { user_email: user_email, email_shopname: email_shopname, shopname: shopname, status: "เสียใจด้วยนะ" });
        }
      });
    }
    triggerAccOrDenie();
  };
  return (
    <div onClick={handleClick} className="flex mb-2 w-full justify-center mx-1 cursor-pointer">
      <div className={`flex justify-center items-center py-[0.20rem] px-[0.20rem] border-4 text-sm font-bold w-full rounded-[16rem] ${style} md:text-2xl md:w-11/12`}>{text}</div>
    </div>
  );
};

export default AccAndDenie;
