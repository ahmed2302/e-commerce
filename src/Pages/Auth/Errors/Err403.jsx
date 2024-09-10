import React from "react";
import { Link } from "react-router-dom";

export default function Err403({ role }) {
  const target = role === "1996" ? "writer" : "/";
  const msg = role === "1996" ? "Return To Writer Page" : "Return To Home Page";
  return (
    <div class="ErrPage">
      <h1>403</h1>
      <h2>Forbidden</h2>
      <p>Sorry, you don't have permission to access this page.</p>
      <Link to={target}>{msg}</Link>
    </div>
  );
}
