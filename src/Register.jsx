import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const [showPassword,setShowPassword] = useState(false);
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
        const response = await axios.post("http://localhost:8080/auth/register",userDetails);
        alert("You have successfully registered. please login");
        handleNavigate();
        }
        catch{
            alert("Email already exists,please login");
        }
    }
    return(
        <div className="credPage formui">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="mb-5 heading">Register</h3>
                <div className="mb-3">
                    <i className="icon bi bi-person-fill fs-4"></i><input value={name} onChange={nameInput} className="input" type="text" placeholder="Enter your name" required/>
                </div>
                <div className="mb-3">
                    <i className="icon bi bi-envelope-fill fs-4"></i><input value={email} onChange={emailInput} type="email" className="input" placeholder="Enter your name" required/>
                </div>
               
               
                <div className="mb-3 regPassword">
                    <i className="iconPass bi bi-key-fill fs-4"></i>
                    <input value={password} onChange={passwordInput} className="inputPass pe-5" 
                    type={showPassword?"text":"password"} placeholder="Enter your password" required/>
                <i className="bi-eye eyeIcon" style={{
                    color:showPassword?"blue":"black",
                    fontSize:"20px",
                    transition:"0.2s ease-in-out",
                    position: "absolute"
                    }} onClick={() => setShowPassword(!showPassword)}></i>
                </div>


                {error && <p style={{color:"red"}}>{error}</p>}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-info rounded-pill my-3 px-5 py-1" >Submit</button>
                </div>
                <p>If you already have an account?<Link to='/Login'>Login</Link></p>
            </form>
        </div>
    )
}
export default Register