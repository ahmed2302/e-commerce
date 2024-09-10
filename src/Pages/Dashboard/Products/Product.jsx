import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { ADD, CAT, EDIT, Pro, PROIMG } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import uploadimg from "../../../Assest/Images/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct() {
  // useNaigate
  const navigate = useNavigate();

  const ProductId = useParams().id;

  // useState
  const [form, setForm] = useState({
    title: "",
    category: "select category",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadMsg, setUploadMsg] = useState("Drag Images here or browse");
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState();

  // useRef
  const focus = useRef("");
  const uploader = useRef(null);
  const customUploader = useRef(null);
  const progress = useRef([]);
  const imagesId = useRef([]);
  const deletedImgages = useRef([]);

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

  // show Images From Server
  const imageFromServerList = imagesFromServer.map((img, key) => (
    <div
      key={key}
      className="d-flex justify-content-start align-items-center mb-2 gap-2 position-relative">
      <img
        style={{ objectFit: "cover" }}
        width={100}
        height={60}
        src={img.image}
        alt="file"
      />
      <Button
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          fontSize: "13px",
          padding: "0 10px",
          borderRadius: "4px",
        }}
        onClick={() => {
          handleDeleteImageFromServer(img.id, img);
        }}
        variant="danger">
        <FontAwesomeIcon icon={faDeleteLeft} />
      </Button>
    </div>
  ));

  // get Categories
  useEffect(() => {
    focus.current.focus();
    Axios.get(`/${CAT}`)
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // get Product
  useEffect(() => {
    focus.current.focus();
    Axios.get(`/${Pro}/${ProductId}`)
      .then((data) => {
        setImagesFromServer(data.data[0].images);
        setId(data.data[0].id);
        setForm({
          title: data.data[0].title,
          category: data.data[0].category,
          description: data.data[0].description,
          price: data.data[0].price,
          discount: data.data[0].discount,
          About: data.data[0].About,
        });
        setDisabled(false);
      })
      .catch((err) => console.log(err));
  }, [ProductId]);

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
  }

  // handle edit form
  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    if (deletedImgages.current.length > 0) {
      deletedImgages.current.map(async (id) => {
        try {
          await Axios.delete(`${PROIMG}/${id}`);
        } catch (err) {
          console.log(err);
        }
      });
    }

    try {
      await Axios.post(`${Pro}/${EDIT}/${ProductId}`, form);
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
    } catch (err) {
      console.log(err);
    }
  }

  // handleDeleteImageFromServer
  async function handleDeleteImageFromServer(id, img) {
    setImagesFromServer((prev) => prev.filter((image) => image !== img));
    imagesId.current = imagesId.current.filter((i) => i !== id);
    deletedImgages.current.push(id);
  }

  return (
    <>
      {loading && <Loading />}
      <Form onSubmit={handleEdit} className="custom-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput0">
          <Form.Label>Category</Form.Label>
          <Form.Select
            disabled={disabled}
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
            disabled={disabled}
            value={form.title}
            onChange={handleChange}
            required
            type="text"
            placeholder="Title..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            disabled={disabled}
            value={form.description}
            onChange={handleChange}
            required
            type="text"
            placeholder="Description..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            disabled={disabled}
            value={form.price}
            onChange={handleChange}
            required
            type="text"
            placeholder="Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name="discount"
            disabled={disabled}
            value={form.discount}
            onChange={handleChange}
            required
            type="text"
            placeholder="Discount..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>About</Form.Label>
          <Form.Control
            name="About"
            disabled={disabled}
            value={form.About}
            onChange={handleChange}
            required
            type="text"
            placeholder="About..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Images</Form.Label>
          <Form.Control
            onChange={handleImagesChange}
            type="file"
            disabled={disabled}
            multiple
            hidden
            ref={uploader}
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
            customUploader.current.style.border = "2px dashed #0086fe";
            customUploader.current.style.backgroundColor = "unset";
          }}
          onClick={() => {
            uploader.current.click();
          }}
          className="d-flex justify-content-center align-items-center gap-2 flex-column mb-3 py-4 w-100"
          style={{
            border: "2px dashed #0086fe",
            cursor: disabled ? "auto" : "pointer",
            opacity: disabled ? "0.2" : "1",
          }}>
          <img src={uploadimg} alt="upload here" width="100px" />
          <div
            className="fw-bold mb-0 text-center"
            style={{ color: "#0086fe" }}>
            {uploadMsg}
            <div>Upload Images with no need to save form</div>
          </div>
        </div>
        <div className="my-3">
          <div className="d-flex align-items-center gap-2">
            {imageFromServerList}
          </div>
          {imageList}
        </div>
        <Button disabled={disabled} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
}
