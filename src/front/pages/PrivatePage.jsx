import { useEffect } from "react";
import { protectedRoute } from "../services/APIServices";
import { Link ,  useNavigate} from "react-router-dom";
import { useState } from "react";
export const PrivatePage = () => {

    const [isAuthtenticated,setIsAuthenticated] = useState(null)
    const navigate = useNavigate()

    const checkAuth = async () => {

        try {

            const authenticated = await protectedRoute()

            console.log(authenticated)

            if (!authenticated) {
                
                navigate("/")

                return 
            }
            
            setIsAuthenticated(true)

        } catch (error) {
            
        }

    }
    useEffect(() => {

          checkAuth()

      }, []);

    const  handdleLogOut = () => {

        setIsAuthenticated(null)

        sessionStorage.setItem("token", null)

        navigate("/")

    }

    return (
        <>
            {
                isAuthtenticated == null ? 
                <div>
                    Loading .....
                </div>
                :
                <div className="container">   

                    <h1>Bienvenido estas en la pagina privada </h1>

                    <button type="button"  onClick={handdleLogOut} class="btn btn-primary">Log out</button>

                 </div>
            
            }
            
            

        </>
        

    );
}; 