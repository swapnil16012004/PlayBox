import { useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { MyContext } from "../../../App";
import axiosInstance from "../../../axiosConfig";

const AddNewProduct = () => {
  const { show } = useParams();
  const navigate = useNavigate();
  const context = useContext(MyContext);

  // 🔐 Route protection: Only allow admin
  if (!context.isLoggedIn || context.currUser.username !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    context.setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await axiosInstance.post(`/listings/${show}`, formData);
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
          {/* ... All form fields unchanged ... */}
          <button className="btn bttn btn-outlined add-btn mt-3">Add</button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
