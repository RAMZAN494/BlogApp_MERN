import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCat();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me!</span>
        <img
          className="sidebarImg"
          src="https://images.unsplash.com/photo-1521840891849-69baa8035cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A
          reprehenderit qui sit ex ab non porro assumenda.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
