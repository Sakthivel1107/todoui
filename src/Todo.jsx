import { useEffect, useRef, useState } from "react";
import Todotask from "./Todotask";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Todo(){
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser.userid;
    const token = storedUser.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const [todos,setTodos] = useState([]);
    const [Search,setSearch] = useState("d-none");
    const [screen,setScreen] = useState("d-none");
    const [addtab,setAddTab] = useState("d-none");
    const [addicon,setAddIcon] = useState("rounded-circle fs-2 add-icon");
    const [addicontext,setAddIconText] = useState("+");
    const [searchIcon,setSearchIcon] = useState("iconnav bi bi-search fs-2 ");
    const [todoDiv,setTodoDiv] = useState("d-flex flex-column align-items-center mt-2");
    const [searchDiv,setSearchDiv] = useState("d-none");
    const [taskValue,setTaskValue] = useState("");
    const [filteredTodos,setFilteredTodos] = useState([]);
    const [keyword,setKeyword] = useState("");
    const inputValue = useRef("");
    const i = useRef(0);
    const j = useRef(0);
    const [profile,setProfile] = useState(0);
    const [updateTab,setUpdateTab] = useState(0);
    const [user,setUser] = useState();
    const [name,setName] = useState();
    const [updateInput,setUpdateInput] = useState("");
    const completed = useRef(0);
    const totalCount = useRef(0);
    const [imageUrl,setImageUrl] = useState("src/assets/defaultImage.png");
    useEffect(()=>{
        async function fetchData() {
            try{
                const response = await axios.get(`https://todo-api-gw67.onrender.com/api/v1/todo/${userId}`);
                setTodos(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        async function fetchUserData(){
            try{
                const response = await axios.get(`https://todo-api-gw67.onrender.com/auth/${userId}`);
                setUser(response.data);
                setName(response.data.name);
                setImageUrl(response.data.url);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
        fetchUserData();
    },[]);
    function gotoHome(){
        navigate("/");
    }
    function todoInput(e){
        inputValue.current = e.target.value;
        setTaskValue(inputValue.current);
    }
    async function insertTodo(){
        setTaskValue("");
        const todoObject = {
            "userId":userId,
            "title":inputValue.current,
            "completed":false
        }
        const response = await axios.post("https://todo-api-gw67.onrender.com/todo",todoObject);
        setTodos(prev => [...prev,response.data]);
    }
    function handleUpdate (unUpdatedTodo){
        const updatedTodo = {
            "id":unUpdatedTodo.id,
            "userId":userId,
            "title":unUpdatedTodo.task,
            "completed":unUpdatedTodo.isCompleted===true?false:true
        }
        async function update() {
           const response = await axios.put("https://todo-api-gw67.onrender.com/api/v1/todo",updatedTodo);
           setTodos(prev => prev.map(todo =>(todo.id === updatedTodo.id?response.data:todo)));
           setFilteredTodos(prev => prev.map(todo => (todo.id === updatedTodo.id?response.data:todo)));
           
        }
        update();
    }
    function handleDelete(id){
        async function deleteTodo() {
            axios.delete(`https://todo-api-gw67.onrender.com/api/v1/todo/${id}`);
            setTodos(prev => prev.filter(todo => todo.id !== id));
            setFilteredTodos(prev => prev.filter(todo => todo.id !== id));
        }
        deleteTodo();
    }
    function search(){
        i.current = !i.current;
        if(i.current==1){
        setSearch("d-block p-3 search-bar rounded-pill");
        setSearchIcon("bi bi-x fs-2 text-danger");
        setTodoDiv("d-none");
        setSearchDiv("d-flex flex-column align-items-center mt-2");
        setKeyword(""); 
        }
        else{
            setSearch("d-none");
            setSearchIcon("iconnav bi bi-search fs-2");
            setSearchDiv("d-none");
            setTodoDiv("d-flex flex-column align-items-center mt-2");
            setFilteredTodos([]);
        }
    }
    function handleSearch(e){
        let key = e.target.value;
        setKeyword(key);
        key = key.toLowerCase();
        if(key === ""){
            setFilteredTodos(todos);
        }
        else{
            setFilteredTodos(
                todos.filter(todo => todo.title.toLowerCase().includes(key))
            );
        }

    }
    function add(){
        j.current = !j.current;
        i.current = 1;
        search();
        function scrollToTop() {
            window.scrollTo({top:0, behavior:"smooth"});
            setTimeout(() => {
                document.body.style.overflow = "hidden";
            }, 500);
        }
        if(j.current==1){
            setScreen("screen");
            setAddTab("addTab");
            setAddIconText("x");
            setAddIcon(" rounded-circle fs-3 add-icon-after");
            scrollToTop();
        }
        else{
            setScreen("d-none");
            setAddTab("d-none");
            setAddIconText("+");
            setAddIcon("rounded-circle fs-2 add-icon");
            document.body.style.overflow = "auto";

        }
    }

    function setUpdateInputValue(e){
        setUpdateInput(e.target.value);
    }
    function updateName(){
        let nameValue = updateInput;
        setUpdateInput("");
        setName(nameValue);
        setUpdateTab(!updateTab);
        async function update() {
            let updatedUser = {
                "id":userId,
                "email":user.email,
                "name":nameValue,
                "password":user.password
            }
            setUser(updatedUser);
            const response = await axios.put(`https://todo-api-gw67.onrender.com/auth`,updatedUser);
        }
        update();
        setUpdateInput(0);
    }
    function profileDiv(){
        i.current = 1;
        search();
        setProfile(!profile)
    }
    function completedCount(){
        let c=0,t;
        
        t = todos.length;
        for(let i = 0;i<t;i++){
                if(todos[i].completed===true){
                    c++;
                }
        }
        if(t===0){
            completed.current = 0;
        }
        else{
            completed.current = c;
        }
        totalCount.current = t;
    }
    
    const handleImageUpdate = () => {
        document.getElementById("fileInput").click();
    }
    const handleFileChange = async (e)=> {
        const file = e.target.files[0];
        if(!file)
            return;
        const extension = file.name.split('.').pop();
        const customImageName = `img${userId}.${extension}`;
        const formData = new FormData();
        formData.append("image",file,customImageName);
        formData.append("name",user.name);
        formData.append("id",userId);
        formData.append("email",user.email);
        formData.append("password",user.password);
        formData.append("url",user.url);
        async function update() {
            const response = await axios.put(`https://todo-api-gw67.onrender.com/auth`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                },
            });
            const imgUrlFromServer = await response.data.url;
            setImageUrl(imgUrlFromServer);
            let updatedUser = {
                "id":userId,
                "email":user.email,
                "name":user.name,
                "password":user.password,
                "url":imgUrlFromServer
            }
            setUser(updatedUser);
        }
        update();
    }
    
    return(
        <div className="main-div">
            <div className="sub-div">
            <nav className="d-flex nav-bar">
                <h1 className="pt-1 todo my-3">To-Do</h1>
                <input type="text" placeholder="Search task..." className={Search}  value={keyword} onChange={(e)=>handleSearch(e)}/>
                <div className="nav-icons mt-4 me-3">
                    <i onClick={()=>search()} className={searchIcon}></i>
                    <i onClick={()=>profileDiv()} className="iconnav bi bi-person fs-2 "></i>
                </div>
            </nav>
            <h1 className="display-6 fw-bold pt-3">Welcome {name}</h1>
                <div className={addtab}>
                <input type="text" onChange={(e)=>todoInput(e)} placeholder="Enter your task(maximum 15 characters)" value={taskValue}
                className="p-3 taskInput rounded-pill"/>
                <button className="button px-5 py-3 rounded-pill" onClick={() => insertTodo()}>Add</button>
            </div>
            {todos.length===0 ?<h3>No todos yet</h3>:
            <div className={todoDiv}>
                {
                    todos.length===0?completedCount():todos.map(function (element) {
                    completedCount();
                    return (<Todotask key={element.id} id={element.id} task={element.title} isCompleted={element.completed} handleUpdate={handleUpdate} handleDelete={handleDelete}/>);
                })
                }
            </div>}
            <div className={searchDiv}>{
                filteredTodos.map(element => <Todotask key={element.id} id={element.id} task={element.title} isCompleted={element.completed} handleUpdate={handleUpdate} handleDelete={handleDelete}/>)
            }</div>
            <button className={addicon} onClick={()=>add()}>{addicontext}</button>
        </div>
        <div className={screen}></div>
        <div style={{
                display: "flex",
                opacity: profile?"1":"0",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                height: "100%",
                width: "270px",
                top: "0%",
                right: "0%",
                zIndex: profile?"6":"0",
                overflow: "hidden",
                backgroundColor: "black",
                transition: "all 0.2s ease",
                }
        }>
            <i onClick={()=>{setProfile(!profile);setUpdateTab(0);}} className="bi bi-arrow-right arrow-icon"></i>
            {/* { <i className="bi bi-person-fill profile-main-icon"></i> } */}
            <img onClick={handleImageUpdate} src={imageUrl} alt="not found" className="img"/>
            <input type="file" id="fileInput" accept="image/*" style={{display:"none"}} onChange={handleFileChange} />
            <h2 style={{color: "white",marginTop:"40px",fontWeight: "bold",display: updateTab?"none":"block"}}>{name} <i onClick={()=>setUpdateTab(!updateTab)} className="bi bi-pen fs-5 text-primary"></i></h2>
            <div style={{display:updateTab?"flex":"none",
                marginTop:"40px"
            }}>
                <input type="text" value={updateInput} onChange={(e) => setUpdateInputValue(e)} style={{border:"none",outline:"none"}}/>
                <i onClick={()=>updateName()} className="bi bi-check fs-3 bg-light checkin"></i>
            </div>
            <h4 className="completed mt-2">Completed tasks: <span className="completed-count">{completed.current}</span></h4>
            <h4 className="unCompleted">Uncompleted tasks: <span className="unCompleted-count">{totalCount.current-completed.current}</span></h4>
            <button className="btn btn-primary rounded-pill py-2 px-5 mt-4" onClick={()=>gotoHome()}>logout</button>
        </div>
        </div>

    )
}

export default Todo