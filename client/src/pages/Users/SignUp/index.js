import { useState, useContext } from "react";
import axiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../App";

const SignUp = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(`/signup`, formData);
      const data = response.data;

      // ✅ Store token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("currUser", JSON.stringify(data.user));

      context.setFlashMessage({ success: true, message: data.message });
      context.setCurrUser(data.user.username);
      context.setIsLoggedIn(true);

      setTimeout(() => {
        navigate(data.redirectUrl || "/listings");
      }, 100);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      context.setFlashMessage({
        success: false,
        message:
          error.response?.data?.message || "Signup failed. Try again later.",
      });
    } finally {
      context.setIsSubmitting(false);
    }
  };

  return (
    <div className="row mt-5 signup-color">
      <h1 className="col-6 offset-3">Signup on Gostream</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn bttn btn-outlined">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
