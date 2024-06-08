import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import SendMoney from './pages/SendMoney.jsx';
import Dashboard from "./pages/Dashboard";

const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/send",
        element: <SendMoney />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRoutes} />
)
