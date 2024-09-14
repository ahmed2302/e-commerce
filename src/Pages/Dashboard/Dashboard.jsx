import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TobBar from "../../Components/Dashboard/TobBar";
import { useContext } from "react";
import Loading from "../../Components/Loading/Loading";
import { Load } from "../../Context/LoadingContext";
import { Menu } from "../../Context/MenuContext";

export default function Dashboard() {
  const { loading } = useContext(Load);
  const { isOpen } = useContext(Menu);
  return (
    <>
      {loading && <Loading />}
      <div className={isOpen ? "dashboard" : "dashboard close"}>
        <SideBar />
        <div className="dashboard-Home">
          <TobBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
