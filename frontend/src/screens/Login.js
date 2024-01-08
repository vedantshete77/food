import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:8080/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },

            })
            response = await response.json()
            if (response.success) {
                localStorage.setItem("LoginDetails",JSON.stringify(response))
                localStorage.setItem("User",JSON.stringify(email))
                navigate('/home')
            } else {
                alert('Login failed .Please enter Correct Credentials')
            }
        } catch (error) {
            alert("Unexpected Error occured")
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <form className='container p-5'>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => { setEmail(e.target.value) }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Login</button>
            </form>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Login