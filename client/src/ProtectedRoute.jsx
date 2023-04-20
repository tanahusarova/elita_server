import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decoded = jwt.verify(token, 'my_secret_key');
        if (!allowedRoles.includes(decoded.role)) {
          navigate('/unauthorized');
        }
      } catch (err) {
        navigate('/login');
      }
    }
  }, []);

  return <Component {...rest} />;
};

export default ProtectedRoute;
