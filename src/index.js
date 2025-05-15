import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import LoadingContext from "./Context/LoadingContext";
import "./index.css";
import "./Components/Dashboard/table.css";
import "./CSS/Components/alerts.css";
import "./CSS/Components/loading.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import "./Pages/Website/Home/Home.css";
import "./Components/Dashboard/Pagination/pagination.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingContext>
      <WindowContext>
        <MenuContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MenuContext>
      </WindowContext>
    </LoadingContext>
  </React.StrictMode>
);
