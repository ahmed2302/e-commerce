import { useContext, useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";
import { Load } from "../../../Context/LoadingContext";

export default function Users() {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);
  const { setGettingData } = useContext(Load);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    setGettingData(true);
    Axios.get(`/${USER}`)
      .then((response) => {
        setCurrentUser(response.data);
        return Axios.get(`/${USERS}?limit=${limit}&page=${page}`);
      })
      .then((response) => {
        setUsers(response.data.data);
        setPageCount(response.data.last_page);
        setGettingData(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleDelete(id) {
    try {
      setUsers((prev) => prev.filter((item) => item.id !== id));
      await Axios.delete(`${USER}/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  const header = [
    { key: "name", name: "UserName" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <div
      className="p-2 bg-white"
      style={{ border: "1px solid #dee2e6", borderRadius: "12px" }}>
      <div className="d-flex justify-content-between align-items-center py-2">
        <h3 style={{ fontWeight: "bold", color: "#343a40" }}>Users Page</h3>
        <Link to={"/dashboard/addUser"} className="btn btn-primary">
          Add User
        </Link>
      </div>

      <CustomTable
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        pageCount={pageCount}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}
