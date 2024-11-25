import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Gallery } from "./pages/gallery";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Gallery />,
      },
    ],
  },
]);
