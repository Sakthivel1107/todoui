import { useNavigate } from "react-router-dom"

function Home(){

    const navigate = useNavigate();
    const goToLogin = () => navigate('/Login');
    const goToRegister = () => navigate('/Register');

    return(
        <div className="homePage">
        <div className="d-flex hhdiv justify-content-center p-3 bg-dark">
            <h1 className="homeheader">To-Do</h1>
        </div>
        <div className="d-flex home justify-content-center align-items-center flex-column gap-3">
            <h2>Begin Today</h2>
            <p className="text-primary">If you already have an account please</p>
            <button className="py-3 px-5 rounded-pill homebutton fs-4" onClick={goToLogin}>Login</button>
            <h3>(OR)</h3>
            <button className="py-3 px-5 rounded-pill homebutton fs-4" onClick={goToRegister}>Register</button>
        </div>
        </div>
    )
}
export default Home