import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const routerHOC = (Component) => {
  const Comp = (props) => {
    return (
      <Component {...props} navigation={useNavigate()} params={useParams()} />
    );
  };
  Comp.displayName = "routerHOC";
  return Comp;
};

export default routerHOC;
