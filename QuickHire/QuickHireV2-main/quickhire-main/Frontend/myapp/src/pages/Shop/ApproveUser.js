import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Mail from "../Mailbox/mail";
import { getUserApplyJob } from "../../data/userApplyJob";
import { shopNoti } from "../../data/shopApplyUsers";
import LoadingPage from "../LoadingPage";
import CryptoJS from "crypto-js";

export const ApproveUser = () => {
  const role = localStorage.getItem("role") && CryptoJS.AES.decrypt(localStorage.getItem("role"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const email = localStorage.getItem("user") && CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const [noti, setNoti] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [acceptTriggerAccOrDenie, setAcceptTriggerAccOrDenie] = useState(false);
  // const triggerAccOrDenie = () => {
  //   setAcceptTriggerAccOrDenie(!acceptTriggerAccOrDenie);
  // };

  const showNoti = async (email) => {
    if (role === "user") {
      await getUserApplyJob(email).then((data) => setNoti(data));
      setLoading(false);
    } else if (role === "shop") {
      await shopNoti(email).then((data) => setNoti(data));
      setLoading(false);
    }
  };

  const triggerUserApplyJob = () => {
    setTimeout(() => {
      showNoti(email);
      setLoading(true);
    }, 2000);
  };

  const triggerAccOrDenie = () => {
    setTimeout(() => {
      showNoti(email);
      setLoading(true);
    }, 2000);
  };

  useEffect(() => {
    setLoading(true);
    showNoti(email);
  }, []);

  const priorityOrder = ["รอดำเนินการ", "ยินดีด้วยนะ", "เสียใจด้วยนะ"];

  const sortedItems = noti.length != 0 && noti.sort((a, b) => {
    const priorityA = priorityOrder.indexOf(a.status);
    const priorityB = priorityOrder.indexOf(b.status);

    return priorityA - priorityB;
  });

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="flex flex-col mx-auto min-h-[90vh]">
            <Navbar />
            <div className="flex justify-center text-2xl mb-6 mt-5 font-medium">{role === "shop" ? "คัดเลือกผู้สมัครงาน" : "ประวัติการสมัครงาน"}</div>
            {/* <div className=""> */}
            <div className="grid grid-cols-2 lg:grid-cols-3md:grid-cols-3 xl:grid-cols-4">
              {/* {noti &&
                noti.map((noti, index) => {
                  if (role === "user") {
                    return (
                      <div className="flex justify-center items-center">
                        <div className="grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 xl:gap-7 xl:m-0 2xl:gap-16 xl:mb-10">
                          <Mail key={index} id={noti._id} email_shopname={noti.email_shopname} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerUserApplyJob={triggerUserApplyJob} />
                        </div>
                      </div>
                    );
                  } else {
                    return <Mail key={index} useremail={noti.email} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerAccOrDenie={triggerAccOrDenie} />;
                  }
                })} */}
              {sortedItems &&
                sortedItems.map((noti, index) => {
                  if (role === "user") {
                    return (
                      <div className="flex justify-center items-center">
                        <div className="grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 xl:gap-7 xl:m-0 2xl:gap-16 xl:mb-10">
                          <Mail key={index} id={noti._id} email_shopname={noti.email_shopname} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerUserApplyJob={triggerUserApplyJob} />
                        </div>
                      </div>
                    );
                  } else {
                    return <Mail key={index} useremail={noti.email} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerAccOrDenie={triggerAccOrDenie} />;
                  }
                })}
            </div>
            {/* </div> */}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
