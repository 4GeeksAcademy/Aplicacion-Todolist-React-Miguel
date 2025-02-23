import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Login } from "./Login.jsx";
import { Singup } from "./Singup.jsx";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<>
			{/* <Singup></Singup> */}
			<p>-------------------------------------LOGIN-----------------------</p>	
			<Login></Login>
		</>
		

	);
}; 