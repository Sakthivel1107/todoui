import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Todo from './Todo.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'Login',
    element:<Login/>
  },
  {
    path:'Register',
    element:<Register/>
  },
  {
    path:'Todos',
    element:<Todo/>
  }
],
  {
    basename: '/todoui',
  }
);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
