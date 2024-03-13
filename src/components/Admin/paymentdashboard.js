
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "./adminNav";




function Paymentdashboard() {

    const [payment, setPayment] = useState([])
    const [type, setType] = useState("")

    const getPayments = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/payment/allpayment/");
            setPayment(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPaymentsType = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/payment/allpayment/" + type);
            setPayment(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    async function edit(paymentID, price, type, userName) {

        const status = 2
        const packageFC = { paymentID, price, type, userName, status }

        try {
            const response = await axios.put(global.APIUrl + "/payment/updatepayment", packageFC);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Payment Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/Paymentdashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Payment Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/Paymentdashboard";
        }


    }
    function remove(code) {
        axios.delete(global.APIUrl + "/payment/deletepayment/" + code).then(() => {
            window.location.href = "/Paymentdashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Payment Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <div class="dashboard-main-wrapper">
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '4%', paddingLeft: '2%', width: '98%' }}>
                    <br />

                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />

                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <center>
                            <h1 style={{ color: "#422057FF", textAlign: "center", textTransform: "uppercase" }} >Salon-Nee Payment Management</h1>
                        </center>

                        <div className="text-end mt-5">
                        </div>

                        <div className=" pt-1 mt-5">
                            <h6>Search Type</h6>
                            <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                setType(e.target.value);
                            }} />
                            <br />
                            <button type="button" class="btn btn-success d-letter-spacing " onClick={getPaymentsType} >Go</button>
                        </div>





                        <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Pending  Payments</u></h4>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark" >
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Type</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Products</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Customer</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Accept</h6>
                                    </th> <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Reject</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {payment.map((payment, key) => (
                                    payment.status === 1 ? (
                                        <tr className="bg-light" key={key}>
                                            <td style={{ fontSize: '17px' }}>{payment.paymentID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.price} Rs/=</td>
                                            <td style={{ fontSize: '17px' }}>{payment.type}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.items}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.date}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.userName}</td>
                                            <td>

                                                <MDBBtn size='lg' className="shadow-0" outline color="success" onClick={() => edit(payment.paymentID, payment.price, payment.type, payment.userName)}>Accept</MDBBtn>  </td>
                                            <td>
                                                <MDBBtn size='lg' className="shadow-0" outline color="danger" onClick={() => remove(payment.paymentID)}>Reject</MDBBtn>
                                            </td>
                                        </tr>
                                    ) : (
                                        <div key={key}></div>
                                    )
                                ))}
                            </MDBTableBody>
                        </MDBTable>

                        <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Accepted  Payments</u></h4>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark">
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Type</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Products</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Customer</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>

                                {payment.map((payment, key) => (
                                    payment.status === 2 ? (
                                        <tr className="bg-light" key={key}>
                                            <td style={{ fontSize: '17px' }}>{payment.paymentID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.price} Rs/=</td>
                                            <td style={{ fontSize: '17px' }}>{payment.type}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.items}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.date}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.userName}</td>
                                        </tr>
                                    ) : (
                                        <div key={key}></div>
                                    )
                                ))}



                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Paymentdashboard
