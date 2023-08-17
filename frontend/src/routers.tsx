import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from "./pages/Edit";
import ProtectedRoute from './components/Auth'

function Router() {
    const router = createBrowserRouter([
        {
          path: "/login",
          element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/create",
            element: <Create />
        },
        {
          path: "/edit/:postId",
          element: <Edit />
        },
        {
          path: "/",
          element: <ProtectedRoute element={<Home />}/>
        },
      ]);
    return (
        <RouterProvider router={router} />
    )
}

export default Router
