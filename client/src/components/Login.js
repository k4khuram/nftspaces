import { useEffect } from "react";
import ApplicationLogo from "./logo";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { userLogin, userSelector,clearState } from "../features/user/userSlice";



export  const Login = () =>  {

    const { isLoading, isError,errMessage,isSuccess,userInfo } = useSelector(userSelector)
    const dispatch = useDispatch()
    const { register,handleSubmit } = useForm()  
    const navigate = useNavigate()

    const onSubmit = (data) => {        
               dispatch(userLogin(data));
      };


      useEffect(() => {
        if (userInfo) {
          dispatch(clearState());
          navigate('/home')
        }
        if(isError){
            toast.error(errMessage);
            dispatch(clearState());
        }
      }, [navigate, userInfo,isError,dispatch])
    
    
    return (
        <div>
          {!userInfo && 
            (
                <div className="Auth-form-container">
                    <Toaster />
                    
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            Sign In
            <ApplicationLogo className="mt-3"></ApplicationLogo>
                              
            </h3>
          
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              
              {...register('email')}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              {...register('password')}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>

            )
         }
         </div>
    );
}