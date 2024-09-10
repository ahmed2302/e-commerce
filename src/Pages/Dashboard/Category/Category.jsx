import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { Cat, EDIT } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function Category() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    image: "",
  });

  const [disable, setDisable] = useState(true);

  const [loading, setLoading] = useState(false);

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
      await Axios.post(`${Cat}/${EDIT}/${id}`, formData);
      navigate("/dashboard/categories");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setForm({
          title: data.data.title,
          image: data.data.image,
        });
        setLoading(false);
      })
      .catch((err) =>
        navigate("/dashboard/categories/page/404", { replace: true })
      )
      .finally(() => {
        setDisable(false);
      });
  }, [id, navigate]);

  return (
    <>
      {loading ? <Loading /> : <></>}
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            type="text"
            placeholder="Name..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control name="image" onChange={handleChange} type="file" />
        </Form.Group>

        <Button disabled={disable} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
}
