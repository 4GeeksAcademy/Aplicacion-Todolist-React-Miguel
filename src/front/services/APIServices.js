import useGlobalReducer from "../hooks/useGlobalReducer"




const urlApi = import.meta.env.VITE_BACKEND_URL






export const createNewUser = async (infoUser) => {


    try {
        
        const response = await fetch(urlApi + "singup" , {
            method: "POST",
            body: JSON.stringify({
                "email":infoUser.email,
                "password":infoUser.password}),
            headers: {"Content-Type": "application/json"}
        }) 

        if(!response.ok){

            return print("No se pudo crear ese usuario ")
        }


    } catch (error) {

        console.log(response.status , "El usuario ya existe ")
        
    }   
    
}

export const logIn = async (infoUser) => {


    try {
        
        const response = await fetch(urlApi + "login",{

            method: "POST",
            body: JSON.stringify({ 
                "email":infoUser.email,
                "password":infoUser.password}),
            headers: {"Content-Type": "application/json"}

            })

        const data = await response.json() 
        
        sessionStorage.setItem("token", data.token)

        if(!response.ok){

            return print("No se pudo crear ese usuario ")
        }

    } catch (error) {
        
        console.log(error, "El password o el Email no coinciden")
    }
    
    

}

export const protectedRoute = async () => {


    try {

        const token = sessionStorage.getItem('token')
        
        const response = await fetch(urlApi + "protected",{

            method: "GET",
            headers:{"Content-Type": "application/json",
                     'Authorization': `Bearer ${token}`
            }

        })

        const data = await response.json()

        console .log(data)

    } catch (error) {
        
        console.log(error, "Error al entrar a private")

    }



}




