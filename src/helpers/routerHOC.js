import { useNavigate, useParams } from "react-router-dom";
import React from "react";

// export default function routerHOC(Component) {
//   return (props) => (
//     <Component {...props} navigation={useNavigate()} params={useParams()} />
//   );
// }

const routerHOC = (Component) => {
  const Comp = (props) => {
    return (
      <Component {...props} navigation={useNavigate()} params={useParams()} />
    );
  }
  Comp.displayName = 'routerHOC'
  return Comp
};

export default routerHOC;
