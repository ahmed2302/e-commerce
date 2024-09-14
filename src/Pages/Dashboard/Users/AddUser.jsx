import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Load } from "../../../Context/LoadingContext";

export default function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const { setLoading } = useContext(Load);

  const focus = useRef("");

  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/${ADD}`, form);
      setLoading(false);
      navigate("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="custom-form">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          type="text"
          placeholder="Name..."
          ref={focus}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          placeholder="Email..."
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={8}
          type="password"
          placeholder="Password..."
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Role</Form.Label>
        <Form.Select
          required
          name="role"
          value={form.role}
          onChange={handleChange}>
          <option disabled value="">
            Select Role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1996">Writer</option>
          <option value="1999">Product Manager</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
}
