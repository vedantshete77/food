import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('CartItems');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCartItems(parsedData);
        }
    }, []);
    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];

        updatedCart.splice(index, 1);

        setCartItems(updatedCart);
        localStorage.setItem('CartItems', JSON.stringify(updatedCart));
    };
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.price) + parseInt(item.quantity)) - item.quantity, 0).toFixed(2);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        let email = localStorage.getItem('User');
        email = email.replace(/"/g, '');
        const cartItems = JSON.parse(localStorage.getItem('CartItems'));
        let response = await fetch("http://localhost:8080/orders", {
            method: 'POST',
            body: JSON.stringify({ email, orders: cartItems }),
            headers: {
                'Content-Type': 'application/json'
            },

        })
        response = await response.json()
        console.log(response)
        localStorage.removeItem('CartItems')
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    return (
        <div >
            <div>
                <Navbar />
            </div>
            <div className='container p-4'>
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul className='p-4'>
                        {cartItems.map((item, index) => (
                            <li key={index} style={{ marginTop: '10px' }}>
                                <strong style={{ fontSize: '1.2rem', marginRight: '10px' }}>{item.foodName}</strong> -
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Option: {item.option}</span>,
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Quantity: {item.quantity}</span>
                                <span style={{ fontSize: '1rem', margin: '0 10px' }}>Price: {item.price}</span>

                                <button className='m-3 btn btn-danger d-flex ms-auto' onClick={() => handleRemoveItem(index)}>Remove</button>
                                <hr></hr>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="d-flex justify-content pr-5" style={{ fontSize: '1.5rem', paddingLeft: '10px' }}>
                    <strong>Total Price: ₹{calculateTotalPrice()} </strong>
                </div>
                <div className="d-flex justify-content ">
                    <button className="btn btn-primary m-3" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Cart;
