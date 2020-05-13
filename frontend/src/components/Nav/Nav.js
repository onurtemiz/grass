import React from 'react';
import { Link } from 'react-router-dom';

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
    </div>
  );
};

export default Nav;
