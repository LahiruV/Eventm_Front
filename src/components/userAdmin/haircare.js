import React, { useState, useEffect } from 'react';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBTableBody, MDBTable, MDBTableHead
} from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import Footer from '../main_parts/footer.js';
import '../APIUrl';


function Haircare() {
    const [haircare, setHaircare] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [haircareAdd, setHaircareAdd] = useState([]);
    const [productName, setProductName] = useState([])
    const uniqueId = "H" + generateId();
    const type = "HairCare"


    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }


    function add(name, type, date, price) {
        const obj = { name, type, date, price }
        setHaircareAdd([...haircareAdd, obj]);
        setProductName([...productName, name])
    }


    const getHaircare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/haircare/allhaircare/");
            console.log(res.data);
            setHaircare(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cart = () => {
        let totalPrice = 0;
        for (let i = 0; i < haircareAdd.length; i++) {
            totalPrice += haircareAdd[i].price;
        }
        setTotalPrice(totalPrice)
    }
    const clear = () => {
        setTotalPrice(0)
        setHaircareAdd([])
    }

    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Receipt")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Hair Care & Facial Receipt ')
        for (let i = 0; i < haircareAdd.length; i++) {
            doc.text(25, x, 'Package Name :' + " " + haircareAdd[i].name + " " + " " + " " + " " + " " + haircareAdd[i].price + "Rs/=")
            x = x + 20
        }
        x = x + 30
        doc.text(25, x, 'Total Price :' + " " + totalPrice + " " + "RS/=")
        doc.save('Receipt.pdf')

    }

    function book() {
        var code = ""
        var category = "Hair Care"
        var size = ""
        var color = ""
        var exlist = ""
        const list = productName.join(',');
        reactLocalStorage.setObject("DBooking", [code, category, totalPrice, size, color, uniqueId, type, exlist, list]);
        window.location.href = "/Booking";
    }

    useEffect(() => {
        getHaircare()
        cart()
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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Hair Care & Facial</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Add Your Packages </u></h4>
                    <div className="row g-0">
                        <div className="col-lg-8">
                            <MDBTable className="mt-2" hover>
                                <MDBTableHead className="bg-success">
                                    <tr>
                                        <th scope='col' ><h6 className="text-black" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Name</h6></th>
                                        <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Type</h6></th>
                                        <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Updated Date</h6></th>
                                        <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                        <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Action</h6></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {haircare.map((haircare, key) => (
                                        <tr className="bg-light">
                                            <td style={{ fontSize: '17px' }}>{haircare.name}</td>
                                            <td style={{ fontSize: '17px' }}>{haircare.type}</td>
                                            <td style={{ fontSize: '17px' }}>{haircare.date}</td>
                                            <td style={{ fontSize: '17px' }}>{haircare.price} Rs/=</td>
                                            <td>
                                                <button size='lg' type="button" class="btn btn-dark" color="dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => add(haircare.name, haircare.type, haircare.date, haircare.price)}>ADD</button>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </div>

                        <div className="col-lg-4 bg-grey">
                            <div className="p-5">
                                <h3 className="fw-bold mb-5 mt-2 pt-1">Your Order</h3>
                                <hr className="my-4" />

                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="text-uppercase">Package </h5>
                                    <h5 className="text-uppercase">Price (Rs)</h5>
                                </div>
                                <hr className="my-4" />

                                {haircareAdd.map((haircareAdd, key) => (
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="text">{haircareAdd.name}</h5>
                                        <h5>{haircareAdd.price}</h5>
                                    </div>
                                ))}


                                <hr className="my-4" />

                                <div className="d-flex justify-content-between mb-5">
                                    <h5 className="text">Total price</h5>
                                    <h5>{totalPrice}</h5>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button type="submit" className="btn btn-success btn-block" onClick={print}
                                        >Receipt</button>
                                    </div>
                                    <div className='col'>
                                        <button type="submit" className="btn btn-dark btn-block " onClick={book}
                                        >Book</button>
                                    </div>
                                </div>
                                <br />
                                <div className='col'>
                                    <button type="button" className="btn btn-dark btn-block "
                                        style={{ backgroundColor: 'red' }} onClick={clear}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </center >
            <Footer />
        </div >
    )
};

export default Haircare;