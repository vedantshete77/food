import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:8080/createuser", {
            method: 'POST',
            body: JSON.stringify({ name, email, password, location }),
            headers: {
                'Content-Type': 'application/json'
            },

        })
        response = await response.json()
        console.log(response)
        navigate('/')
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <form className='container p-5'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name='name'  onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'  onChange={(e) => { setEmail(e.target.value) }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password'  onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name='location' onChange={(e) => { setLocation(e.target.value) }} />
                </div>
                <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
            </form>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Signup