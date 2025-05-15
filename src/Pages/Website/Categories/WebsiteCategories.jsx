import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import shortText from "../../../Helpers/ShortText";
import Skeleton from "react-loading-skeleton";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoading(false));
  }, []);

  const categoriesList = categories.map((category, key) => (
    <div key={key} className="p-2 bg-white d-flex align-items-center gap-2">
      <img width="45px" src={category.image} alt="cat" />
      <p className="m-0">{shortText(category.title, 15)}</p>
    </div>
  ));

  const skeletonList = Array.from({ length: 10 }).map((product, key) => (
    <div key={key} className="m-1">
      <Skeleton height="30px" baseColor="white" highlightColor="gray" />
    </div>
  ));

  return (
    <div className="bg-primary-subtle vh-100">
      <Container
        className="d-grid py-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}>
        {loading ? skeletonList : categoriesList}
      </Container>
    </div>
  );
}
