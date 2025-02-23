import { useState } from "react";
import { createNewUser } from "../services/APIServices";




export const Singup = () => {

    const [state,setState] = useState()

    const handdleOnChange = (event) => {

        setState({...state  , [event.target.name]: event.target.value})


    }



    return (
        <div className="text-center mt-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={(e)  => {handdleOnChange(e)}} className="form-control" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => {handdleOnChange(e)}} name="password"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
            </form>
            <button type="submit" onClick={() => createNewUser(state)} className="btn btn-primary">Submit</button>
        </div>
    );
}; 