import React, { useState, useEffect } from 'react';
import usersService from '../../services/user';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    usersService.checkAdmin(setIsAdmin);
  }, []);
  return isAdmin;
};

export default useAdmin;
