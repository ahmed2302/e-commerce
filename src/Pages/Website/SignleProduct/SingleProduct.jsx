import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { Latest, Pro } from "../../../Api/Api";
import ImageGallery from "react-image-gallery";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Components/Loading/Loading";
import Section from "../../../Components/Website/Product/Section";
import cartIcon from "../../../Assets/Images/cart.png";

export default function SingleProduct() {
  const { id } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const stars = Math.min(Math.round(product.rating), 5);
  const goldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon color="gold" key={key} icon={solid} />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${Pro}/${id}`)
      .then((res) => {
        setProductImages([
          ...res.data[0].images.map((img) => ({
            original: img.image,
            thumbnail: img.image,
          })),
        ]);
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = () => {
    const prev = JSON.parse(localStorage.getItem("product")) || [];
    prev.push(product);
    localStorage.setItem("product", JSON.stringify(prev));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className="mt-5">
          <div className="d-flex align-items-start flex-wrap">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="image-gallery-wrapper">
                <ImageGallery items={productImages} />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title}</h1>
                <p style={{ color: "gray" }}>{product.About}</p>
                <h3 className="fw-normal">{product.description}</h3>
                <hr />
                <div className="d-flex justify-content-between flex-wrap align-items-center mt-2">
                  <div>
                    {goldStars}
                    {emptyStars}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.price}$</h5>
                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}>
                        {+product.price + +product.discount}$
                      </h6>
                    </div>
                  </div>
                  <div
                    className="rounded border"
                    style={{ cursor: "pointer" }}
                    onClick={handleSave}>
                    <img width="40px" src={cartIcon} alt="cartIcon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Section api={Latest} header="Latest Products" />
        </Container>
      )}
    </>
  );
}
