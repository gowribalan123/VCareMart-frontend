import React from "react";
import { Link ,useNavigate} from "react-router-dom";
//import { DarkMode } from "../shared/DarkMode";

export const Header = () => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center p-14 h-20 shadow-2xl ">
            <div>
            <Link to="/" className="flex items-center">
                
                <div className="text-3xl font-bold text-blue-600">VCare</div>
            </Link>
            </div>
            <div className="flex justify-center items-center gap-8">
                <nav>
                    <ul className="flex justify-center items-center gap-5">
                        <Link to={"/"}>
                            {" "}
                            <li>Home</li>{" "}
                        </Link>
                        <Link to={"/about"}>
                            {" "}
                            <li>About</li>{" "}
                        </Link>
                        <Link to={"/category"}>
                            {" "}
                            <li>Categories</li>{" "}
                        </Link>
                    
                        <Link to={"/contact"}>
                            {" "}
                            <li>Contact</li>{" "}
                        </Link>
                    </ul>
                </nav>
                <div className="flex justify-center gap-3">
              {/* <DarkMode /> */} 
                    <button className="btn btn-primary" onClick={()=>navigate('/signup')} >Shop with Us</button>
                </div>
            </div>
        </div>
    );
};