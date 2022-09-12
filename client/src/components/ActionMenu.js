import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket,faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout,userSelector } from "../features/user/userSlice"

export const ActionMenue = () =>{

    const dispatch = useDispatch()
    const {userInfo}  = useSelector(userSelector);

    return (

        <div className="dropdown">
             <button className="btn twitter-btn dropdown-toggle" type="button" 
             id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                 <FontAwesomeIcon icon={faUser} />  {userInfo.first_name}
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
             {/* <li> <a className="dropdown-item" href="" >
            <FontAwesomeIcon icon={faTwitter} /> Login with twitter</a></li>     */}

            <li><a className="dropdown-item" onClick={()=>dispatch(logout())}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout</a></li>
            </ul>
        </div>
    );

}