
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Navbar from "./adminNav";




function Feedbackdashboard() {

    const [feedback, setFeedback] = useState([])

    const getFeedback = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/feedback/allfeedback/");
            setFeedback(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFeedback()
    }, [])

    return (
        <div class="dashboard-main-wrapper">
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '4%', paddingLeft: '2%', width: '98%' }}>
                    <br />

                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> FeedBack Management Dashboard</h4>
                    <hr />

                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <div className="text-end mt-5">
                        </div>

                        {/* <div className=" pt-1 mt-5">
                            <h6>Search Type</h6>
                            <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                setType(e.target.value);
                            }} />
                            <br />
                            <button type="button" class="btn btn-success d-letter-spacing " onClick={getPaymentsType} >Go</button>
                        </div>                      */}

                        <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>FeedBack  Details</u></h4>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark">
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Mail</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Description</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Rate</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>

                                {feedback.map((feedback, key) => (
                                    <tr className="bg-light" key={key}>
                                        <td style={{ fontSize: '17px' }}>{feedback.feedbackId}</td>
                                        <td style={{ fontSize: '17px' }}>{feedback.email}</td>
                                        <td style={{ fontSize: '17px' }}>{feedback.description}</td>
                                        <td style={{ fontSize: '17px' }}>{feedback.rating}</td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Feedbackdashboard
