import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./components/Todos";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
