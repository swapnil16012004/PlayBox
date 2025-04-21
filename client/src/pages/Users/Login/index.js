import { useContext, useEffect } from "react";
import { MyContext } from "../../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let context = useContext(MyContext);
  const navigate = useNavigate();
  // const API_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_API_URL // Use the production API URL
  //     : "http://localhost:8080";
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    context.setIsSubmitting(true);
    const formData = {
      username: form.username.value,
      password: form.password.value,
    };
    try {
      const response = await axios.post(
        form.action,
        new URLSearchParams(formData).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const data = response.data;
      context.setFlashMessage({ success: true, message: data.message });
      context.setCurrUser(data.user.username);
      context.setIsLoggedIn(true);
      setTimeout(() => {
        navigate(data.redirectUrl || "/listings");
      }, 100);
      console.log(context.flashMessage);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (context.flashMessage) {
      const timer = setTimeout(() => {
        context.setFlashMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [context.flashMessage]);
  return (
    <div className="row mt-5 login-color">
      <h1 className="col-6 offset-3">Login</h1>
      <div className="col-6 offset-3">
        <form
          action={`/login`}
          method="post"
          noValidate
          className="needs-validation"
          onSubmit={handleLogin}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
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
              required
            />
          </div>
          <button className="btn bttn btn-outlined">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
