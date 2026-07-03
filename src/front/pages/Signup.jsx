import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup= () =>{
    const [email,setEmail]= useState("");
    const [password , setPassword] = useState ("");
    const [ error , setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async ()=> {
        if(email ===""|| password===""){
            setError("Debes rellenar todos los campos");
            return;
        }
        try {
            const response = await fetch (import.meta.env.VITE_BACKEND_URL+ "/api/signup",{
                method:"POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({email,password}),
            });
            const data = await response.json();
            if (!response.ok){
                setError(data.msg);
                return;
            }
            navigate("/login")
            
        } catch (error) {
            setError("Error de conexion con el servidor");
            
        }
    }
    return(
        <div className="container" data-bs-theme= "dark">
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div className="card border-danger">
                        <div className="card-body">
                            <h3 className="text-danger text-center mb-4">Registro</h3>
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
                                    <button className="btn btn-danger w-100" onClick={handleSignup}>Crear cuenta </button>
                                    <p className="text-center mt-3 mb-0">
                                        ¿Ya tienes cuenta? <Link to="/login" className="text-danger">Inicia sesion</Link>
                                    </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
