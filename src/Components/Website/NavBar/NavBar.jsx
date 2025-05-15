import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import cart from "../../../Assets/Images/cart.png";
import profile from "../../../Assets/Images/profile.png";
import { CAT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import shortText from "../../../Helpers/ShortText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // تأكد من استيراد الأنماط الخاصة بالهيكل
import "./NavBar.css";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => {
        setCategories(res.data.slice(-8));
      })
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false));
  }, []);

  const categoriesList = categories.map((category, key) => (
    <Link to="" key={key} className="category-title border rounded">
      {shortText(category.title, 15)}
    </Link>
  ));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar">
        <Container>
          <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
            <Link className="col3" to="/">
              <img width="200px" src={logo} alt="logo" />
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                placeholder="Search Product"
                className="form-control custom-search rounded-0 py-3"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex justify-content-center align-items-center">
                Search
              </h3>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-end gap-3 order-md-3 order-1">
              <div onClick={handleShow}>
                <img width="50px" src={cart} alt="cart" />
              </div>
              <Link to="/profile">
                <img width="35px" src={profile} alt="profile" />
              </Link>
            </div>
          </div>

          {loading ? (
            <Skeleton
              count={8}
              height={40}
              width={100}
              inline={true}
              style={{ margin: "10px" }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap mt-3">
              {categoriesList}
              <Link className="category-title border rounded" to="/categories">
                Show All Cateory
              </Link>
            </div>
          )}
        </Container>
      </nav>
    </>
  );
}
