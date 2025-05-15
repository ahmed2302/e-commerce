import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Website/Home/HomePage.jsx";
import Login from "./Pages/Auth/AuthOperations/Login.jsx";
import Register from "./Pages/Auth/AuthOperations/Register.jsx";
import GoogleCallBack from "./Pages/Auth/AuthOperations/GoogleCallBack.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import RequireAuth from "./Pages/Auth/Protected/RequireAuth.js";
import Err403 from "./Pages/Auth/Errors/Err403.jsx";
import Err404 from "./Pages/Auth/Errors/Err404.jsx";
import RequireBack from "./Pages/Auth/Protected/RequireBack.js";
import Users from "./Pages/Dashboard/Users/Users.jsx";
import AddUser from "./Pages/Dashboard/Users/AddUser.jsx";
import User from "./Pages/Dashboard/Users/User.jsx";
import Categories from "./Pages/Dashboard/Category/Categories.jsx";
import AddCategory from "./Pages/Dashboard/Category/AddCategory.jsx";
import Category from "./Pages/Dashboard/Category/Category.jsx";
import Products from "./Pages/Dashboard/Products/Products.jsx";
import AddProduct from "./Pages/Dashboard/Products/AddProducts.jsx";
import Product from "./Pages/Dashboard/Products/Product.jsx";
import WebsiteCategories from "./Pages/Website/Categories/WebsiteCategories.jsx";
import Website from "./Pages/Website/Website.jsx";
import SingleProduct from "./Pages/Website/SignleProduct/SingleProduct.jsx";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />
        {/* Portected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="403" element={<Err403 />} />

            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="addUser" element={<AddUser />} />
              <Route path="users/:id" element={<User />} />
            </Route>

            {/* Categories */}
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="addCategory" element={<AddCategory />} />
              <Route path="categories/:id" element={<Category />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="addProducts" element={<AddProduct />} />
              <Route path="products/:id" element={<Product />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
