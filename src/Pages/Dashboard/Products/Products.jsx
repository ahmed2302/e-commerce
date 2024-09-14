import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Pro, PRO } from "../../../Api/Api";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";
import { Load } from "../../../Context/LoadingContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { setGettingData } = useContext(Load);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    setGettingData(true);
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setPageCount(data.data.last_page);
        setGettingData(false);
      })
      .catch((err) => console.log(err));
  }, [page, limit]);

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
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <>
      <div
        className="p-2 bg-white"
        style={{ border: "1px solid #dee2e6", borderRadius: "12px" }}>
        <div className="d-flex justify-content-between align-items-center py-2">
          <h3>Products Page</h3>
          <Link to={"/dashboard/addProducts"} className="btn btn-primary">
            Add Product
          </Link>
        </div>
        <CustomTable
          header={header}
          data={products}
          delete={handleDelete}
          setPage={setPage}
          setLimit={setLimit}
          limit={limit}
          pageCount={pageCount}
          search="title"
          searchLink={Pro}
        />
      </div>
    </>
  );
}
