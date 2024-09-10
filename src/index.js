import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./CSS/Components/alerts.css";
import "./CSS/Components/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import App from "./App";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
