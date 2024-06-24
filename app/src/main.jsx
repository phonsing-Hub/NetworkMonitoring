import ReactDOM from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LayoutRoot from "./pages/Layout";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Service from "./pages/Service";
import NoPage from "./pages/NoPage";
import Login from "./auth/Login";
import Loading from "./auth/Loading";

export default function App() {
  const [auth, setAuth] = useState("Loading");

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/auth/token", null, {
        withCredentials: true,
      })
      .then((res) => {
        setAuth(res.data.message);
      })
      .catch((err) => {
        setAuth(err.response.data.message);
      });
  }, []);

  if (auth === "Loading") return <Loading />;

  if (auth === "isLogin") return <Login setAuth={setAuth} />;

  if (auth === "success")
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutRoot />}>
            <Route index element={<Home />} />
            <Route path="employee" element={<Employee />} />
            <Route path="service" element={<Service />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
