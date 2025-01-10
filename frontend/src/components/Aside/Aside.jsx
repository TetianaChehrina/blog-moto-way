import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLogin, selectUser } from "../../redux/auth/selectors.js";
import { logOut } from "../../redux/auth/operations.js";
import Button from "@mui/material/Button";

const Aside = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <aside style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: "80px 0 0 0" }}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "blue" : "inherit",
              fontWeight: isActive ? "bold" : "normal",
              display: "block",
              marginBottom: "10px",
            })}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "blue" : "inherit",
              fontWeight: isActive ? "bold" : "normal",
              display: "block",
              marginBottom: "10px",
            })}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "blue" : "inherit",
              fontWeight: isActive ? "bold" : "normal",
              display: "block",
              marginBottom: "10px",
            })}
          >
            Contact
          </NavLink>
        </li>
        {isLogin ? (
          <>
            <li style={{ marginTop: "20px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Welcome, {user.username}
              </span>
            </li>
            <li>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogOut}
                style={{ marginTop: "10px" }}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/register"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                  display: "block",
                  marginBottom: "10px",
                })}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                  display: "block",
                })}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
