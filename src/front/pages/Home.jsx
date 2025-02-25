import { Link } from "react-router-dom";


export const Home = () => {

  



	return (
		<>
			<div className="container">


				<Link to="/singup">
						<button type="button" class="btn btn-primary">Sing up</button>
				</Link>

				<Link to="/login">
						<button type="button" class="btn btn-primary">Login</button>
				</Link>


			</div>

		</>
		

	);
}; 