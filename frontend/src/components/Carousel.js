import React from 'react'

function Carousel() {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id='carousel'>
                <div className='carousel-caption' style={{ zIndex: 10 }}>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>

                </div>
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/100×300/?Burger" className="d-block w-100 " alt="..." style={{height:'300px',objectFit:'cover'}} />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/100×300/?Pizza" className="d-block w-100 " alt="..." style={{height:'300px',objectFit:'cover'}} />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/100×300/?Sandwich" className="d-block w-100 " alt="..." style={{height:'300px',objectFit:'cover'}} />
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

    )
}

export default Carousel




