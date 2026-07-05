import { Link , useNavigate} from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const  {store,dispatch} = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () =>{
		sessionStorage.removeItem ("token") ;
		dispatch({type:"logout"});
		navigate ("/login");

	};
		return (
			<nav className="navbar navbar-dark bg-danger px-3">
			    <Link to="/" className="navbar-brand mb-0 h1">
					<i className="fas fa-lock me-2"></i> JWT Auth
				</Link>
				<div className="d-flex gap-2">
					{store.token ? (
						<button className="btn btn-dark" onClick={handleLogout}>
							Cerrar sesion
						</button>
					) :(
						<>
						
						<Link to="/login" className="btn btn-dark"> Login</Link>
						<Link to="/signup" className="btn btn-dark"> Registro</Link>
						
						</>
					)}
					
				</div>
			
		</nav>
	);

};