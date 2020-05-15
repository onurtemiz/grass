import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Logout from '../Logout/Logout';
const Nav = () => {
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <Link to="/">Anasayfa</Link>
      <Link to="/teachers" style={padding}>
        Teachers
      </Link>
      <Link to="/lessons" style={padding}>
        Lessons
      </Link>
      <Logout />
      <Filter />
    </div>
  );
};

export default Nav;
