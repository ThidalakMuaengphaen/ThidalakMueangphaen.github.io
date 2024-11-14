import React, { useState, useEffect } from "react";
import Mymodal from "./modal";
import axios from "axios";
import CardApproveUser from "./CardApproveUser";
import Card from "../../components/Card";

const Mail = ({ id, useremail, email_shopname, shopname, status, date, role, triggerAccOrDenie, triggerUserApplyJob }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const day = new Date(date);
  const numberDate = day.getDate(); // Look like 1-31 days
  const month = day.getMonth(); // Look like 0-12 months
  const year = day.getFullYear(); // Look like 2023

  const date_month_year = `${numberDate}/${month}/${year}`;

  const hour = day.getHours(); // Look like 1-24 hours
  const minute = day.getMinutes(); // Look like 0-59 minutes

  const hour_minute = `${hour}:${minute}`;

  const [userData, setUserData] = useState([]);
  const getUserInfo = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}getUserinfo/${useremail}`);
    setUserData(data.data);
  };

  const getShopInfo = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}userViewJobHistory/${email_shopname}/${shopname}`);
    setUserData(data.data);
  };
  useEffect(() => {
    if (role === "shop") {
      getUserInfo();
    } else {
      getShopInfo();
    }
  }, []);

  return (
    <>
      {userData.length != 0 && (
        <div>
          {/* User can't open modal but shop can */}
          {role === "user" ? (
              <Card id={id} restaurantName={userData.shopname} minilocation={userData.minilocation} position={userData.workposition} hourlyIncome={userData.money} img={JSON.parse(userData.img)} lat={userData.marker.lat} long={userData.marker.lng} peopleneed={userData.peopleneed} jobdesc={userData.jobdesc} timework={userData.timework} welfare={userData.welfare} location={userData.location} email={userData.email} triggerUserApplyJob={triggerUserApplyJob} showHistory={true} status_appove={status} date_month_year={date_month_year} />
          ) : (
              <CardApproveUser userData={userData} shopname={shopname} date_month_year={date_month_year} hour_minute={hour_minute} status={status} triggerAccOrDenie={triggerAccOrDenie} />
          )}
        </div>
      )}
    </>
  );
};

export default Mail;
