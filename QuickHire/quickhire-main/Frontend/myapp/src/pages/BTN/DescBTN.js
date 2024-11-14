import React, { useState } from "react";
import Mymodal from "../Mailbox/modal";

const DescBTN = ({ text, userData, shop }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(text);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const style = text == "ยินดีด้วยนะ" ? "bg-green-500" : text == "เสียใจด้วยนะ" ? "bg-red-500" : "bg-[#F0E9D5] text-[#F27F0C] underline underline-offset-1";
  const pointer = text == "ยินดีด้วยนะ" || text == "เสียใจด้วยนะ" ? "" : "cursor-pointer";
  // const text1 = text == "ยินดีด้วยนะ" ? "ยอมรับแล้ว" : "ปฏิเสธแล้ว";
  const textStyle = shop ? text == "ยินดีด้วยนะ" ? "ยอมรับแล้ว" : "ปฏิเสธแล้ว" : text;
  // console.log(text1)

// text-[#F27F0C]
  return (
    <div className="flex w-full justify-center mb-2 xl:mb-3"> {/*mt-1 xl:mt-2*/}
      <div className={`flex justify-center items-center py-[0.35rem] decoration-2 text-base px-[3px] font-bold w-full rounded-xl ${style} md:text-lg xl:text-2xl md:w-11/12`}>
        <span className={`${pointer} uppercase`} onClick={openModal}>{textStyle}</span>
        {userData !== undefined && <Mymodal isOpen={isModalOpen} onClose={closeModal} userData={userData}  />}
      </div>
    </div>
  );
};

export default DescBTN;