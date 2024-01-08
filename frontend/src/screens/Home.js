import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {
    const [foodItem, setFoodItem] = useState([])
    const [foodCat, setFoodCat] = useState([])
    const [search,setSearch] = useState("")

    const dataItem = async () => {
        let response = await fetch("http://localhost:8080/food", {
            method: "Get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setFoodItem(response)
    }
    const dataCat = async () => {
        let response = await fetch("http://localhost:8080/cat", {
            method: "Get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setFoodCat(response)
    }
    useEffect(() => {
        dataItem();
        dataCat();
    }, [])
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: 10 }}>
                        <div className="form-inline justify-content-center">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        </div>

                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/100×300/?Burger" className="d-block w-100 " alt="..." style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/100×300/?Pizza" className="d-block w-100 " alt="..." style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/100×300/?Sandwich" className="d-block w-100 " alt="..." style={{ height: '300px', objectFit: 'cover' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='m-4 container'>
                {foodCat.length > 0 ? (
                    foodCat.map((foodCat) => (
                        <div key={foodCat._id} className='row mb-3 ' style={{ marginLeft: '20px' }}>
                            <div className='fs-3 m-3'>{foodCat.CategoryName}</div>
                            <hr></hr>
                            {foodItem.length > 0 ? (
                                foodItem
                                    .filter((item) => item.CategoryName === foodCat.CategoryName&&item.name.toLowerCase().includes(search))
                                    .map((foodItem) => (
                                        <div key={foodItem._id} className='col-12 col-md-6 col-lg-3 ' style={{  borderRadius: '15px' }}>
                                            <Card foodName={foodItem.name}
                                                options={foodItem.options[0]}
                                                imgSrc={foodItem.img}
                                                price={foodItem.options[0]}
                                            ></Card>
                                        </div>
                                    ))
                            ) : (
                                ''
                            )}
                        </div>
                    ))
                ) : (
                    <p>No elements</p>
                )}
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home