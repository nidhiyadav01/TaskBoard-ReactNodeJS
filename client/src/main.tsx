import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppTask from './AppTask.tsx'
import About from './About.tsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider
  
} from "react-router-dom";
import Login from './Login.tsx'
import CreateTask from './CreateTask.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/tasks",
    element: <AppTask/>,
  },
  {
    path:"/about",
    element: <About/>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/createtask",
    element: <CreateTask/>,
  },
  
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />
  </React.StrictMode>,
)
