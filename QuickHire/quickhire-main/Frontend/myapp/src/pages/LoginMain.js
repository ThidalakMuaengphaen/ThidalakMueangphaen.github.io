import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginEmpl } from "./LoginEmpl";
import { LoginOrg } from "./Shop/LoginOrg";

export const ScreenMode = {
  LOGIN_EMPL: "LOGIN_EMPL",
  LOGIN_ORG: "LOGIN_ORG",
};

const LoginMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");
  const [currMode, setCurrMode] = useState(ScreenMode.LOGIN_EMPL);

  useEffect(() => {
    if (destination === ScreenMode.LOGIN_EMPL || destination === ScreenMode.LOGIN_ORG) {
      setCurrMode(destination);
    }
  }, [destination]);

  const onSwitchMode = (mode) => {
    setCurrMode(mode);
    navigate(`?destination=${mode}`);
  };

  return <div>{currMode === ScreenMode.LOGIN_EMPL ? <LoginEmpl onSwitchMode={onSwitchMode} /> : <LoginOrg onSwitchMode={onSwitchMode} />}</div>;
};

export default LoginMain;
