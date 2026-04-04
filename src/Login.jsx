import axios from "axios";
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [value,setValue] = useState("Login");
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
            setValue(<div className="spinner-border spinner-border-sm"></div>);
            const userDetails = {
                "email":email,
                "password":password
            }
            try{
            const response = await axios.post("https://todo-api-1-1i1b.onrender.com/auth/login",userDetails);
            localStorage.setItem("token",response.data.token);
            handleNavigate();
            }
            catch{
                setValue("Login");
                toast.error("Credentials are not valid");
            }
        }
    return(
        <div className="d-flex justify-content-center align-items-center vh-60 formui">
            <ToastContainer />
            <form className="forml" onSubmit={handleLogin}>
                <h3 className="mb-5 heading">Login</h3>
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
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-info rounded-pill my-3 px-5 py-1">{value}</button>
                </div>
                <p>If you don't have an account?<Link to="/Register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login