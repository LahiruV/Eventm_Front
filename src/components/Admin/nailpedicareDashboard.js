import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function NailpedicareDashboard() {

    const [name, setName] = useState("");
    const [editname, setEditName] = useState("");
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [searchName, setsearchName] = useState("");
    const [edits, setEdits] = useState(false);
    const [nailcare, setNailcare] = useState([]);

    async function Save(e) {
        e.preventDefault();
        const packageNP = { name, price, date, type };

        try {
            const response = await axios.post(`${global.APIUrl}/nailpedicare/addnailpedicare`, packageNP);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Package Added',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/NailpedicareDashboard';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Package Not Added',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/NailpedicareDashboard';
        }
    }
    async function edited(e) {
        e.preventDefault();
        const packageNP = { name, price, date, type, editname };
        try {
            const response = await axios.put(global.APIUrl + "/nailpedicare/updatenailpedicare", packageNP);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Package Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/NailpedicareDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Package Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/NailpedicareDashboard";
        }
    }

    const getNailpedicare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/nailpedicare/allnailpedicare/");
            console.log(res.data);
            setNailcare(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(name) {
        axios.delete(global.APIUrl + "/nailpedicare/deletenailpedicare/" + name).then(() => {
            window.location.href = "/NailpedicareDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Appointment Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(name, type, date, price) {
        setEditName(name)
        setName(name)
        setPrice(price)
        setDate(date)
        setType(type)
        setEdits(true)
    }

    const getNailcareType = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/nailpedicare/allnailpedicare/" + searchName);
            console.log(res.data);
            setNailcare(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getNailpedicare()
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
                            <h3 className="text-uppercase">Nail & Pedicare </h3>
                        </center>
                        <MDBRow className='mt-3'>
                            <MDBCol sm='5'>
                                <MDBCard className='shadow-0'>
                                    <br />
                                    <h3> List</h3>
                                    <MDBCardBody id="divToPrint">
                                        <div class="mb-3 mt-4">
                                            <h6>Search Type</h6>
                                            <MDBInput className="mt-3 bg-white" id='form1' type='text' placeholder="Search Package" onChange={(e) => {
                                                setsearchName(e.target.value);
                                            }} />
                                            <br />
                                            <button type="button" class="btn btn-success d-letter-spacing " onClick={getNailcareType} >Go</button>
                                        </div>
                                        <MDBTable borderless className='mt-3' >
                                            <MDBTableHead>
                                                <tr className="bg-dark">
                                                    <th scope='col' className="text-white d-letter-spacing h6">Package</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Type</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {nailcare.map((nailcare, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6>
                                                                {nailcare.name}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {nailcare.type}
                                                            </h6>
                                                        </td>
                                                        <td className="text-center">
                                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(nailcare.name)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                            <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(nailcare.name, nailcare.type, nailcare.date, nailcare.price)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
                                                        </td>
                                                    </tr>
                                                ))}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            {edits ? (
                                                <h4>Edit  </h4>
                                            ) : (
                                                <h4>Add New </h4>
                                            )}

                                        </center>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Name</label>
                                            <input type="text" class="form-control" placeholder="Enter Package Name" onChange={(e) => {
                                                setName(e.target.value);
                                            }} value={name} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Price</label>
                                            <input type="number" class="form-control" placeholder="Enter Package Price" min="0" value={price} onChange={(e) => {
                                                setPrice(e.target.value);
                                            }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Date</label>
                                            <input type="date" class="form-control" placeholder="Enter  Date" onChange={(e) => {
                                                setDate(e.target.value);
                                            }} value={date} />
                                        </div>

                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package type</label>
                                            <div className="col">
                                                <div >
                                                    <select id="packages" style={{ height: "30px", backgroundColor: "#343a40", color: "#fff" }} onChange={(e) => {
                                                        setType(e.target.value);
                                                    }} value={type}>
                                                        <option value="">Please choose an Package Type</option>
                                                        <option value="Nail">Nail</option>
                                                        <option value="Pedicare">PediCare</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            {edits ? (
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={edited} >Edit</button>
                                            ) : (
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={Save} >Save</button>
                                            )}
                                            &nbsp;&nbsp;&nbsp;
                                            <a href="../Admin">
                                                <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                    Back
                                                </MDBBtn>
                                            </a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NailpedicareDashboard
