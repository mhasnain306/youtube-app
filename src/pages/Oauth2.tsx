import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Oauth2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.hash);
  localStorage.setItem(
    "youtube-access-token",
    params.get("#access_token") || ""
  );
  console.log(localStorage.getItem("youtube-access-token"));
  useEffect(() => {
    navigate("/");
  }, []);

  return <div>Oauth2-handler</div>;
};

export default Oauth2;
