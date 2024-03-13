
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "./adminNav";
import jsPDF from 'jspdf';




function AllleavesDashboard() {

    const [leaves, setLeaves] = useState([]);

    const getLeaves = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/leave/allleave/");
            setLeaves(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Report")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Staff Leave Report ')
        for (let i = 0; i < leaves.length; i++) {
            doc.text(25, x, 'Leave Code :' + " " + leaves[i].uniqueId + " " + " " + " " + " " + "Staff ID : " + leaves[i].userName + " " + " " + " " + " " + " From Date : " + leaves[i].fromDate + " " + " " + " " + " " + " To Date : " + leaves[i].toDate)
            x = x + 20
        }
        doc.save('Report.pdf')

    }
    useEffect(() => {
        getLeaves()
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
                            <h1 style={{ color: "#422057FF", textAlign: "center", textTransform: "uppercase" }} >Salon-Nee Staff Leaves</h1>
                        </center>
                        <div className=" pt-1 mt-5">
                            <div className='col' style={{ width: "250px", }}>
                                <button type="submit" className="btn btn-danger btn-block" onClick={print}
                                >Print Report</button>
                            </div>
                        </div>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark" >
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Leave Code</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Staff ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>From Date</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>To date</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {leaves.map((leaves, key) => (
                                    <tr className="bg-light" key={key}>
                                        <td style={{ fontSize: '17px' }}>{leaves.uniqueId}</td>
                                        <td style={{ fontSize: '17px' }}>{leaves.userName}</td>
                                        <td style={{ fontSize: '17px' }}>{leaves.fromDate}</td>
                                        <td style={{ fontSize: '17px' }}>{leaves.toDate}</td>
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

export default AllleavesDashboard
