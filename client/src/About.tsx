import "./Navbar.css"
import { NavLink } from 'react-router-dom'
function About(){
   return(
    <div>
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
              <NavLink to="/login">Login</NavLink>
            </li>
           </ul>
         </div>
       </div>
     </nav>
     <h1>This is the about page</h1>
    </div>
   );
}
export default About;