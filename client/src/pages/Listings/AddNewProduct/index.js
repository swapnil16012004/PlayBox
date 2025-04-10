import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../../App";
import axios from "axios";

const AddNewProduct = () => {
  const { show } = useParams();
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    context.setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axios.post(form.action, formData);
      const data = response.data;

      if (data.success) {
        context.setFlashMessage({ success: true, message: data.message });
        navigate("/listings");
      } else {
        context.setFlashMessage({ success: false, message: data.message });
      }
    } catch (error) {
      context.setFlashMessage({
        success: false,
        message: "An error occurred while submitting the form.",
      });
    } finally {
      context.setIsSubmitting(false);
    }
  };
  return (
    <div className="row mt3 new-color">
      <div className="col-8 offset-2">
        <br />
        <br />
        <h3>Add a new {show} Show</h3>
        <form
          method="post"
          action={`/listings/${show}`}
          noValidate
          className="needs-validation"
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="listing[title]"
              placeholder="add a catchy title"
              className="form-control"
              id="title"
              required
            />
            <div className="invalid-feedback">Please enter the title!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Show Image
            </label>
            <input
              type="file"
              name="listing[image]"
              className="form-control"
              id="image"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imgBanner" className="form-label">
              Upload Banner Image
            </label>
            <input
              type="file"
              name="listing[imgBanner]"
              className="form-control"
              id="imgBanner"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="logo" className="form-label">
              Upload logo Image
            </label>
            <input
              type="file"
              name="listing[logo]"
              className="form-control"
              id="logo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Enter description
            </label>
            <textarea
              name="listing[description]"
              className="form-control"
              id="description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="video" className="form-label">
              Video link
            </label>
            <input
              type="text"
              name="listing[video]"
              className="form-control"
              id="video"
              required
            />
            <div className="invalid-feedback">video link should be valid</div>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              name="listing[category]"
              value={`${show}`}
              placeholder="enter category"
              className="form-control"
              id="category"
              required
              readOnly
            />
            <div className="invalid-feedback">Please enter the category!</div>
          </div>
          <button className="btn bttn btn-outlined add-btn mt-3">Add</button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
