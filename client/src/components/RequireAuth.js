import { Navigate } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { userSelector } from '../features/user/userSlice'
import { useSelector } from 'react-redux'


export const  RequireAuth =({ children })=> {
    
    const location = useLocation();

    const { userInfo } = useSelector(userSelector)

      return userInfo ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
  }
  
