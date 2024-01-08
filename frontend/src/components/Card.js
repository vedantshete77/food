import React, { useState } from 'react'

function Card(props) {

    let options = props.options;
    const filteredOptions = Object.keys(options)
        .filter(key => key !== '_id')
        .reduce((obj, key) => {
            obj[key] = options[key];
            return obj;
        }, {});

    const priceOption = Object.keys(filteredOptions);

    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState(priceOption[0]);
    const price = filteredOptions[selectedOption];
    const handleAddToCart = () => {
        
        const cartItem = {
            foodName: props.foodName,
            option: selectedOption,
            quantity: quantity,
            price:price*quantity
        }
        let uData;

        if (localStorage.getItem('CartItems')) {
            var pData = JSON.parse(localStorage.getItem('CartItems'));
            pData.push(cartItem); 
            uData = pData;
        } else {
            uData = [cartItem]; 
        }

        localStorage.setItem('CartItems', JSON.stringify(uData));
        
    }
    
    return (
        <div>
            <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px', borderRadius: '30px',boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
                <img className="" src={props.imgSrc} alt="Card" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            {
                                priceOption.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5 ml-2'>
                               ₹{props.price[selectedOption]}
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={() => handleAddToCart()}>Add to Cart </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card