
import './Navbar.css'
import { NavLink } from 'react-router-dom'


export default function Navbar() {
  return (
    <nav className="navbar" >
      <div className="container">
        
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/"><b>Your Tasks</b></NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/tasks">Tasks</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}