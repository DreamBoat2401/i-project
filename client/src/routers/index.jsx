import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomaPage";

const base_url = "http://localhost:3000"

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage base_url={base_url} />,
    },
    {
      path: "/login",
      element: <LoginPage base_url={base_url} />,
    },
    {
      element: <BaseLayout />,
      children: [
        {
            path: "/",
            element: <HomePage base_url={base_url} />,
          },
      ]
    },
  ]);

export default router