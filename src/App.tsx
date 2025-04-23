import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import ProductPage from "./pages/Product";
import ProductsPage from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "products", element: <ProductsPage /> },
      {
        path: "cart", element: <Cart />
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <h1>404 Not Found</h1> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App;
