import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, LOGIN } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import loginByGoogle from "../../../Assest/Images/login.png";
import { Button, Form } from "react-bootstrap";

export default function Register() {
  // UseState
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // UseRef
  const focus = useRef("");

// handle focus on form
  useEffect(() => {
    focus.current.focus();
  }, []);

  // handle Change Inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      setErr("");
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("token", token);
      window.location.pathname = "/dashboard";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) setErr("Wrong Email or Password");
      else setErr("Internal Server ERR");
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#001f3f" }}>
        <Form className="custom-form w-75 h-75" onSubmit={handleSubmit}>
          <h1 className="text-primary  my-4 mx-0">Login Now</h1>
          <Form.Group
            className="form-custom"
            controlId="exampleForm.ControlInput2">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Your Email..."
              value={form.email}
              onChange={handleChange}
              required
              ref={focus}
            />
            <Form.Label>Email</Form.Label>
          </Form.Group>
          <Form.Group
            className="form-custom"
            controlId="exampleForm.ControlInput3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />
            <Form.Label>Password</Form.Label>
          </Form.Group>
          <Button onClick={handleSubmit} className="btn btn-success py-2 px-5">
            Login
          </Button>

          <div className="google-btn my-2 mx-0">
            <a href={`http://127.0.0.1:8000/login-google`}>
              <img
                style={{
                  width: "200px",
                }}
                src={loginByGoogle}
                alt=""
              />
            </a>
          </div>
          {err !== "" && <div className="error">{err}</div>}
        </Form>
      </div>
    </>
  );
}
