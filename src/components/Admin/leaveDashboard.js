import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function LeaveDashboard() {
    const userName = sessionStorage.getItem('admin_name');

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [edits, setEdits] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [submit, setSubmit] = useState(true);
    const uniqueId = generateId();
    const [editID, setEditID] = useState("")
    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    async function Save(e) {
        e.preventDefault();
        const leaves = { uniqueId, userName, fromDate, toDate };

        try {
            const response = await axios.post(`${global.APIUrl}/leave/addleave`, leaves);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Form Filled',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/LeaveDashboard';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Form Not Filled',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/LeaveDashboard';
        }
    }
    async function edited(e) {
        e.preventDefault();
        const leaves = { editID, userName, fromDate, toDate };
        try {
            const response = await axios.put(global.APIUrl + "/leave/updateleave", leaves);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/LeaveDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/LeaveDashboard";
        }
    }

    const getLeaves = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/leave/allleave/" + userName);
            setLeaves(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(code) {
        axios.delete(global.APIUrl + "/leave/deleteleave/" + code).then(() => {
            window.location.href = "/LeaveDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Package Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(uniqueId, userName, fromDate, toDate) {
        setEdits(true)
        setEditID(uniqueId)
        setFromDate(fromDate)
        setToDate(toDate)
    }


    useEffect(() => {
        getLeaves()

    }, [])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h3 className="text-uppercase">Staff </h3>
                        </center>
                        <MDBRow className='mt-3'>

                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            {edits ? (
                                                <h4>Edit  </h4>
                                            ) : (
                                                <h4>Leave Form</h4>
                                            )}

                                        </center>
                                        <form onSubmit={Save}>
                                            {edits ? (
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label h6">Leave Code</label>
                                                    <input type="text" class="form-control" placeholder="Enter Code (P001)" disabled value={editID} />
                                                </div>
                                            ) : (
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label h6">Leave Code</label>
                                                    <input type="text" class="form-control" placeholder="Enter Code (P001)" disabled value={uniqueId} />
                                                </div>
                                            )}


                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Staff ID</label>
                                                <input type="text" class="form-control" placeholder="Enter Package Name" value={userName} disabled />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">From Date</label>
                                                <input type="date" class="form-control" placeholder="From  Date" onChange={(e) => {
                                                    setFromDate(e.target.value);
                                                }} value={fromDate} required />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">To Date</label>
                                                <input type="date" class="form-control" placeholder="To  Date" onChange={(e) => {
                                                    setToDate(e.target.value);
                                                }} value={toDate} required />
                                            </div>

                                            <div className="text-end">
                                                {edits ? (
                                                    <button type="button" class="btn btn-success d-letter-spacing " onClick={edited} >Edit</button>
                                                ) : (
                                                    <button type="submit" class="btn btn-success d-letter-spacing "  >Save</button>
                                                )}
                                                &nbsp;&nbsp;&nbsp;
                                                <a href="../Admin">
                                                    <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                        Back
                                                    </MDBBtn>
                                                </a>
                                            </div>
                                        </form>
                                        <br />
                                        <MDBTable borderless className='mt-3' >
                                            <MDBTableHead>
                                                <tr className="bg-dark">
                                                    <th scope='col' className="text-white d-letter-spacing h6">Code</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Staff ID</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">From Date</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">To Date</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {leaves.map((leaves, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6>
                                                                {leaves.uniqueId}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {leaves.userName}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {leaves.fromDate}
                                                            </h6>
                                                        </td> <td>
                                                            <h6>
                                                                {leaves.toDate}
                                                            </h6>
                                                        </td>
                                                        <td className="text-center">
                                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(leaves.uniqueId)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                            <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(leaves.uniqueId, leaves.userName, leaves.fromDate, leaves.toDate)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
                                                        </td>
                                                    </tr>
                                                ))}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default LeaveDashboard
