import { faDeleteLeft, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Load } from "../../Context/LoadingContext";
import PaginatedItems from "./Pagination/Pagination";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../Helpers/TransformDate.js";

export default function CustomTable(props) {
  const currentUser = props.currentUser || false;

  // can remove it with some edit on the code
  const { gettingData } = useContext(Load);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filtredDataByDate = props.data.filter(
    (item) => TransformDate(item.created_at) === date
  );

  const filtredSearchByDate = filteredData.filter(
    (item) => TransformDate(item.created_at) === date
  );

  const dataToDisplay =
    date.length !== 0
      ? search.length > 0
        ? filtredSearchByDate
        : filtredDataByDate
      : search.length > 0
      ? filteredData
      : props.data;

  async function handleSearch() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const timmer = setTimeout(() => {
      search.length > 0 ? handleSearch() : setSearchLoading(false);
    }, 300);

    return () => clearTimeout(timmer);
  }, [search]);

  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));

  const dataShow = dataToDisplay.map((item, key) => (
    <tr key={key}>
      <td style={{ minWidth: "80px" }}>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item[item2.key] === "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "product manager"
          ) : item2.key === "image" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap",
                gap: "10px",
                overflow: "auto",
                width: "255px",
                scrollbarWidth: "none",
              }}>
              <img className="catImage" src={item[item2.key]} alt="cat" />
            </div>
          ) : item2.key === "images" ? (
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "10px",
                overflow: "auto",
                width: "255px",
                scrollbarWidth: "none",
                cursor: "all-scroll",
              }}>
              {item[item2.key].map((img, key) => (
                <img
                  key={key}
                  style={{ width: "60px" }}
                  className="productImage"
                  src={img.image}
                  alt="pro"
                />
              ))}
            </div>
          ) : item2.key === "updated_at" || item2.key === "created_at" ? (
            TransformDate(item[item2.key])
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && "   (you)"}
        </td>
      ))}
      <td>
        <div className="d-flex gap-2 justify-content-center align-items-center">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon className="btn btn-primary" icon={faUserPen} />
          </Link>
          <FontAwesomeIcon
            style={{
              pointerEvents: item.id === currentUser.id ? "none" : "auto",
              opacity: item.id === currentUser.id ? ".2" : "1",
            }}
            onClick={() => {
              props.delete(item.id);
            }}
            className="btn btn-danger"
            icon={faDeleteLeft}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="d-flex align-items-center gap-2 mb-3">
        <Form.Control
          type="search"
          placeholder="Search..."
          aria-label="input-example"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
        <Form.Control
          type="date"
          aria-label="input-example"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <Table striped hover className="table-custom">
          <thead>
            <tr>
              <th>Id</th>
              {headerShow}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gettingData ? (
              <tr className="text-center">
                <td colSpan={12}>Loading</td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
            {dataShow.length === 0 && !gettingData && !searchLoading && (
              <tr className="text-center">
                <td colSpan={12}>no data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {props.pageCount > 1 && (
          <div className="col-12 col-md-1">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                props.setLimit(e.target.value);
                props.setPage(1);
              }}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Select>
          </div>
        )}
        <PaginatedItems
          className="custom-pagination"
          setPage={props.setPage}
          pageCount={props.pageCount}
        />
      </div>
    </>
  );
}
