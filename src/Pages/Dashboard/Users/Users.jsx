import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import CustomTable from "../../../Components/Dashboard/Table";

export default function Users() {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   Axios.get(`/${USER}`)
  //     .then((data) => setCurrentUser(data.data))
  //     .catch((err) => console.log(err));
  //   Axios.get(`/${USERS}`)
  //     .then((data) => setUsers(data.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((response) => {
        setCurrentUser(response.data);
        return Axios.get(`/${USERS}`);
      })
      .then((response) => {
        setUsers(response.data);
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
  ];

  return (
    <div className="p-3">
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
      />
    </div>
  );
}
