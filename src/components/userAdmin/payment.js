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

import Footer from '../main_parts/footer.js';
import '../APIUrl.js';


function Payment() {

    const userName = sessionStorage.getItem('user_name');
    const storedBudget = JSON.parse(localStorage.getItem('budget'));

    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [exp, setExp] = useState("")
    const [cvv, setCvv] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState(storedBudget.mail)
    const [date, setDate] = useState("")
    const paymentID = Math.floor(Math.random() * 100000);
    const [submit, setSubmit] = useState(true);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = 'Paid'
        const budID = storedBudget.bid;
        const cost = storedBudget.fullBudget;
        const email = storedBudget.mail;
        const payment = { paymentID, budID, cost, email, status, date };
        const budgetChange = storedBudget;
        budgetChange.status = 'Paid';
        try {
            const response = await axios.post(global.APIUrl + "/payment/addpayment", payment).then(() => {
                axios.put(global.APIUrl + "/budget/updatebudget/", budgetChange)
            });
            Swal.fire({
                title: "Success!",
                text: "Payment Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/EventBudget";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Payment Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/EventBudget";
        }
    };
    const back = () => {
        window.location.href = "/EventBudget";
    }
    const valid = () => {
        if ((name !== "") && (phoneNo !== "") && (cardNumber !== "") && (exp !== "") && (cvv !== "") && (date !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    useEffect(() => {
        valid()
    }, [name, email, phoneNo, cardNumber, exp, cvv, date])
    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />

            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h3 style={{ marginTop: '40px' }}>Make Your Payemnt</h3>
                    <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="container py-5">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12 col-lg-10 col-xl-8">
                                        <div className="card">
                                            <div className="card-body p-md-5">
                                                <div>
                                                    <h4>Order Summary</h4>
                                                    <br />
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <h5 className="text">Payment ID : </h5>
                                                        <h5 className="text">{paymentID}</h5>
                                                    </div>
                                                    <hr />
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <h5 className="text">Budget ID : </h5>
                                                        <h5 className="text">{storedBudget.bid}</h5>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <h5 className="text">Email : </h5>
                                                        <h5 className="text">{storedBudget.mail}</h5>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <h5 className="text">Price  : </h5>
                                                        <h5 className="text"> {storedBudget.fullBudget} Rs/= </h5>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div>
                                                    <h4>Payment Details</h4>
                                                    <br />
                                                    <div className="card-body p-4">

                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div className="form">
                                                                <label className="form-label" for="typeText">Card Number</label>
                                                                <NumberFormat format="#### #### #### ####" class="form-control" placeholder="################" style={{ fontSize: "18px" }} onChange={(e) => {
                                                                    setCardNumber(e.target.value);
                                                                }} />

                                                            </div>
                                                            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa" width="64px" />
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <div className="form">
                                                                <label className="form-label" for="typeName">Cardholder's Name</label>
                                                                <input type="text" id="typeName2" className="form-control form-control-lg" size="17"
                                                                    placeholder="Cardholder's Name" onChange={(e) => {
                                                                        setName(e.target.value);
                                                                    }} required />

                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center pb-2">
                                                            <div className="form">
                                                                <label className="form-label" for="typeExp">Expiration</label>
                                                                <input type="text" id="typeName3" className="form-control form-control-lg" placeholder="MM/YYYY"
                                                                    onChange={(e) => {
                                                                        setExp(e.target.value);
                                                                    }} required />

                                                            </div>
                                                            <div className="form">
                                                                <label className="form-label" for="typeText2">Cvv</label>
                                                                <NumberFormat format="###" class="form-control" placeholder="###" style={{ fontSize: "18px" }} onChange={(e) => {
                                                                    setCvv(e.target.value);
                                                                }} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <hr />
                                                <div>
                                                    <div>
                                                        <div className="d-flex justify-content-between mb-4">
                                                            <h4>Blling Address</h4>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="form mb-4">
                                                                <div className='row'>
                                                                    <div className='col'>
                                                                        <label className="form-label-1" for="form7Example3">Phone Number</label>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <NumberFormat format="0## ### ####" class="form-control" placeholder="0## ### ## ##" style={{ fontSize: "18px" }} onChange={(e) => {
                                                                            setPhoneNo(e.target.value);
                                                                        }} />
                                                                    </div>
                                                                </div>
                                                                <br />
                                                                <div className="form mb-4">
                                                                    <div className='row'>
                                                                        <div className='col'>
                                                                            <label className="form-label-2" for="form7Example3">Email Address</label>
                                                                        </div>
                                                                        <div className='col'>
                                                                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => {
                                                                                setEmail(e.target.value);
                                                                            }} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form mb-4">
                                                                    <div className='row'>
                                                                        <div className='col'>
                                                                            <label className="form-label-2" for="form7Example3">
                                                                                Date</label>
                                                                        </div>
                                                                        <div className='col'>
                                                                            <input type="date" id="date" className="form-control" value={date} onChange={(e) => {
                                                                                setDate(e.target.value);
                                                                            }} required />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between mb-4">
                                                    <button type="button" id='cel' className="btn btn-dark" onClick={back}>Cancel</button>
                                                    <button type="submit" id='pay' className="btn btn-success" disabled={submit}>Make Payment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </center >
            <Footer />
        </div >
    )
};
export default Payment
