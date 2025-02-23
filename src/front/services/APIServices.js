export const createNewUser = async (dispach) => {

    const response = await fetch("")

    if(!response.ok){

        return print("No se pudo crear ese usuario ")
    }
}