import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Job from "./pages/Job";
import Createprofile from "./pages/Createprofile";
// import Loginshop from "./pages/Shop/Loginshop";
// import Registershop from "./pages/Shop/Registershop";
import Createshop from "./pages/Shop/Createshop";
import Profileshop from "./pages/Shop/Profileshop";
import Addjob from "./pages/Shop/Addjob";
import CardAddJob from "./pages/Shop/CardAddJob";
import { ApproveUser } from "./pages/Shop/ApproveUser";
import LoginMain from "./pages/LoginMain";
import { LoginOrg } from "./pages/Shop/LoginOrg";
import { LoginEmpl } from "../src/pages/LoginEmpl";
import { RegisterEmpl } from "../src/pages/RegisterEmpl";
import { ChooseLogin } from "./pages/ChooseLogin";
import { RegisterOrg } from "./pages/Shop/RegisterOrg";
import ResetPassword from "./pages/ResetPass/ResetPassword";
import Reset from "./pages/ResetPass/Reset";
import CryptoJS from "crypto-js";

function App() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role") && CryptoJS.AES.decrypt(localStorage.getItem("role"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const newuser = localStorage.getItem("newuser");

  if (!token) {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Login />} />
          <Route path="/Profile" element={<Createprofile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Login />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          {/* <Route path="/Register" element={<Register />} /> */}
          {/* <Route path="/RegisterShop" element={<Registershop />} /> */}
          {/* <Route path="/LoginShop" element={<Loginshop />} /> */}
          <Route path="/LoginMain" element={<LoginMain />} />
          <Route path="/LoginOrg" element={<LoginOrg />} />
          <Route path="/LoginEmpl" element={<LoginEmpl />} />
          <Route path="/RegisterEmpl" element={<RegisterEmpl />} />
          <Route path="/RegisterOrg" element={<RegisterOrg />} />
          <Route path="/ChooseLogin" element={<ChooseLogin />} />
          <Route path="/ResetPassword/:role" element={<ResetPassword />} />
          <Route path="/Reset/:getEmail/:role" element={<Reset/>} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "new" && role === "user") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Createprofile />} />
          <Route path="/Apply" element={<Createprofile />} />
          {/* <Route path="/Editprofile/:id" element={<Createprofile />} /> */}
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Createprofile />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "old" && role === "user") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Editprofile/:id" element={<Createprofile />} />
          <Route path="/Apply" element={<ApproveUser />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Job" element={<Createprofile />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "new" && role === "shop") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Createshop />} />
          <Route path="/Create/:id" element={<Createshop />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Job" element={<Createshop />} /> */}
          {/* <Route path="/Create" element={<Createshop />} /> */}
          <Route path="/Add" element={<Addjob />} />
          <Route path="/Approve" element={<ApproveUser />} />
        </Routes>
      </div>
    );
  } else if (token && newuser === "old" && role === "shop") {
    return (
      <div className="App font-kanit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profileshop />} />
          {/* <Route path="/Create" element={<Createshop />} /> */}
          <Route path="/Create/:id" element={<Createshop />} />
          <Route path="/Add" element={<Addjob />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Job" element={<Addjob />} /> */}
          <Route path="/Approve" element={<ApproveUser />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App font-kanit ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        {role === "shop" ? (
          <>
            <Route path="/Add" element={<Addjob />} />
            <Route path="/Approve" element={<ApproveUser />} />
          </>
        ) : (
          <>
            {/* <Route path="/Add" element={<Addjob />} />
            <Route path="/Approve" element={<ApproveUser />} /> */}
          </>
        )}
        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route path="/Contact" element={<Contact />} />
        {/* <Route path="/Editprofile" element={<Createprofile />} /> */}
        {/* <Route path="/Job" element={<Job />} /> */}
      </Routes>
    </div>
  );
}

export default App;