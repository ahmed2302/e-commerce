import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, Cat } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const focus = useRef("");

  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image", form.image);
    try {
      await Axios.post(`${Cat}/${ADD}`, formData);
      navigate("/dashboard/categories");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <Form onSubmit={handleSubmit} className="custom-form">
        {" "}
        {/* Reusing the same form style */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            type="text"
            placeholder="Title..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="image"
            onChange={handleChange}
            required
            type="file"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </>
  );
}
