import { useNavigate, useParams } from "react-router-dom";

export default function routerHOC(Component) {
  return (props) => (
    <Component {...props} navigation={useNavigate()} params={useParams()} />
  );
}
