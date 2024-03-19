
import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "./adminNav";

function Admin() {

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>

                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />

                    <MDBRow style={{ marginTop: '6%' }}>
                        <MDBCol sm='4'>
                            <a href="ReqEventDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="users text-muted" /> <br /> <span>Req Event Management</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <a href="FinanceDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="users text-muted" /> <br /> <span>Finance Management</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                         <MDBCol sm='4'>
                            <a href="Paymentdashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="users text-muted" /> <br /> <span>Payment Management</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol> 
                         <MDBCol sm='4'>
                            <a href="Feedbackdashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="users text-muted" /> <br /> <span>Feedback Management</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>                       
                        <MDBCol sm='4'>
                            <a href="UserDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h1 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="users text-muted" /> <br />User/Staff Management
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                    </MDBRow>

                </div>
            </div>
        </div>
    )
};


export default Admin;