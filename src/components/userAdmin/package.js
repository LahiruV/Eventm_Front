import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';



function Package() {

    const [packaage, setPaackage] = useState([]);;
    const uniqueId = "P" + generateId();
    const type = "Package"


    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    function book(code, price) {

        var category = "Hair Care"
        var size = ""
        var color = ""
        var exlist = ""
        reactLocalStorage.setObject("DBooking", [code, category, price, size, color, uniqueId, type, exlist, code]);
        window.location.href = "/Booking";
    }

    function ownBook() {
        window.location.href = "/Ownpackage";
    }


    const getPackage = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/package/allpackage/");
            setPaackage(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPackage()
    }, [])


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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Select Package</p>

                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Add Your Package </u></h4>
                    <div >
                        <button type="button" className="btn btn-dark btn-block " onClick={ownBook}
                            style={{ backgroundColor: 'red', width: "265px", height: "40px", fontSize: "15px" }} >Create Own Package In Here</button>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {packaage.map((packaage, key) => (
                            <div className="col">
                                <div className="card" style={{ width: "250px" }}>
                                    <div className="card-body">
                                        <h3 className="card-title"> {packaage.name}</h3>
                                        <h5 className="card-text">
                                            Price : {packaage.price} Rs/=
                                        </h5>
                                        <p className="card-text" style={{ fontWeight: "bold" }}>
                                            Items :{packaage.items}
                                        </p>
                                        <p className="card-text" >
                                            Code :{packaage.code}
                                        </p>

                                        <div className='row'>
                                            <div className='col' style={{ paddingTop: "10px" }}>
                                                <button type="button" className="btn btn-dark btn-block "
                                                    style={{ backgroundColor: '#0066ff' }} onClick={() => book(packaage.code, packaage.price)}>Buy</button>

                                            </div>
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

export default Package
