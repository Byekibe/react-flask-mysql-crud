import { createBrowserRouter, Link } from "react-router-dom";
import AddPost from "../pages/addPost/index";
import Home from "../pages/home";
import UpdatePost from "../pages/updatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "add",
    element: <AddPost />,
  },
  {
    path: "update/:id",
    element: <UpdatePost />,
  },
]);

export { router };
