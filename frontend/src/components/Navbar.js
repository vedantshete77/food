import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('LoginDetails');
  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Food</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              {auth ? <div className='fs-5 d-flex '>
                
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                <Link className="nav-link active" aria-current="page" to="/orders">Orders</Link>
                <Link className="nav-link active" aria-current="page" to="/cart">MyCart</Link>
                <Link className="nav-link active" onClick={logout} to='/login'>Logout</Link>


              </div>
                : <div className='d-flex fs-5  '>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">SignUp</Link>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar