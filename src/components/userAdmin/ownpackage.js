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


function Ownpackage() {

    const [product, setProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productAdd, setProductAdd] = useState([]);
    const [productName, setProductName] = useState([]);
    const [haircare, setHaircare] = useState([]);
    const [nailcare, setNailcare] = useState([]);
    const uniqueId = "P" + generateId();
    const type = "Products"


    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }


    function add(name, type, price) {
        const obj = { name, type, price }
        setProductAdd([...productAdd, obj]);
        setProductName([...productName, name])
    }

    const cart = () => {
        let totalPrice = 0;
        for (let i = 0; i < productAdd.length; i++) {
            totalPrice += productAdd[i].price;
        }
        setTotalPrice(totalPrice)
    }
    const clear = () => {
        setTotalPrice(0)
        setProductAdd([])
    }

    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Receipt")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Products ')
        for (let i = 0; i < productAdd.length; i++) {
            doc.text(25, x, 'Package Name :' + " " + productAdd[i].name + " " + " " + " " + " " + " " + productAdd[i].price + " Rs/=")
            x = x + 20
        }
        x = x + 30
        doc.text(25, x, 'Total Price :' + " " + totalPrice + " " + "RS/=")
        doc.save('Receipt.pdf')

    }

    function book() {
        var code = ""
        var category = "Products"
        var size = ""
        var color = ""
        var exlist = ""
        const list = productName.join(',');
        reactLocalStorage.setObject("DBooking", [code, category, totalPrice, size, color, uniqueId, type, exlist, list]);
        window.location.href = "/Booking";
    }

    const getProducts = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/product/allproduct/");
            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getHaircare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/haircare/allhaircare/");
            setHaircare(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getNailpedicare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/nailpedicare/allnailpedicare/");
            setNailcare(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts()
        cart()
        getHaircare()
        getNailpedicare()
    }, [productAdd])


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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Create Your Own Package</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-8">
                                    <div className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h1 className="fw-bold mb-0 text-black">Items</h1>
                                        </div>
                                        <hr className="my-4" />
                                        {product.map((product, key) => (
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <h6 className="text-muted">{product.category}</h6>
                                                    <h6 className="text-black mb-0">{product.name}</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h6 className="mb-0">{product.price}Rs/=</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <button size='lg' type="button" class="btn btn-dark" color="dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => add(product.name, product.category, parseInt(product.price))} >ADD</button>
                                                </div>

                                            </div>
                                        ))}
                                        {haircare.map((haircare, key) => (
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <h6 className="text-muted">{haircare.type}</h6>
                                                    <h6 className="text-black mb-0">{haircare.name}</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h6 className="mb-0">{haircare.price}Rs/=</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <button size='lg' type="button" class="btn btn-dark" color="dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => add(haircare.name, haircare.category, parseInt(haircare.price))} >ADD</button>
                                                </div>

                                            </div>
                                        ))}
                                        {nailcare.map((nailcare, key) => (
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <h6 className="text-muted">{nailcare.type}</h6>
                                                    <h6 className="text-black mb-0">{nailcare.name}</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h6 className="mb-0">{nailcare.price}Rs/=</h6>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <button size='lg' type="button" class="btn btn-dark" color="dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => add(nailcare.name, nailcare.category, parseInt(nailcare.price))} >ADD</button>
                                                </div>

                                            </div>
                                        ))}
                                        <hr className="my-4" />

                                    </div>
                                </div>
                                <div className="col-lg-4 bg-grey">
                                    <div className="p-5">
                                        <h3 className="fw-bold mb-5 mt-2 pt-1">Your Order</h3>
                                        <hr className="my-4" />

                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="text-uppercase">Items </h5>
                                            <h5 className="text-uppercase">Price (Rs)</h5>
                                        </div>
                                        <hr className="my-4" />

                                        {productAdd.map((productAdd, key) => (
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text">{productAdd.name}</h5>
                                                <h5>{productAdd.price}</h5>
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
                                                >Place Order</button>
                                            </div>
                                        </div>
                                        <br />
                                        <div className='col'>
                                            <button type="button" className="btn btn-dark btn-block "
                                                style={{ backgroundColor: 'red' }} onClick={clear}>Clear Order</button>
                                        </div>
                                    </div>
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
export default Ownpackage
