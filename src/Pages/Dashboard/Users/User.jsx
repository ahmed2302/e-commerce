import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { EDIT, USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Load } from "../../../Context/LoadingContext";

export default function User() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [disable, setDisable] = useState(true);

  const { setLoading } = useContext(Load);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${USER}/${EDIT}/${id}`, form);
      setLoading(false);
      navigate("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setForm({
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        });
        setLoading(false);
      })
      .catch((err) => navigate("/dashboard/users/page/404", { replace: true }))
      .finally(() => {
        setDisable(false);
      });
  }, [id]);

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
        <Form.Label>Role</Form.Label>
        <Form.Select name="role" value={form.role} onChange={handleChange}>
          <option disabled value="">
            Select Role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1996">Writer</option>
          <option value="1999">Product Manger</option>
        </Form.Select>
      </Form.Group>
      <Button disabled={disable} variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}
