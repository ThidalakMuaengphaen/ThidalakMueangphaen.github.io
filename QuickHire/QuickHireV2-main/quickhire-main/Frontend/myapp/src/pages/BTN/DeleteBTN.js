import Axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const EditBTN = ({ id, triggerShopDeleteJob }) => {

  const deletejob = async () => {
    Swal.fire({
      title: "ลบข้อมูลร้าน!",
      text: "ต้องการลบข้อมูลร้านหรือไม่",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3EC712",
      cancelButtonColor: "#D80000",
      cancelButtonText: "ไม่ลบ",
      confirmButtonText: "ลบ!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("ลบข้อมูลร้าน!", "ลบข้อมูลร้านเรียบร้อย", "success");
        await Axios.delete(`${process.env.REACT_APP_API}deleteJob/${id}`);
        triggerShopDeleteJob();
      }
    });
  };

  return (
    <div>
      <button onClick={deletejob} className=" bg-red-500 rounded text-white font-bold uppercase px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base outline-none focus:outline-none ease-linear transition-all duration-150 m-2 sm:m-1">
        ลบข้อมูลร้าน
      </button>
    </div>
  );
};

export default EditBTN;
