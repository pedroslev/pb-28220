import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Ecommerce from "./pages/ecommerce/ecommerce.jsx";
import Login from './pages/login/login.jsx'
import Consola from './pages/consola/consola.jsx'
import Error from './pages/error/error.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Ecommerce />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="ecommerce" element={<Ecommerce />} />
        <Route exact path="consola" element={<Consola />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
