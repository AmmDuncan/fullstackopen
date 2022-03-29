import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const user = useSelector(state => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!user) navigateTo("/login");
  }, [navigateTo, user]);

  return <>{props.children}</>;
};

export default PrivateRoute;
