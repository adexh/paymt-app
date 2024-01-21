import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, unAuthenticate } from "../slice/userSlice";
import { authService } from "../services/auth";

const Privateroute = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state=>state.user);

  if(isAuthenticated){
    return <Outlet />
  }
  else {
      authService().then(auth=>{
        if(auth){
          console.debug("Setting authenticated from private route");
          dispatch(setAuthenticated());
          return <Outlet/>
        } else {
          console.debug("Unauthenticating from private route");
          dispatch(unAuthenticate());
          // return window.history.length > 1?<Navigate to={'/'} replace state={{from:{location}}}/>:<Navigate to={'/'} state={{from:{location}}}/>
          navigate('/signin',{ replace: true, state: { from: {location} }});
        }
      })
  }
}

export default Privateroute;