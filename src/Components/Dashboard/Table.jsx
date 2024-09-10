import { faDeleteLeft, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css";

export default function CustomTable(props) {
  const currentUser = props.currentUser || false;

  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));

  const dataShow = props.data.map((item, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
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
            <img className="catImage" src={item[item2.key]} alt="cat" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center gap-1">
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
    <Table striped hover className="table-custom">
      <thead>
        <tr>
          <th>Id</th>
          {headerShow}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && (
          <tr className="text-center">
            <td colSpan={12}>Loading...</td>
          </tr>
        )}
        {dataShow}
      </tbody>
    </Table>
  );
}
