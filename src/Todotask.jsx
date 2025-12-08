import { useRef } from "react";

function Todotask(props){
    const todoTask = useRef("");
    var fs = 0;
        if(props.task.length <=15)
            fs = 3;
        else if(props.task.length <= 20)
            fs = 4;
        else
            fs = 7;
    if(props.isCompleted===true){
        todoTask.current = `task-completed fsize-${fs}`;
    }
    else{
        todoTask.current = `task-uncompleted fsize-${fs}`;
    }
    function updateChange(e){
        props.handleUpdate(props);
    }
    function deleteChange(){
        props.handleDelete(props.id);
    }
    return (
        <div className="d-flex gap-5 p-3 todotask justify-content-between align-items-center rounded-pill mb-3">
            <input checked={props.isCompleted} onChange={(e)=>updateChange(e)} type="checkbox" className="taskcheckbox"/>
            <h3 className={todoTask.current}>{props.task}</h3>
            <i className="bi bi-trash trash-icon text-danger delete-icon" onClick={()=>deleteChange()}></i>
        </div>
    )
}
export default Todotask