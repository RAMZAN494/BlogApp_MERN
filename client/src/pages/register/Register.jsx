import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter UserName..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Emial:</label>
        <input
          className="registerInput"
          type="text"
          placeholder="example@gmail.com...."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          className="registerInput"
          type="password"
          placeholder="You Password Here...."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && <span>Something Went Wrong</span>}
    </div>
  );
}

export default Register;
