import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <div
      className="hand"
      style={{
        height: props.height,
        backgroundImage: `url(${props.background})`,
        color: props.color,
      }}>
      <Container>
        <div
          className="col-lg-5 col-md-8 col-12 text-md-start text-center"
          style={{ marginLeft: props.position === "end" ? "auto" : "unset" }}>
          <h1 className="display-2 fw-bold">{props.title}</h1>
          <h5 className="fw-normal" style={{ color: "gray" }}>
            Another Nice Thing Which is used by someone i don't Know(random
            text)
          </h5>
          <Link
            to="/shop"
            className="btn btn-primary mt-3 px-4 fw-bold text-light">
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}
