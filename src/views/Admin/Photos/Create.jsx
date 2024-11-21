//import react
import { useState } from "react";

//import Api
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import Cookies js
import Cookies from "js-cookie";

export default function PhotosCreate(props) {
  //define state "photo"
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  //define state "errors"
  const [errors, setErrors] = useState([]);

  //token
  const token = Cookies.get("token");

  const storePhoto = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to formData
    formData.append("image", image);
    formData.append("caption", caption);

    await Api.post(`/api/admin/photos`, formData, {
      //header
      headers: {
        //header + token
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-center",
          duration: 6000,
        });

        //set input file to null
        document.getElementById("file").value = "";

        //fetchData
        props.fetchData();

        // Reset error messages
        setErrors("");
        setImage("");
        setCaption("");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm border-top-success">
      <div className="card-body">
        <form onSubmit={storePhoto}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="file"
              className="form-control"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {errors.image && (
            <div className="alert alert-danger">{errors.image[0]}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Caption</label>
            <input
              type="text"
              className="form-control"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter Title Photo"
            />
          </div>
          {errors.caption && (
            <div className="alert alert-danger">{errors.caption[0]}</div>
          )}
          <div>
            <button type="submit" className="btn btn-md btn-primary me-2">
              <i className="fa fa-save"></i> Upload
            </button>
            <button type="reset" className="btn btn-md btn-warning">
              <i className="fa fa-redo"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
