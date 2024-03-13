import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';



function Dress() {
    const [haircare, setHaircare] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [haircareAdd, setHaircareAdd] = useState([]);
    const [dress, setDress] = useState([]);
    const uniqueId = "D" + generateId();
    const type = "Dress"


    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    function book(code, category, price, size, color, picture) {
        reactLocalStorage.setObject("DBooking", [code, category, price, size, color, uniqueId, type, picture, code]);
        window.location.href = "/Booking";
    }

    const getDress = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/dress/alldress/");
            setDress(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDress()
    }, [haircareAdd])


    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Salon Service Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <div className='bg-image' >
                <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
                <div className='mask' style={{ backgroundColor: '#292929' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Select Dress</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Add Your Dress In Here </u></h4>
                    <br />
                    <hr />
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {dress.map((dress, key) => (
                            <div className="col">
                                <div className="card" style={{ width: "250px" }}>
                                    <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + dress.picture} className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title"> {dress.category}</h5>
                                        <h6 className="card-text">
                                            Price : {dress.price} Rs/=
                                        </h6>
                                        <p className="card-text">
                                            Size :{dress.size}
                                        </p>
                                        <p className="card-text" style={{ color: `${dress.color}`, fontWeight: "bold" }}>
                                            Color : {dress.color}
                                        </p>
                                        <div className='row'> {dress.status ? (
                                            <div className='col'>
                                                <button type="button" className="btn btn-dark" disabled>Available</button>
                                            </div>
                                        ) : (
                                            <div className='col'>
                                                <button type="button" className="btn btn-dark" disabled>Unavailable</button>
                                            </div>
                                        )}
                                        </div>
                                        <div className='row'> {dress.status ? (
                                            <div className='col' style={{ paddingTop: "10px" }}>
                                                <button type="button" className="btn btn-dark btn-block "
                                                    style={{ backgroundColor: '#0066ff' }} onClick={() => book(dress.code, dress.category, dress.price, dress.size, dress.color, dress.picture)}>Book</button>
                                            </div>
                                        ) : (
                                            <div className='col' style={{ paddingTop: "10px" }}>
                                                <button type="button" className="btn btn-dark btn-block "
                                                    style={{ backgroundColor: '#0066ff' }} disabled>Book</button>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </center >
            <Footer />
        </div >
    )
};

export default Dress
