import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () =>{
    const navigate = useNavigate();
    const {store} = useGlobalReducer();

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
    }, []);

    return (
        <div className="container" data-bs-theme="dark">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card border-danger">
                        <div className="card-body text-center">
                            <h3 className="text-danger mb-3">Zona personal</h3>
                            <p className="mb-0">
                                Bienvenido {store.user ?  `, ${store.user.email}`: ""}. Has accedido correctamente

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};