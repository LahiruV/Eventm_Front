import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function DressDashboard() {


    const [code, setCode] = useState("")
    const [imageSelected, setimageSelected] = useState("");
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("");
    const [submit, setSubmit] = useState(true);
    const [status, setStatus] = useState(true);
    const [checkedIndex, setCheckedIndex] = useState(-1);
    const [dress, setDress] = useState([]);
    const [ecode, setEcode] = useState([]);



    useEffect(() => {
        valid()
        getDress()
    }, [code, price, category, size, color, imageSelected])


    async function avaedited(code, price, category, size, color, picture) {

        const estatus = false
        const packageFC = { code, price, category, size, color, picture, estatus }

        try {
            const response = await axios.put(global.APIUrl + "/dress/updatedress", packageFC);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Dress Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/DressDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Dress Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/DressDashboard";
        }

    }
    async function unavaedited(code, price, category, size, color, picture) {

        const estatus = true
        const packageFC = { code, price, category, size, color, picture, estatus }

        try {
            const response = await axios.put(global.APIUrl + "/dress/updatedress", packageFC);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Dress Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/DressDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Dress Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/DressDashboard";
        }

    }

    const valid = () => {
        if ((code !== "") && (price !== "") && (category !== "") && (size !== "") && (color !== "") && (imageSelected !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    const handleCheckboxChange = (index, value) => {
        setColor(value);
        setCheckedIndex(index);
    };

    function remove(code) {
        axios.delete(global.APIUrl + "/dress/deletedress/" + code).then(() => {
            window.location.href = "/DressDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Dress Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    const getDress = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/dress/alldress/");
            setDress(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;
        setStatus(true)
        const dress = { code, price, category, size, color, picture, status };
        try {
            const response = await axios.post(global.APIUrl + "/dress/adddress", dress);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Dress Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/DressDashboard";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Dress Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/DressDashboard";
        }
    };

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const handleChangeC = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                                <h3 style={{ marginTop: '40px' }}>Add New Dress</h3>
                                <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                    <form onSubmit={handleSubmit}>

                                        <div class="row mb-4">
                                            <div className="col">
                                                <label for="exampleFormControlInput1" class="form-label h6">Add Dress Code</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="D001"
                                                    onChange={(e) => {
                                                        setCode(e.target.value);
                                                    }}
                                                />
                                            </div>


                                            <div className="col">
                                                <label for="exampleFormControlInput1" class="form-label h6">Add Price</label>
                                                <input
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="2500 Rs/="
                                                    value={price}
                                                    min="0"
                                                    onChange={(e) => {
                                                        setPrice(e.target.value);
                                                    }}
                                                />

                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col">
                                                <div className="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label h6">Image</label>
                                                    <input type="file" onChange={(e) => {
                                                        setimageSelected(e.target.files[0]);
                                                    }} class="form-control" id="customFile" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <p style={{ paddingLeft: "50px" }}>Please Select Size : </p>
                                                    </div>
                                                    <div className="col">
                                                        <div >
                                                            <select id="packages" value={size} onChange={handleChange} style={{ backgroundColor: "#343a40", color: "#fff" }}>
                                                                <option value=""> Size</option>
                                                                <option value="26">26</option>
                                                                <option value="28">28</option>
                                                                <option value="30">30</option>
                                                                <option value="32">32</option>
                                                                <option value="34">34</option>
                                                                <option value="36">36</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col">
                                                <div className="row">
                                                    <div className="col">
                                                        <p style={{ paddingLeft: "50px" }}>Please Select Category : </p>
                                                    </div>
                                                    <div className="col">
                                                        <div >
                                                            <select id="packages" value={category} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff" }}>
                                                                <option value=""> Category</option>
                                                                <option value="Party Dresses">Party Dresses</option>
                                                                <option value="Wedding Dresses">Wedding Dresses</option>
                                                                <option value="Formal Dresses">Formal Dresses</option>
                                                                <option value="Blazers">Blazers</option>
                                                                <option value="Sarees">Sarees</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="row">
                                                <div className="col">
                                                    <p style={{ paddingLeft: "50px" }}>Select Color : </p>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="inlineCheckbox1"
                                                            checked={checkedIndex === 0}
                                                            onChange={() => handleCheckboxChange(0, "Red")}
                                                        />
                                                        <label style={{ color: "red" }} className="form-check-label" htmlFor="inlineCheckbox1">
                                                            Red
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="inlineCheckbox1"
                                                            checked={checkedIndex === 1}
                                                            onChange={() => handleCheckboxChange(1, "Black")}
                                                        />
                                                        <label style={{ color: "black" }} className="form-check-label" htmlFor="inlineCheckbox1">
                                                            Black
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="inlineCheckbox1"
                                                            checked={checkedIndex === 2}
                                                            onChange={() => handleCheckboxChange(2, "Blue")}
                                                        />
                                                        <label style={{ color: "blue" }} className="form-check-label" htmlFor="inlineCheckbox1">
                                                            Blue
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="inlineCheckbox1"
                                                            checked={checkedIndex === 3}
                                                            onChange={() => handleCheckboxChange(3, "Grey")}
                                                        />
                                                        <label style={{ color: "grey" }} className="form-check-label" htmlFor="inlineCheckbox1">
                                                            Grey
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="inlineCheckbox1"
                                                            checked={checkedIndex === 4}
                                                            onChange={() => handleCheckboxChange(4, "Green")}
                                                        />
                                                        <label style={{ color: "green" }} className="form-check-label" htmlFor="inlineCheckbox1">
                                                            Green
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} disabled={submit}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </center >
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                    {dress.map((dress, key) => (
                                        <div class="col">
                                            <div class="card h-100">
                                                <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + dress.picture} class="card-img-top"
                                                />
                                                <div class="card-body">
                                                    <h5 class="card-title"> {dress.category}</h5>
                                                    <h6 class="card-title"> {dress.code}</h6>
                                                    <p class="card-text">
                                                        Price : {dress.price} Rs/=
                                                    </p>
                                                    <p class="card-text">
                                                        Size :{dress.size}
                                                    </p>
                                                    <p class="card-text" style={{ color: `${dress.color}`, fontWeight: "bold" }}>
                                                        Color : {dress.color}
                                                    </p>
                                                    <div className='row'> {dress.status ? (
                                                        <div className='col'>
                                                            <button type="button" class="btn btn-dark" onClick={() => avaedited(dress.code, dress.price, dress.category, dress.size, dress.color, dress.picture)}>Available</button>
                                                        </div>
                                                    ) : (
                                                        <div className='col'>
                                                            <button type="button" class="btn btn-dark" onClick={() => unavaedited(dress.code, dress.price, dress.category, dress.size, dress.color, dress.picture)}>Unavailable</button>
                                                        </div>
                                                    )}
                                                        <div className='col'>
                                                            <button type="button" class="btn btn-danger" onClick={() => remove(dress.code)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div >
                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DressDashboard
