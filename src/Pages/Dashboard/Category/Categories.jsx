import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Cat, CAT } from "../../../Api/Api";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

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
  ];

  return (
    <>
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center py-2">
          <h3>Categoreis Page</h3>
          <Link to={"/dashboard/addCategory"} className="btn btn-primary">
            Add Category
          </Link>
        </div>
        <CustomTable header={header} data={categories} delete={handleDelete} />
      </div>
    </>
  );
}
