import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TobBar from "../../Components/Dashboard/TobBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SideBar />
      <div style={{ margin: "10px" }} className="w-100">
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
  );
}
