import { useContext, useEffect } from "react";
import { MyContext } from "../../../App";
import axiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      username: form.username.value,
      password: form.password.value,
    };

    console.log("Trying login with:", formData.username, formData.password);

    context.setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(
        "/login",
        new URLSearchParams(formData).toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("currUser", JSON.stringify(data.user));

      context.setCurrUser({
        username: data.user.username,
        id: data.user._id,
        watchlist: data.user.watchlist || [],
      });

      context.setIsLoggedIn(true);
      context.setFlashMessage({ success: true, message: data.message });

      setTimeout(() => {
        navigate(data.redirectUrl || "/listings");
      }, 100);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      context.setFlashMessage({
        success: false,
        message: error.response?.data?.message || "Login failed",
      });
    } finally {
      context.setIsSubmitting(false);
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
          <button
            className="btn bttn btn-outlined"
            disabled={context.isSubmitting}
          >
            {context.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
