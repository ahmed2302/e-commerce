import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import cartIcon from "../../../Assets/Images/cart.png";

export default function Product(props) {
  const stars = Math.min(Math.round(props.rating), 5);
  const goldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon color="gold" key={key} icon={solid} />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  const handleSave = () => {
    const prev = JSON.parse(localStorage.getItem("product")) || [];
    prev.push(props.product);
    localStorage.setItem("product", JSON.stringify(prev));
  };

  return (
    <NavLink
      to={`/product/${props.id}`}
      className="m-1 border border-primary rounded p-3 d-flex flex-column justify-content-between">
      <div className="head">
        <p className="text-truncate m-0 text-primary">{props.title}</p>
        <p className="text-truncate text-secondary">{props.description}</p>
      </div>
      <div className="position-relative p-3 sale">
        {props.sale && (
          <p
            className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center fw-bold"
            style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
            Sale
          </p>
        )}
      </div>
      <div style={{ maxWidth: "200px", margin: "auto" }}>
        <img
          className="img-fluid w-100 d-block"
          src={props.image}
          alt="M-Gloves"
        />
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          {goldStars}
          {emptyStars}
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{props.price}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}>
              {+props.price + +props.discount}$
            </h6>
          </div>
        </div>
        <div className="border rounded" onClick={handleSave}>
          <img width="40px" src={cartIcon} alt="cartIcon" />
        </div>
      </div>
    </NavLink>
  );
}
