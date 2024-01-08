import Home from "./screens/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-blackbox.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";

function App() {
  // let email = localStorage.getItem('User')
  //       email = email.replace(/"/g, '');
  return (

    <Router>

      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />} />
        
        </Routes>
      </div>
    </Router>


  )
}

export default App;
