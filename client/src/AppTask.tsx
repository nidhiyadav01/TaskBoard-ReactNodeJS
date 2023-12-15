import { useEffect, useState } from 'react'
import './App.css'
import {  Link } from "react-router-dom";
import {deleteTask} from "./api/deleteTask";
import {getTasks,TTask} from "./api/getTasks";
import {createTasks} from "./api/createTasks";
import { NavLink } from 'react-router-dom'

function AppTask() {
  const[title,setTitle]=useState("");
  const[tasks,setTasks]=useState<TTask[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize=3;
  
  

 

  async function handelDeleteTask(taskId:string) {
   await deleteTask(taskId);
    setTasks(tasks.filter((task)=>task._id!==taskId));
  }

  useEffect(() => {
    async function fetchTasks() {
      
      try {
        window.addEventListener('beforeunload', handleBeforeUnload);
        const response = await getTasks(currentPage,pageSize); // Pass the current page to your API function
        setTasks(response.tasks);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    //localStorage.removeItem('token');
    fetchTasks();
  }, [currentPage]);
  const handleBeforeUnload = () => {
    localStorage.removeItem('token');
  };


  return <div className='app'>
     <nav className="navbar" >
      <div className="container">
        
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/tasks"><b>Your Tasks</b></NavLink>
             </li>
            
             <li>
               <NavLink to="/about">About</NavLink>
             </li>
             <li>
              <NavLink to="/createtask">Create Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/login">Logout</NavLink>
            </li>
           </ul>
         </div>
       </div>
     </nav>
    <ul className='tasks'>
      {tasks.map((task)=>(
        <li key={task._id}>
          <button onClick={()=>handelDeleteTask(task._id)}>X</button>
          <Link to={`tasks/${task._id}`}>{task.title}</Link>
        </li>
      ))}
    </ul>
    <br></br>

    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
    <br></br>
    

  </div>
  
}

export default AppTask
