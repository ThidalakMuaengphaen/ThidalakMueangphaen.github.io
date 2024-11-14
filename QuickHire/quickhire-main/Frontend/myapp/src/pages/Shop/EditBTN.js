import React from "react";
import { Link } from "react-router-dom";

export const EditBTN = ({ id }) => {
  return (
    <div>
      <button className=" bg-red-500 rounded text-white font-bold uppercase px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base outline-none focus:outline-none ease-linear transition-all duration-150 m-2 sm:m-1">
        <Link to={`/Create/${id}`}>แก้ไขข้อมูลร้าน</Link>
      </button>
    </div>
  );
};
