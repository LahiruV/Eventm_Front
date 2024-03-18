import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';

function FinanceDashboard() {

    const [admin, setAdmin] = useState([]);
    const [req, setReq] = useState([]);
    const [place, setPlace] = useState([]);
    const [crew, setCrew] = useState([]);
    const [sponsor, setSponsor] = useState([]);
    const [submit, setSubmit] = useState(true);
    const bid = "Bug" + generateId();
    const [placeAbudget, setPlaceAbudget] = useState(0);
    const [placePbudget, setPlacePbudget] = useState(0);
    const [crewAbudget, setCrewAbudget] = useState(0);
    const [crewPbudget, setCrewPbudget] = useState(0);
    const [promoAbudget, setPromoAbudget] = useState(0);
    const [promoPbudget, setPromoPbudget] = useState(0);
    const [fullBudget, setFullBudget] = useState();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Active");

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const valid = () => {
        if ((name != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    async function submiting(e) {
         e.preventDefault();
         const budget = { bid, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status };

            axios.post(global.APIUrl + "/budget/addbudget", budget).then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Budget Added",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                }).then(okay => {
                    if (okay) {
                        window.location.href = "/FinanceDashboard";
                    }
                });
            }).catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: "Not Added",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            })       
    }

    const getPlaces = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/place/allplaces/");
            setPlace(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getCrews = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/crew/allcrew/");
            setCrew(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getSponsors = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/sponsor/allsponsors/");
            setSponsor(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getByTypeAdmin = async () => {
        // try {
        //     const res = await axios.get(global.APIUrl + "/user/viewSystemReg/" + search);
        //     setAdmin(res.data);
        //     console.log(res.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    function remove(email) {
        axios.delete(global.APIUrl + "/user/deleteadmin/" + email).then(() => {
            window.location.href = "/UserDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(userName, email, password, phone, userType) {
        // setUserName(userName)
        // setEmail(email)
        // setPassword(password)
        // setPhone(phone)
        // setUserType(userType)
    }


    useEffect(() => {
        getPlaces()
        getSponsors()
        getCrews()
        valid()
        setFullBudget(parseInt(placeAbudget) + parseInt(placePbudget) + parseInt(crewAbudget) + parseInt(crewPbudget) - parseInt(promoAbudget) - parseInt(promoPbudget))

    }, [placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, name])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            <h4>Add Budget Form</h4>
                                        </center>
                                        <form>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">ID</label>
                                                <input type="text" class="form-control" placeholder="" value={bid} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Name of Req</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }} value={name} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Place Actual Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setPlaceAbudget(Math.max(0, e.target.value));
                                                    }} value={placeAbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Place Profit Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setPlacePbudget(Math.max(0, e.target.value));
                                                    }} value={placePbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Crew Actual Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCrewAbudget(Math.max(0, e.target.value));
                                                    }} value={crewAbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Crew Profit Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCrewPbudget(Math.max(0, e.target.value));
                                                    }} value={crewPbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Promotion Actual Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setPromoAbudget(Math.max(0, e.target.value));
                                                    }} value={promoAbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Budget For Promotion Profit Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setPromoPbudget(Math.max(0, e.target.value));
                                                    }} value={promoPbudget} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Full Budget (LKR)</label>
                                                <input type="number" class="form-control" placeholder="" value={fullBudget} disabled />
                                            </div>

                                            <div className="text-end">
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={submiting} disabled={submit} >Save</button>
                                                &nbsp;&nbsp;&nbsp;
                                                <a href="../Admin">
                                                    <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                        Back
                                                    </MDBBtn>
                                                </a>
                                            </div>
                                        </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <div className=" pt-1">
                                <h6>Search Type</h6>
                                {/* <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                    setSearch(e.target.value);
                                }} /> */}
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getByTypeAdmin}>Go</button>
                            </div>
                            <h2 style={{ paddingTop: '40px' }}>Added Budget</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Admin Role</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Password</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {admin.map((admin, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {admin.userName}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.email}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.phone}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.userType}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.password}
                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(admin.email)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(admin.userName, admin.email, admin.password, admin.phone, admin.userType)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                            <h2 style={{ paddingTop: '20px' }}>Customer Request</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Admin Role</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Password</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {req.map((req, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {req.userName}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {req.email}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {req.phone}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {req.userType}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {req.password}
                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(admin.email)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(admin.userName, admin.email, admin.password, admin.phone, admin.userType)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                            <h2 style={{ paddingTop: '20px' }}>Places</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Address</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Category</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Cost</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {place.map((place, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {place.name}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.address}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.contact}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.category}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.category}
                                                </h6>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                            <h2 style={{ paddingTop: '20px' }}>Crew</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Category</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Cost</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {crew.map((crew, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {crew.name}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {crew.category}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {crew.contact}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {crew.cost}
                                                </h6>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                            <h2 style={{ paddingTop: '20px' }}>Sponsorship</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Address</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Category</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Cost</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {sponsor.map((sponsor, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {sponsor.name}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {sponsor.address}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {sponsor.contact}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {sponsor.category}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.category}
                                                </h6>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default FinanceDashboard;
