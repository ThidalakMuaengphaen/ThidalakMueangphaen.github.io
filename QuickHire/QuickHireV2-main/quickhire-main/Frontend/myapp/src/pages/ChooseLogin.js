import React from "react";

import { Link } from "react-router-dom";

export const ChooseLogin = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col  items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl flex-col lg:flex-row shadow-lg max-w-fit p-3 md:p-12 items-center hover:bg-blue-200 transition duration-500 ">
        {/* form */}
        <div className="mb-5 mt-5">
          <div className="lg:flex lg:flex-col-reverse ">
            <Link to="/LoginMain?destination=LOGIN_EMPL" className="flex justify-center items-center">
              <div className="border-2 rounded-full text-center py-3 px-6 bg-[#419DBB] text-white text-2xl md:text-5xl ">หางานที่รู้ใจ</div>
            </Link>
            <div className="text-xl text-center md:text-3xl md:flex md:flex-col-reverse md:my-5">
              หากคุณกำลังมองหางาน Part time <span className="text-cyan-900 ">Click</span>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-5">
          <div>
            <Link to="/LoginMain?destination=LOGIN_ORG " className="flex justify-center items-center">
              <div className="border-2 rounded-full text-center py-3 px-6 bg-[#F27F0C] text-white text-2xl md:text-5xl">หาใจที่รักงาน</div>
            </Link>
            <div className="text-xl text-center md:text-3xl md:flex md:flex-col md:my-5">
              หากคุณกำลังมองหาเพื่อนร่วมงาน <span className="text-yellow-500">Click</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hover:scale-105 duration-300 mt-8">
        <Link to={"/Home"}>
          <span className="text-center text-xl"> Back to Homepage</span>
        </Link>
      </div>
    </section>
  );
};
