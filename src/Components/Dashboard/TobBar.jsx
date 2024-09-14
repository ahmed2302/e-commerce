import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function TobBar() {
  const menu = useContext(Menu);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => setUserName(data.data.name));
  }, []);

  async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("token");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar">
      <div className="d-flex align-items-center gap-3">
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>{userName}</div>
        <FontAwesomeIcon
          icon={faBars}
          className="fs-6"
          cursor={"pointer"}
          onClick={() => menu.setIsOpen(!menu.isOpen)}
        />
      </div>

      <div>
        {userName ? (
          <div onClick={handleLogout} className="btn py-1 fw-bold">
            Logout
          </div>
        ) : (
          <div className="d-flex gap-2 align-items-center">
            <div
              onClick={() => {
                navigate("/register", { replace: true });
              }}
              className="btn btn py-1 fw-bold">
              Register
            </div>
            <div
              onClick={() => {
                navigate("/login", { replace: true });
              }}
              className="btn btn py-1 fw-bold">
              Login
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
