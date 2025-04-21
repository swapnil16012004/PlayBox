// const SignUp = () => {
//   return (
//     <div class="row mt-5 signup-color">
//       <h1 class="col-6 offset-3">Signup on Gostream</h1>
//       <div class="col-6 offset-3">
//         <form
//           action="/signup"
//           method="post"
//           novalidate
//           class="needs-validation"
//         >
//           <div class="mb-3">
//             <label for="username" class="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               class="form-control"
//               id="username"
//               required
//             />
//             <div class="valid-feedback">Looks good!</div>
//           </div>
//           <div class="mb-3">
//             <label for="email" class="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               class="form-control"
//               id="email"
//               required
//             />
//           </div>
//           <div class="mb-3">
//             <label for="password" class="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               class="form-control"
//               id="password"
//               required
//             />
//           </div>
//           <button class="btn bttn btn-outlined">SignUp</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
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
    try {
      const response = await axiosInstance.post(`/signup`, formData);
      console.log("Signup successful:", response.data);
      navigate("/listings");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
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
