import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function PlaceDashboard() {

    const [place, setPlace] = useState([]);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    const [submit, setSubmit] = useState(true);
    const [editBtn, setEditBtn] = useState(false);


    const valid = () => {
        if ((name != "") && (contact != "") && (cost != "") && (description != "") && (image != "") && (category != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    const getPlace = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/place/allplaces/");
            setPlace(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPlace()
        valid()
    }, [name, address, contact, cost, description, image, category])

    async function submiting(e) {
        e.preventDefault();
        const place = { name, address, contact, cost, description, image, category };

        axios.post(global.APIUrl + "/place/placesave", place).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Place Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/PlaceDashboard";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/PlaceDashboard";
                }
            });
        })
    }




    function remove(name) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this Place?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Remove it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(global.APIUrl + "/place/deletebudget/" + name)
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Place Removed.',
                            'success'
                        ).then(okay => {
                            if (okay) {
                                window.location.href = "/PlaceDashboard";
                            }
                        });
                    }).catch((err) => {
                        Swal.fire(
                            'error',
                            'Place Not Removed',
                            'error'
                        )
                    });
            } else {
                window.location.href = "/PlaceDashboard";
            }
        });
    }

    const edit = (name, address, contact, cost, description, image, category) => {
        setName(name);
        setAddress(address);
        setContact(contact);
        setCost(cost);
        setDescription(description);
        setImage(image);
        setCategory(category);
        setEditBtn(true);
    }

    const editing = (e) => {
        e.preventDefault();
        const budget = { name, address, contact, cost, description, image, category };
        axios.put(global.APIUrl + "/place/updatebudget/", budget).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Place Updated",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/PlaceDashboard";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/PlaceDashboard";
                }
            });
        })
    }

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Place Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            {editBtn ? (
                                                <h4>Edit Place Form</h4>
                                            ) : (
                                                <h4>Add Place Form</h4>
                                            )}
                                        </center>
                                        <form>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Name</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }} value={name} disabled={editBtn} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Address</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setAddress(e.target.value);
                                                    }} value={address} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label h6">Phone Number</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder=""
                                                    onChange={(e) => setContact(e.target.value)}
                                                    value={contact}
                                                    maxLength={10}
                                                />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Cost (LKR)</label>
                                                <input type="number" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCost(Math.max(0, e.target.value));
                                                    }} value={cost} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Description</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }} value={description} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Image</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setImage(e.target.value);
                                                    }} value={image} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Category</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCategory(e.target.value);
                                                    }} value={category} />
                                            </div>
                                            <br />
                                            <div className="text-end">
                                                {editBtn ? (
                                                    <button type="button" class="btn btn-success d-letter-spacing " onClick={editing} disabled={submit} >Edit</button>
                                                ) : (
                                                    <button type="button" class="btn btn-success d-letter-spacing " onClick={submiting} disabled={submit} >Save</button>
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

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <h2 style={{ paddingTop: '40px' }}>Added Budget</h2>
                            <hr />
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Address</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Cost</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Description</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Image</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Category</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
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
                                                    {place.cost}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.description}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.image}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {place.category}
                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <div className='col'>
                                                    <>
                                                        <div className='row'>
                                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(place.name)}>
                                                                <MDBIcon fas icon="trash-alt" />
                                                            </MDBBtn>
                                                        </div>
                                                        <br />
                                                        <div className='row'>
                                                            <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(place.name, place.address, place.contact, place.cost, place.description, place.image, place.category)}>
                                                                <MDBIcon fas icon="edit" />
                                                            </button></div>
                                                    </>
                                                </div>
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
export default PlaceDashboard;
