import axios from "axios";
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    function emailInput(e){
        setEmail(e.target.value);
    }
    function passwordInput(e){
        setPassword(e.target.value);
    }
        const navigate = useNavigate();
        const handleNavigate = () => {
            navigate("/Todos");
        }
        async function handleLogin(e) {
            e.preventDefault();
            const userDetails = {
                "email":email,
                "password":password
            }
            try{
            const response = await axios.post("http://localhost:8080/auth/login",userDetails);
            console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data));
            handleNavigate();
            }
            catch{
                alert("Credentials are not valid");
            }
        }
    return(
        <div className="d-flex justify-content-center align-item-center vh-60 formui">
            <form className="forml">
                <h3 className="mb-5 heading">Login</h3>
                <div className="mb-3">
                    <i className="icon bi bi-envelope-fill fs-4"></i><input value={email} onChange={emailInput} type="email" className="input" placeholder="Enter your name" required />
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
                <div className="d-flex justify-content-center">
                    <button className="btn btn-info rounded-pill my-3 px-5 py-1" onClick={handleLogin}>Login</button>
                </div>
                <p>If you don't have an account?<Link to="/Register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login