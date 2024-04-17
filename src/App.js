import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./context/context";
import { useCookies } from "react-cookie";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Product from "./pages/Product/Product";
import Order from "./pages/Order/Order";

function App() {
  const { login } = useContext(UserContext);
  const [cookies] = useCookies(['token']);

  const handleLogin = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("cookies", cookies.token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:5000/auth/checklogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        login(result);
      })
      .catch((error) => console.error(error));
  }, [cookies.token]);

  useEffect(() => {
    if (cookies.token) {
      handleLogin();
    }
  }, [cookies.token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
