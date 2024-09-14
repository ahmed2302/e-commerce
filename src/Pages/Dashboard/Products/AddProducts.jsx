import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, CAT, EDIT, Pro, PROIMG } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import uploadimg from "../../../Assets/Images/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { Load } from "../../../Context/LoadingContext";

export default function AddProduct() {
  // useNaigate
  const navigate = useNavigate();

  // useState
  const [form, setForm] = useState({
    title: "",
    category: "select category",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const { setLoading } = useContext(Load);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadMsg, setUploadMsg] = useState("Drag Images here or browse");
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();

  // dummyData

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 123,
    discount: 0,
    About: "dummy",
  };

  // useRef
  const focus = useRef("");
  const uploader = useRef(null);
  const customUploader = useRef(null);
  const progress = useRef([]);
  const imagesId = useRef([]);

  // show Uploaded Images
  const imageList = images.map((img, key) => (
    <div className="mb-3" key={key}>
      <div className="d-flex justify-content-start align-items-center mb-2 gap-2">
        <img
          style={{ objectFit: "cover" }}
          width={80}
          height={60}
          src={URL.createObjectURL(img)}
          alt="file"
        />
        <div className="flex-grow-1">
          <p className="mb-0">{img.name}</p>
          <p className="mb-0">
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / 1024 / 1024).toFixed(2) + "MB"}
          </p>
        </div>
        <Button
          onClick={() => {
            handleDeleteImage(imagesId.current[key], img);
          }}
          variant="danger"
          style={{
            fontSize: "13px",
            padding: "0 10px",
            borderRadius: "4px",
          }}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </Button>
      </div>
      <div className="customProgress">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="innerProgress"></span>
      </div>
    </div>
  ));

  // get Categories
  useEffect(() => {
    focus.current.focus();
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  // show Categories
  const categoriesList = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ));

  //handle inputs change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  //handle submit form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${Pro}/${ADD}`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  //handle edit form
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${Pro}/${EDIT}/${id}`, form);
      setLoading(false);
      navigate("/dashboard/products");
    } catch (err) {
      console.log(err);
    }
  }

  const j = useRef(-1);
  // handle image change
  async function handleImagesChange(e) {
    setImages((prevImages) => [...prevImages, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`${PROIMG}/${ADD}`, data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        imagesId.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // handleDeleteImage
  async function handleDeleteImage(id, img) {
    try {
      setImages((prev) => prev.filter((image) => image !== img));
      await Axios.delete(`${PROIMG}/${id}`);
      imagesId.current = imagesId.current.filter((i) => i !== id);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form onSubmit={handleEdit} className="custom-form">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          value={form.category}
          required
          onChange={handleChange}>
          <option disabled>select category</option>
          {categoriesList}
        </Form.Select>
      </Form.Group>

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
          disabled={!sent}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          type="text"
          placeholder="Description..."
          disabled={!sent}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          type="text"
          placeholder="Price..."
          disabled={!sent}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          name="discount"
          value={form.discount}
          onChange={handleChange}
          required
          type="text"
          placeholder="Discount..."
          disabled={!sent}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label>About</Form.Label>
        <Form.Control
          name="About"
          value={form.About}
          onChange={handleChange}
          required
          type="text"
          placeholder="About..."
          disabled={!sent}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
        <Form.Label>Images</Form.Label>
        <Form.Control
          onChange={handleImagesChange}
          type="file"
          multiple
          hidden
          ref={uploader}
          disabled={!sent}
        />
      </Form.Group>

      <div
        ref={customUploader}
        onDragOver={(e) => {
          e.preventDefault();
          customUploader.current.style.border = "2px solid #0086fe";
          customUploader.current.style.backgroundColor = "#0083f71c";
          setUploadMsg("Release to upload or browse");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          customUploader.current.style.border = "2px dashed #0086fe";
          customUploader.current.style.backgroundColor = "unset";
          setUploadMsg("Drag Images here or browse");
        }}
        onDrop={async (e) => {
          e.preventDefault();
          setImages((prevImages) => [...prevImages, ...e.dataTransfer.files]);
          const imagesAsFiles = e.dataTransfer.files;
          const data = new FormData();
          for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++;
            data.append("image", imagesAsFiles[i]);
            data.append("product_id", id);
            try {
              await Axios.post(`${PROIMG}/${ADD}`, data, {
                onUploadProgress: (progressEvent) => {
                  const { loaded, total } = progressEvent;
                  const percent = Math.floor((loaded * 100) / total);
                  progress.current[j.current].style.width = `${percent}%`;
                  progress.current[j.current].setAttribute(
                    "percent",
                    `${percent}%`
                  );
                },
              });
            } catch (err) {
              console.log(err);
            }
          }
          customUploader.current.style.border = "2px dashed #0086fe";
          customUploader.current.style.backgroundColor = "unset";
        }}
        onClick={() => {
          uploader.current.click();
        }}
        className="d-flex justify-content-center align-items-center gap-2 flex-column mb-3 py-4 w-100"
        style={{
          border: "2px dashed #0086fe",
          cursor: !sent ? "auto" : "pointer",
          opacity: !sent ? "0.2" : "1",
        }}>
        <img src={uploadimg} alt="upload here" width="100px" />
        <div className="fw-bold mb-0 text-center" style={{ color: "#0086fe" }}>
          {uploadMsg}
          <div>Upload Images with no need to save form</div>
        </div>
      </div>
      <div className="my-3">{imageList}</div>
      <Button disabled={!sent} variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}
