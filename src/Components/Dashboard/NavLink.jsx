import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function NavLinkComponent({ text, icon, link }) {
  const menuContext = useContext(Menu);
  const isOpen = menuContext.isOpen;

  const renderTooltip = (props) => (
    <Tooltip id="navlink-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  if (isOpen) {
    return (
      <NavLink to={link} className="side-bar-link">
        <FontAwesomeIcon icon={icon} />
        <p>{text}</p>
      </NavLink>
    );
  } else {
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 0, hide: 0 }}
        overlay={renderTooltip}>
        <NavLink to={link} className="side-bar-link">
          <FontAwesomeIcon icon={icon} />
        </NavLink>
      </OverlayTrigger>
    );
  }
}
