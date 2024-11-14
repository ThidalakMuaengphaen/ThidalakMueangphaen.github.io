import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import camera from "../img/camera.png";
import SwapImage from "./Shop/SwapImage";
import CryptoJS from "crypto-js";
import "react-image-crop/dist/ReactCrop.css";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Createprofile = () => {
  const { id } = useParams();

  const stages = ["personalInfo", "educationAndWork", "abilities"]; // Define stage names
  const [currentIndex, setCurrentIndex] = useState(0); // Keep track of the current stage index
  const currentStage = stages[currentIndex]; // Get the current stage name
  const [selectedImage, setSelectedImage] = useState(null);

  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  const [getnickname, setNickname] = useState("");
  const [getsex, setSex] = useState("");
  const [gettelnumber, setTelnumber] = useState("");
  const [getbirthdate, setBirthdate] = useState("");
  const [getnational, setNational] = useState("");
  const [area, setArea] = useState("");
  const [getdegree, setDegree] = useState("");
  const [getworkexp, setWorkexp] = useState("");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([{ id: Date.now(), name: "", listen: false, talk: false, read: false, write: false }]); //!เก็บข้อมูลภาษาที่กรอกมา
  //? เก็บใบรับรองการขับ
  // const [checkboxValues, setCheckboxValues] = useState({
  //   //!ยังไม่เปลี่ยนชื่อเพราะมันจะซ้ำกับอันบนที่บอกไป
  //   noMotorcycle: false,
  //   motorcycle: false,
  //   threeWheeler: false,
  //   car: false,
  // });
  const [checkboxValues, setCheckboxValues] = useState([
    {
      id: "noMotorcycle",
      noMotorcycle: false,
      motorcycle: false,
      threeWheeler: false,
      car: false,
    },
    // Add other vehicle objects here
  ]);
  // const handleVehicleChange = (event) => {
  //   const { id, checked } = event.target;
  //   setCheckboxValues({
  //     ...checkboxValues,
  //     [id]: checked,
  //   });
  //   console.log(checkboxValues);
  // };
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleVehicleChange = (id, check) => {
    const updatedValues = checkboxValues.map((vehicle) => {
      if (vehicle.id === id) {
        return {
          ...vehicle,
          [check]: !vehicle[check],
        };
      }
      return vehicle;
    });
    setCheckboxValues(updatedValues);
  };

  const handleLanguageChange = (id, skill) => {
    const updatedLanguages = languages.map((language) => {
      if (language.id === id) {
        const updatedLanguage = { ...language, [skill]: !language[skill] };
        console.log("Updated Language:", updatedLanguage);
        return updatedLanguage;
      }
      return language;
    });

    setLanguages(updatedLanguages);
  };

  const handleInputChange = (id, value) => {
    const updatedLanguages = languages.map((language) => {
      if (language.id === id) {
        return { ...language, name: value };
      }
      return language;
    });
    setLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLanguages([...languages, { id: Date.now(), name: "", listen: false, talk: false, read: false, write: false }]);
  };

  const deleteLanguage = () => {
    if (languages.length > 1) {
      //! ลบอันแรกไม่ได้
      setLanguages(languages.slice(0, -1));
    }
  };

  useEffect(() => {
    setEmail(CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8));
  }, []);

  const enCryptData = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageJSON = JSON.stringify(selectedImage);
    const getfullname = getfirstname + " " + getlastname;

    const fullname = enCryptData(getfullname);
    const nickname = enCryptData(getnickname);
    const sex = enCryptData(getsex);
    const telnumber = enCryptData(gettelnumber);
    const birthdate = enCryptData(getbirthdate);
    const national = enCryptData(getnational);
    const degree = enCryptData(getdegree);
    const workexp = enCryptData(getworkexp);

    axios
      .post(`${process.env.REACT_APP_API}uploadUserinfo/${email}`, {
        fullname: fullname,
        telnumber: telnumber,
        nickname: nickname,
        sex: sex,
        birthdate: birthdate,
        national: national,
        area: area,
        degree: degree,
        workexp: workexp,
        languages: languages,
        vehicles: checkboxValues,
        img: imageJSON,
        email: email,
      })
      .then((response) => {
        // Handle the API response as needed
        console.log(response.data);
        localStorage.setItem("newuser", "old");
        window.location.replace("/Profile");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error uploading image:", error);
      });
    // }
  };

  const MAX_LENGTH = 3;
  const handleImageSelect = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      if (files.length <= MAX_LENGTH) {
        const imageUrls = [];

        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();

          reader.onloadend = () => {
            imageUrls.push(reader.result);
            // If you need to do something with each image URL here, you can do it inside this loop.

            // If this is the last file, you can perform further actions with the array of image URLs.
            if (imageUrls.length === files.length) {
              setSelectedImage(imageUrls);
              // Handle the array of image URLs (imageUrls) here.
              // You can pass it to a function or perform further processing.
            }
          };

          reader.readAsDataURL(files[i]);
        }
      } else {
        e.preventDefault();
        alert(`กรุณาเลือกไฟล์รูปภาพไม่เกิน ${MAX_LENGTH} รูป`);
      }
    }
  };

  const deCryptData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  const getOldData = async () => {
    await axios.get(`${process.env.REACT_APP_API}getSpecificDataUser/${id}`).then((data) => {
      const fullname = deCryptData(data.data.fullname);
      setFirstname(fullname.split(" ")[0]);
      setLastname(fullname.split(" ")[1]);
      setTelnumber(deCryptData(data.data.telnumber));
      setNickname(deCryptData(data.data.nickname));
      setSex(deCryptData(data.data.sex));
      setBirthdate(deCryptData(data.data.birthdate));
      setNational(deCryptData(data.data.national));
      setArea(deCryptData(data.data.area));
      setDegree(deCryptData(data.data.degree));
      setWorkexp(deCryptData(data.data.workexp));
      setLanguages(data.data.languages);
      setCheckboxValues(data.data.vehicles);

      setEmail(data.data.email);
      setSelectedImage(JSON.parse(data.data.img));
      setLoading(false);
    });
  };
  console.log(checkboxValues.map((data) => data.car));

  useEffect(() => {
    if (id !== undefined && localStorage.getItem("newuser") === "old") {
      getOldData();
      setLoading(true);
    }
  }, []);

  const stageLabels = {
    personalInfo: "ข้อมูลส่วนบุคคล",
    educationAndWork: "ประวัติการศึกษา และ การทำงาน/ฝึกงาน",
    abilities: "ความสามารถ",
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous stage
    }
  };

  const handleNextClick = () => {
    if (currentIndex < stages.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next stage
    } else {
    }
  };

  const isFormComplete = () => {
    const personalInfoComplete = selectedImage && getfirstname.trim() !== "" && getlastname.trim() !== "" && getnickname.trim() !== "" && getsex.trim() !== "" && getbirthdate.trim() !== "" && getnational.trim() !== "" && email.trim() !== "" && gettelnumber.trim() !== "" && gettelnumber.length === 10;

    const educationAndWorkComplete = getdegree.trim() !== "" && getworkexp.trim() !== "";

    // const abilitiesComplete = getthailevel.trim() !== "" && getenglevel.trim() !== "" && getvehicle.trim() !== "";
    const languagesComplete = languages.every((language) => {
      return (language.listen || language.talk || language.read || language.write) && language.name.trim() !== "";
    });

    const vehiclesComplete = checkboxValues.some((vehicle) => {
      return vehicle.noMotorcycle || vehicle.motorcycle || vehicle.threeWheeler || vehicle.car;
    });

    return personalInfoComplete && educationAndWorkComplete && languagesComplete && vehiclesComplete;
  };

  const renderNextButton = () => {
    // Check if the form is complete before rendering the button
    const isComplete = isFormComplete();
    if (currentStage === "abilities") {
      return (
        <button className={`p-3 rounded-lg ${currentIndex === stages.length - 1 && !isComplete ? "bg-gray-400" : isComplete ? "bg-[#F27F0C] text-white" : "bg-[#F5993D] text-white"}`} onClick={isComplete ? handleSubmit : undefined} disabled={!isComplete && currentIndex !== stages.length - 1}>
          {isComplete ? "ยืนยันข้อมูล" : "กรุณากรอกข้อมูล"}
        </button>
      );
    } else {
      return (
        <button className={`p-3 ml-2 rounded-lg ${currentIndex === stages.length - 1 ? "bg-gray-400" : "bg-[#F27F0C] text-white"}`} disabled={currentIndex === stages.length - 1} onClick={handleNextClick}>
          Next
        </button>
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="Home mx-auto min-h-fit">
          <Navbar></Navbar>
          <h1 className="flex justify-center text-2xl mt-5">กรอกข้อมูลสำหรับผู้สมัครงาน</h1>
          <div className="flex flex-wrap justify-center gap-7 md:gap-3 text-white mt-10 mx-10 text-center">
            {stages.map((stageName, index) => (
              <div
                key={stageName}
                className={`w-full sm:w-auto relative cursor-pointer rounded-xl ${currentStage === stageName ? "bg-[#419DBB]" : "bg-[#83BFD3]"}`}
                onClick={() => setCurrentIndex(index)}
                style={{ flex: "1 0 calc(33.333% - 1rem)" }} // Adjust the width as needed
              >
                <h1 className={`p-4 text-xl ${currentStage === stageName ? "text-white" : "text-gray-900"}`}>{stageLabels[stageName]}</h1>
                <h1 className="text-xl font-bold absolute bg-orange-400 px-4 py-1 rounded-full -top-5 left-1/2 -translate-x-1/2">{index + 1}</h1>
              </div>
            ))}
          </div>

          {currentStage === "personalInfo" && (
            <div>
              <div className="flex justify-center mt-10 ">
                <div className="flex justify-center ">
                  <form>
                    <div className="flex flex-col justify-center">
                      <label htmlFor="imageInput">
                        {selectedImage ? (
                          <SwapImage images={selectedImage}></SwapImage>
                        ) : (
                          <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] border-dashed border-4 border-sky-500 rounded-xl mx-auto cursor-pointer">
                            <img className="w-20 md:w-40 hover:rotate-12 hover:scale-125 duration-300 mx-auto mt-14 md:mt-28 flex " src={camera} alt="camera" />
                          </div>
                        )}
                      </label>
                      <input type="file" accept="image/*" multiple onChange={handleImageSelect} id="imageInput" className="hidden" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="mx-10">
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ชื่อจริง</h1>
                  {/* <input onChange={(event) => setFirstname(event.target.value)} type="text" value={getfirstname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input> */}
                  <input
                    onChange={(event) => {
                      const alphabeticValue = event.target.value.replace(/[^A-Za-zก-๙]/g, "");
                      setFirstname(alphabeticValue);
                    }}
                    type="text"
                    value={getfirstname}
                    class="bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">นามสกุล</h1>
                  <input
                    onChange={(event) => {
                      const alphabeticValue = event.target.value.replace(/[^A-Za-zก-๙]/g, "");
                      setLastname(alphabeticValue);
                    }}
                    type="text"
                    value={getlastname}
                    class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></input>
                  <h1 className="text-orange-400  mt-2 font-bold"> โปรดระบุข้อมูลจริงตามบัตรประชาชน เนื่องจากมีผลต่อการสมัครงาน</h1>
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ชื่อเล่น</h1>
                  <input
                    onChange={(event) => {
                      const alphabeticValue = event.target.value.replace(/[^A-Za-zก-๙]/g, "");
                      setNickname(alphabeticValue);
                    }}
                    type="text"
                    value={getnickname}
                    class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></input>
                </div>

                {/* <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">เพศ</h1>
                 
                  <div className="flex justify-around ">
                    <div className="flex gap-5">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <h1 for="default-radio-1" class="text-xl font-medium">
                        หญิง
                      </h1>
                    </div>
                    <div className="flex gap-5">
                      <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <h1 for="default-radio-2" class="text-xl font-medium">
                        ชาย
                      </h1>
                    </div>
                    <div className="flex gap-5">
                      <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <h1 for="default-radio-2" class="text-xl font-medium">
                        อื่นๆ
                      </h1>
                    </div>
                  </div>

                  
                </div> */}
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">เพศ</h1>
                  <div className="flex gap-5 justify-around">
                    {["หญิง", "ชาย", "อื่นๆ"].map((label, index) => (
                      <div key={index} className="flex gap-2">
                        <input id={`default-radio-${index}`} type="radio" value={label} name="default-radio" onChange={handleSexChange} checked={getsex === label} className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor={`default-radio-${index}`} className="text-xl font-medium">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* <input onChange={(event) => setSex(event.target.value)} type="text" value={getsex} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input> */}
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">วัน/เดือน/ปี เกิด</h1>
                  <input max={new Date().toISOString().split("T")[0]} onChange={(event) => setBirthdate(event.target.value)} type="date" value={getbirthdate} className="bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">สัญชาติ</h1>

                  <input
                    onChange={(event) => {
                      const alphabeticValue = event.target.value.replace(/[^A-Za-zก-๙]/g, "");
                      setNational(alphabeticValue);
                    }}
                    type="text"
                    value={getnational}
                    class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></input>
                </div>

                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">Email</h1>
                  <input disabled={true} type="text" value={email} class=" bg-slate-100 border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
                  <input
                    maxLength={10}
                    onChange={(event) => {
                      const numericValue = event.target.value.replace(/[^0-9]/g, "");
                      const limitedValue = numericValue.slice(0, 10);
                      setTelnumber(limitedValue);
                    }}
                    type="text" // Use text type
                    value={gettelnumber}
                    class="bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {/* <input maxLength={10} onChange={(event) => setTelnumber(event.target.value)} type="text" value={gettelnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input> */}
                </div>
              </div>
            </div>
          )}
          {/* Education */}
          {currentStage === "educationAndWork" && (
            <div className="mt-4 mb-20">
              <div className="mx-10">
                <div className="flex flex-col ">
                  <h1 className="m-3 text-xl font-medium break-words ">ประวัติการศึกษา (กำลังศึกษาอยู่/จบการศึกษา)</h1>
                  <textarea onChange={(event) => setDegree(event.target.value)} type="text" value={getdegree} className=" h-[9.5rem] bg-slate-100 border-0 px-3 py-3  placeholder-blueGray-300 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น จบการศึกษามัธยมศึกษาปีที่6 ที่โรงเรียนชุมแพศึกษา กำลังศึกษาปริญญาตรีคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น เป็นต้น"></textarea>
                </div>
                <div className="flex flex-col ">
                  <h1 className="m-3 text-xl font-medium break-words  ">ประวัติการทำงาน/ฝึกงาน (อธิบายโดยละเอียด)</h1>
                  <textarea onChange={(event) => setWorkexp(event.target.value)} type="text" value={getworkexp} class=" h-[9.5rem] bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " placeholder="เช่น ปี 2020-2022 เป็นพนักงานทำความสะอาด ที่โรงพยาบาลขอนแก่น ได้รับหน้าที่ดูแลความสะอาดบริเวณตึกผู้ป่วย  C เป็นต้น  หากไม่เคยมีประสบการณ์ทำงานให้กรอก ไม่มีประสบการณ์ทำงาน"></textarea>
                </div>
              </div>
            </div>
          )}

          {currentStage === "abilities" && (
            <div className="mt-4 ">
              <div className="mx-10">
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ความสามารถด้านภาษา</h1>
                  <div className="flex flex-col gap-5">
                    {id !== undefined ? (
                      languages.map((language) => (
                        <div key={language.id} className="flex gap-5">
                          <input placeholder="กรอกชื่อภาษา" value={language.name} onChange={(e) => handleInputChange(language.id, e.target.value)} className="h-20 text-orange-500 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4 placeholder-orange-500 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150" />
                          <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                            <div>
                              <input type="checkbox" checked={language.listen} onChange={() => handleLanguageChange(language.id, "listen")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor={`listen-checkbox-${language.id}`} className="ml-2 font-medium">
                                ฟัง
                              </label>
                            </div>
                            <div>
                              <input type="checkbox" checked={language.talk} onChange={() => handleLanguageChange(language.id, "talk")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor={`talk-checkbox-${language.id}`} className="ml-2 font-medium">
                                พูด
                              </label>
                            </div>
                            <div>
                              <input type="checkbox" checked={language.read} onChange={() => handleLanguageChange(language.id, "read")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor={`read-checkbox-${language.id}`} className="ml-2 font-medium">
                                อ่าน
                              </label>
                            </div>
                            <div>
                              <input type="checkbox" checked={language.write} onChange={() => handleLanguageChange(language.id, "write")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor={`write-checkbox-${language.id}`} className="ml-2 font-medium">
                                เขียน
                              </label>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        {languages.map((language) => (
                          <div key={language.id} className="flex gap-5 my-5">
                            <input placeholder="กรอกชื่อภาษา" value={language.name} onChange={(e) => handleInputChange(language.id, e.target.value)} className="h-20 text-orange-500 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4 placeholder-orange-500 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150" />
                            <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                              <div>
                                <input type="checkbox" checked={language.listen} onChange={() => handleLanguageChange(language.id, "listen")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`listen-checkbox-${language.id}`} className="ml-2 font-medium">
                                  ฟัง
                                </label>
                              </div>
                              <div>
                                <input type="checkbox" checked={language.talk} onChange={() => handleLanguageChange(language.id, "talk")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`talk-checkbox-${language.id}`} className="ml-2 font-medium">
                                  พูด
                                </label>
                              </div>
                              <div>
                                <input type="checkbox" checked={language.read} onChange={() => handleLanguageChange(language.id, "read")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`read-checkbox-${language.id}`} className="ml-2 font-medium">
                                  อ่าน
                                </label>
                              </div>
                              <div>
                                <input type="checkbox" checked={language.write} onChange={() => handleLanguageChange(language.id, "write")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`write-checkbox-${language.id}`} className="ml-2 font-medium">
                                  เขียน
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 items-center justify-center mt-5">
                    {" "}
                    <button className=" bg-orange-500 text-white border-0 px-3 py-3 rounded-lg text-sm  shadow " onClick={addLanguage}>
                      เพิ่มภาษา
                    </button>
                    <button className=" bg-orange-500 text-white border-0 px-3 py-3 rounded-lg text-sm  shadow " onClick={deleteLanguage}>
                      ลบภาษา
                    </button>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div>
                    <h1 className="mx-3 mt-3 b text-xl font-medium">ความสามารถในการขับรถ</h1>
                    <h1 className="mx-3 text-lg mb-3 font-medium text-orange-500">คุณมีใบขับขี่ชนิดใดบ้าง ?</h1>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-full">
                      {id !== undefined && checkboxValues
                        ? checkboxValues.map((vehicle) => {
                            return (
                              <div className="h-20 p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-full bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                                <div>
                                  <input id="noMotorcycle" type="checkbox" checked={vehicle.noMotorcycle} onChange={() => handleVehicleChange(vehicle.id, "noMotorcycle")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label htmlFor="noMotorcycle" className="ml-2 font-medium">
                                    ไม่มี
                                  </label>
                                </div>
                                <div>
                                  <input id="motorcycle" type="checkbox" checked={vehicle.motorcycle} onChange={() => handleVehicleChange(vehicle.id, "motorcycle")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    รถจักรยานยนต์
                                  </label>
                                </div>
                                <div>
                                  <input id="threeWheeler" type="checkbox" checked={vehicle.threeWheeler} onChange={() => handleVehicleChange(vehicle.id, "threeWheeler")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium ">
                                    รถยนต์สามล้อ
                                  </label>
                                </div>
                                <div>
                                  <input id="car" type="checkbox" checked={vehicle.car} onChange={() => handleVehicleChange(vehicle.id, "car")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    รถยนต์
                                  </label>
                                </div>
                              </div>
                            );
                          })
                        : checkboxValues.map((vehicle) => {
                            return (
                              <div className="h-20 p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-full bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring ease-linear transition-all duration-150">
                                <div>
                                  <input id="noMotorcycle" type="checkbox" checked={vehicle.noMotorcycle} onChange={() => handleVehicleChange(vehicle.id, "noMotorcycle")} className="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label htmlFor="noMotorcycle" className="ml-2 font-medium">
                                    ไม่มี
                                  </label>
                                </div>
                                <div>
                                  <input id="motorcycle" type="checkbox" checked={vehicle.motorcycle} onChange={() => handleVehicleChange(vehicle.id, "motorcycle")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium">
                                    รถจักรยานยนต์
                                  </label>
                                </div>
                                <div>
                                  <input id="threeWheeler" type="checkbox" checked={vehicle.threeWheeler} onChange={() => handleVehicleChange(vehicle.id, "threeWheeler")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                  <label for="checked-checkbox" class="ml-2 font-medium ">
                                    รถยนต์สามล้อ
                                  </label>
                                </div>
                                <div>
                                  <input id="car" type="checkbox" checked={vehicle.car} onChange={() => handleVehicleChange(vehicle.id, "car")} class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
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
            </div>
          )}

          <div className="flex items-center justify-center my-20 lg:pt-44">
            <button onClick={handlePrevClick} className={`p-3 mr-2 rounded-lg ${currentIndex === 0 ? "bg-gray-400 text-black" : "bg-[#F27F0C] text-white"}`} disabled={currentIndex === 0}>
              ย้อนกลับ
            </button>
            {renderNextButton()}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Createprofile;
