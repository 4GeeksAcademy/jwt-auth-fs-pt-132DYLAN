import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export  const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState ("");
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const {dispatch} = useGlobalReducer();

      const handleLogin = async ()=> {
        if(email ===""|| password===""){
            setError("Debes rellenar todos los campos");
            return;
        }
        try {
            const response = await fetch (import.meta.env.VITE_BACKEND_URL+ "/api/login",{
                method:"POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({email,password}),
            });
            const data = await response.json();
            if (!response.ok){
                setError(data.msg);
                return;
            }
            sessionStorage.setItem("token",data.token);
            dispatch ({type : "login", payload : {token:data.token, user: data.user}});
            navigate("/private");
            
        } catch (error) {
            setError("Error de conexion con el servidor");
            
        }
    };

    return(
        <div className="container" data-bs-theme= "dark">
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div className="card border-danger">
                        <div className="card-body">
                            <h3 className="text-danger text-center mb-4">Iniciar sesion</h3>
                            {error &&  <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email"className="form-control" value={email}
                                onChange={(e)=> setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"> Contraseña</label>
                                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                    </div> 
                                    <button className="btn btn-danger w-100" onClick={handleLogin}>Entrar</button>
                                    <p className="text-center mt-3 mb-0">
                                        ¿No tienes cuenta? <Link to="/signup" className="text-danger">Registrate</Link>
                                    </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}