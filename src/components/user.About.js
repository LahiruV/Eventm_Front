import React, { } from 'react';
import {
     MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';

import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import './APIUrl';

function About() {

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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>About US</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <section className="container mt-5 pt-5 pb-5 mb-5">
                <div className="container">
                    <MDBRow className="mt-5">
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardImage style={{ width: '105%', marginTop: '15%' }} position='top' alt='...' src='https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='5'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardBody className="pt-5 mt-3 text-left">
                                    <br />
                                    <br />
                                    <br />
                                    <MDBCardTitle className="h3 text-dark text-uppercase">Introduction</MDBCardTitle>
                                    <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                        Salon-Nee is a leader in the beauty industry and has been a trusted supplier of high-quality hair care and beauty products since 2007. Our products are sourced from trusted suppliers from around the world and are carefully selected to meet the needs and expectations of our clients. We take pride in providing our clients with exceptional products that help them achieve their desired look and feel confident in their appearance</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-5 pt-5">
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='5'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardBody className="pt-5 mt-3 text-left">
                                    <MDBCardTitle className="h3 text-dark text-uppercase">KEY FEATURES</MDBCardTitle>
                                    <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                        Salon-Nee is a leader in the beauty industry and has been a trusted supplier of high-quality hair care and beauty products since 2007. Our products are sourced from trusted suppliers from around the world and are carefully selected to meet the needs and expectations of our clients. We take pride in providing our clients with exceptional products that help them achieve their desired look and feel confident in their appearance</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardImage style={{ width: '99%' }} position='top' alt='...' src='https://images.unsplash.com/photo-1535310172250-0dcb6b63324e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-5 pt-5">
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Objectives</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                    Salon-Nee is a leader in the beauty industry and has been a trusted supplier of high-quality hair care and beauty products since 2007. Our products are sourced from trusted suppliers from around the world and are carefully selected
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Vision</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                    Salon-Nee is a leader in the beauty industry and has been a trusted supplier of high-quality hair care and beauty products since 2007. Our products are sourced from trusted suppliers from around the world and are carefully selected to meet the needs and expectations of our clients. We take pride in providing our clients
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Mission</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                    Salon-Nee is a leader in the beauty industry and has been a trusted supplier of high-quality hair care and beauty products since 2007. Our products are sourced from trusted suppliers from around the world and are carefully selected to meet the needs and expectations of our clients. We take pride in providing our clients
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>
            </section>
            <Footer />
        </div>
    )
};

export default About;