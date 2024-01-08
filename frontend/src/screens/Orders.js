import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Orders() {
    const [data, setData] = useState("")
    const handle = async () => {
        let email = localStorage.getItem('User')
        email = email.replace(/"/g, '');
        let url = 'http://localhost:8080/orders/' + email

        let response = await fetch(url, {
            method: "Get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setData(response)
    }
    useEffect(() => {
        handle();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div >
            <div className='container p-4'>
                <h1>Order History</h1>
                {data ? (
                    <ul className='p-4'>
                        {data.orders.map((item, index) => (
                            <li key={index} style={{ marginTop: '10px' }}>
                                <strong style={{ fontSize: '1.2rem', marginRight: '10px' }}>{item.foodName}</strong> -
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Option: {item.option}</span>,
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Quantity: {item.quantity}</span>
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Price: {item.price}</span>
                                <hr></hr>
                            </li>
                        ))}
                    </ul>
                ): (
                    <p>No Previous Records</p>
                )

                }
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Orders