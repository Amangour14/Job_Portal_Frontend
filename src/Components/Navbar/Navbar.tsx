import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Hooks/useAuth";
import { useQueryClient } from "react-query";
const Navbar: React.FC = () => {
  const navigate =useNavigate();
  const user = useAuth()
  const queryClient = useQueryClient();
  const handleLogout =() => {
    queryClient.setQueryData("user", null);
    navigate("/")
  }
  
  return (
    <div className="con">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul>
        {user.user ? <li id='login' onClick={() => handleLogout()} >Logout</li> : <li id="login">
            <Link to="/signup">Login/Signup</Link>
          </li>}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
