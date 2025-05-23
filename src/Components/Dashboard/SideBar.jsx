import {
  faBoxOpen,
  faCartPlus,
  faLayerGroup,
  faSquarePlus,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useRef } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import NavLinkComponent from "./NavLink";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  // Context
  const menuContext = useContext(Menu);
  const isOpen = menuContext.isOpen;
  const setIsOpen = menuContext.setIsOpen;
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;

  const navigate = useNavigate();

  // UseRef
  const hasToggledToFalse = useRef(false);
  const hasToggledToTrue = useRef(false);

  // handle responsive side bar
  useEffect(() => {
    if (windowSize < 768 && isOpen && !hasToggledToFalse.current) {
      setIsOpen(false);
      hasToggledToFalse.current = true;
      hasToggledToTrue.current = false;
    } else if (windowSize >= 768 && !isOpen && !hasToggledToTrue.current) {
      setIsOpen(true);
      hasToggledToTrue.current = true;
      hasToggledToFalse.current = false;
    }
  }, [windowSize, isOpen, setIsOpen]);

  return (
    <div className="side-bar">
      {/* {isOpen && ( */}
      <p
        onClick={() => {
          navigate("/dashboard");
        }}
        style={{ cursor: "pointer" }}
        className="dashboard-title">
        Dashboard
      </p>
      {/* )} */}
      <div>
        <NavLinkComponent text="Users" icon={faUsers} link="users" />
        <NavLinkComponent text="Add User" icon={faUserPlus} link="addUser" />
        <NavLinkComponent
          text="Categories"
          icon={faLayerGroup}
          link="categories"
        />
        <NavLinkComponent
          text="Add Category"
          icon={faSquarePlus}
          link="addCategory"
        />
        <NavLinkComponent text="Products" icon={faBoxOpen} link="products" />
        <NavLinkComponent
          text="Add Product"
          icon={faCartPlus}
          link="addProducts"
        />
      </div>
    </div>
  );
}
