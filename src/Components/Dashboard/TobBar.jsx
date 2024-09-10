import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
// import { useNavigate } from "react-router-dom";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import Cookie from "cookie-universal";

export default function TobBar() {
  const menu = useContext(Menu);
  const [userName, setUserName] = useState("");
  // const navigate = useNavigate();
  // const cookie = Cookie();
  
  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => setUserName(data.data.name));
  }, []);

  // async function handleLogout() {
  //   try {
  //     await Axios.get(`/${LOGOUT}`);
  //     cookie.remove("token");
  //     window.location.pathname = "/login";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="top-bar">
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{userName}</div>
      <FontAwesomeIcon
        icon={faBars}
        className="fs-6"
        cursor={"pointer"}
        onClick={() => menu.setIsOpen(!menu.isOpen)}
      />

      {/* <div className="d-flex gap-1 align-items-center">
        {userName ? (
          <div>
            <DropdownButton id="dropdown-basic-button" title={userName}>
              <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
            </DropdownButton>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <div
              onClick={() => {
                navigate("/register", { replace: true });
              }}
              className="btn btn-primary">
              Register
            </div>
            <div
              onClick={() => {
                navigate("/login", { replace: true });
              }}
              className="btn btn-primary">
              Login
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
