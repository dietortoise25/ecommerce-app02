import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import ProductPage from "./pages/Product";
import ProductsPage from "./pages/Products";

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
      { path: "login", element: <h1>Login</h1> },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App;
