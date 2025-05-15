import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Product from "./Product";

export default function Section(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${props.api}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const ProductsList = products.map((product, key) => (
    <Product
      key={key}
      title={product.title}
      description={product.description}
      price={product.price}
      discount={product.discount}
      image={product.images[0].image}
      rating={product.rating}
      id={product.id}
      sale={props.sale}
      product={product}
    />
  ));

  const skeletonList = Array.from({ length: 5 }).map((_, key) => (
    <div key={key} className="m-1">
      <Skeleton />
      <Skeleton />
      <Skeleton height="250px" />
      <Skeleton />
      <Skeleton />
    </div>
  ));

  return (
    <Container className="py-5">
      <h1>{props.header}</h1>
      <div
        className="d-grid gap-2 py-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}>
        {loading ? skeletonList : ProductsList}
      </div>
    </Container>
  );
}
