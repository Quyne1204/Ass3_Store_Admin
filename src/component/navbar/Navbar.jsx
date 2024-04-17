
import "./navbar.css"
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/context";

const Navbar = () => {
  const { logout } = useContext(UserContext)
  return (
    <div className="navbar">
      <div className="header">
        <h2>Admin Page</h2>
      </div>
      <div className="nav">
        <ul className="main">
          <h5>MAIN</h5>
          <li>
            <NavLink to="/" > DashBoard</NavLink>
          </li>
        </ul>
        <ul className="lists">
          <h5>LIST</h5>
          <li>
            <NavLink to="/products" > Products </NavLink>
          </li>
          <li>
            <NavLink to="/orders" > Orders </NavLink>
          </li>
        </ul>
        <ul className="new">
          <h5>NEW</h5>
          <li>
            <NavLink to="/new" > New Product </NavLink>
          </li>
        </ul>
        <ul className="user">
          <h5>USER</h5>
          <li>
            <button className="btn" onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
