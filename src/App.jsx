import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Ecommerce from "./pages/ecommerce/ecommerce.jsx";
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/register.jsx'
import Consola from './pages/consola/consola.jsx'
import Chat from './pages/chat/chat.jsx'
import Error from './pages/error/error.jsx'
import Success from './pages/orderGenerated/success.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Ecommerce />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="ecommerce" element={<Ecommerce />} />
        <Route exact path="consola" element={<Consola />} />
        <Route exact path="chat" element={<Chat />} />
        <Route path="success" element={<Success/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
