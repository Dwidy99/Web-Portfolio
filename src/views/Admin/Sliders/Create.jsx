//import react
import { useState } from "react";

//import toast js
import Api from "../../../services/Api";

//import toast js
import toast from "react-hot-toast";
//import cookies js
import Cookies from "js-cookie";

export default function SlidersCreate(props) {
  //state
  const [image, setImage] = useState("");

  //errors state
  const [errors, setErrors] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "storeSlider"
  const storeSlider = async (e) => {
    e.preventDefault();

    //define fromData
    const formData = new FormData();

    //append to image
    formData.append("image", image);

    await Api.post(`/api/admin/sliders`, formData, {
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

        //fetch data
        props.fetchData();

        //reset image form
        setImage("");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm border-top-success">
      <div className="card-body">
        <form onSubmit={storeSlider}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="file"
              className="form-control"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {errors.image && (
              <div className="alert alert-danger mt-1">{errors.image[0]}</div>
            )}
          </div>

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
