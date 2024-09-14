import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Cat, CAT } from "../../../Api/Api";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";
import { Load } from "../../../Context/LoadingContext";
import { Form } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { setGettingData } = useContext(Load);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    setGettingData(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setPageCount(data.data.last_page);
        setGettingData(false);
      })
      .catch((err) => console.log(err));
  }, [page, limit]);

  async function handleDelete(id) {
    try {
      setCategories((prev) => prev.filter((item) => item.id !== id));
      await Axios.delete(`${Cat}/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  const header = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <>
      <div
        className="p-2 bg-white"
        style={{ border: "1px solid #dee2e6", borderRadius: "12px" }}>
        <div className="d-flex justify-content-between align-items-center gap-2 py-2">
          <h3>Categoreis Page</h3>
          <Link to={"/dashboard/addCategory"} className="btn btn-primary">
            Add Category
          </Link>
        </div>
        <CustomTable
          header={header}
          data={categories}
          delete={handleDelete}
          setPage={setPage}
          setLimit={setLimit}
          limit={limit}
          pageCount={pageCount}
          search="title"
          searchLink={Cat}
        />
      </div>
    </>
  );
}
