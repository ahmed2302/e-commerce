import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TobBar from "../../Components/Dashboard/TobBar";
import { useContext } from "react";
import Loading from "../../Components/Loading/Loading";
import { Load } from "../../Context/LoadingContext";

export default function Dashboard() {
  const { loading } = useContext(Load);
  return (
    <>
      {loading && <Loading />}
      <div className="dashboard">
        <SideBar />
        <div style={{ margin: "10px", flex: "1" }} className="w-100">
          <TobBar />
          <div
            style={{
              borderRadius: "7px",
              overflow: "hidden",
            }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
