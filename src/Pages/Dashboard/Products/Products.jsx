import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Pro, PRO } from "../../../Api/Api";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`/${PRO}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleDelete(id) {
    try {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      await Axios.delete(`${Pro}/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    { key: "price", name: "Price" },
    { key: "rating", name: "Rating" },
  ];

  return (
    <>
      <div className=" w-100 p-2">
        <div className="d-flex justify-content-between align-items-center py-2">
          <h3>Products Page</h3>
          <Link to={"/dashboard/addProducts"} className="btn btn-primary">
            Add Product
          </Link>
        </div>
        <CustomTable header={header} data={products} delete={handleDelete} />
      </div>
    </>
  );
}
