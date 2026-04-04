import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [value,setValue] = useState("Register");
    function emailInput(e){
        setEmail(e.target.value);
    }
    function passwordInput(e){
        const value = e.target.value;
        setPassword(value);
        const isLongEnough = value.length>=8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasdigit = /\d/.test(value);
        const specialMatch = value.match(/[@$!%*?&]/g);
        if(!isLongEnough)
            setError("At least 8 characters required");
        else if(!hasUpper)
            setError("At least 1 uppercase letter required");
        else if(!hasLower)
            setError("At least 1 lowercase letter required");
        else if(!hasdigit)
            setError("At least 1 digit required");
        else if(!specialMatch)
            setError("At least 1 special character required");    
        else
            setError("");    
    }
    function nameInput(e){
        setName(e.target.value);        
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/login");
    }
    async function handleSubmit(e) {
        setValue(<div className="spinner-border spinner-border-sm"></div>);
        e.preventDefault();
        if(error){
            alert(error + " for password");
            return;
        }
        try{
        const userDetails = {
            "name":name,
            "email":email,
            "password":password
        }
        const response = await axios.post("https://todo-api-1-1i1b.onrender.com/auth/register",userDetails);
        alert("You have successfully registered. please login");
        handleNavigate();
        }
        catch{
            setValue("Register");
            alert("Email already exists,please login");
        }
    }
    return(
        <div className="credPage formui">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="mb-5 heading">Register</h3>
                <div className="bg-primary mb-3 d-flex align-items-center input-wrapper">
                    <i className="icon bi bi-person-fill fs-5 mx-2"></i>
                    <input 
                        value={name} 
                        onChange={nameInput} 
                        className="form-control" 
                        type="text" 
                        placeholder="Enter your name" 
                        required
                    />
                </div>
                <div className="bg-primary mb-3 d-flex align-items-center input-wrapper">
                    <i className="bi bi-envelope-fill fs-5 mx-2"></i>
                    <input 
                        value={email}
                        onChange={emailInput}
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>
               <div className="bg-primary mb-3 position-relative d-flex align-items-center input-wrapper">
                    <i className="bi bi-key-fill fs-5 mx-2"></i>

                    <input 
                        value={password}
                        onChange={passwordInput}
                        className="form-control pe-5"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                    />

                    <i 
                        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            cursor: "pointer"
                        }}
                    ></i>
                </div>


                {error && <p style={{color:"red"}}>{error}</p>}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-info rounded-pill my-3 px-5 py-1" type="submit">{value}</button>
                </div>
                <p>If you already have an account?<Link to='/Login'>Login</Link></p>
            </form>
        </div>
    )
}
export default Register