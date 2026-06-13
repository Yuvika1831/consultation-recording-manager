import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "15px",
        borderBottom: "1px solid #ccc"
      }}
    >
      <Link to="/dashboard">
        Dashboard
      </Link>

      {" | "}

      <Link to="/upload">
        Upload
      </Link>

      {" | "}

      <button onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
