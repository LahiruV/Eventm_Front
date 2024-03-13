import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function ProductDashboard() {


    const [code, setCode] = useState("")
    const [imageSelected, setimageSelected] = useState("");
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("");
    const [submit, setSubmit] = useState(true);
    const [product, setProduct] = useState([]);
    const [picture, setPicture] = useState([]);
    const [disableBtn, setDisabletn] = useState(false)
    const [editBtn, setEditBtn] = useState(true)



    useEffect(() => {
        valid()
        editValid()
        getProducts()
    }, [code, price, category, name, quantity, imageSelected])


    const valid = () => {
        if ((code !== "") && (price !== "") && (name !== "") && (quantity !== "") && (imageSelected !== "") && (category !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    const editValid = () => {
        if ((code !== "") && (price !== "") && (name !== "") && (quantity !== "") && (category !== "")) {
            setEditBtn(false)
        } else {
            setEditBtn(true)
        }
    }

    function remove(code) {
        axios.delete(global.APIUrl + "/product/deleteproduct/" + code).then(() => {
            window.location.href = "/ProductDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Product Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }


    const getProducts = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/product/allproduct/");
            setProduct(res.data);
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
        const product = { code, price, category, name, quantity, picture };
        try {
            const response = await axios.post(global.APIUrl + "/product/addproduct", product);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Product Added",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/ProductDashboard";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Product Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/ProductDashboard";
        }
    };

    const preedit = (code, price, category, name, quantity, picture) => {

        setCode(code)
        setPrice(price)
        setCategory(category)
        setName(name)
        setQuantity(quantity)
        setPicture(picture)
        setDisabletn(true)
    }

    const edit = async (e) => {
        e.preventDefault();
        const product = { code, price, category, name, quantity, picture };
        try {
            const response = await axios.put(global.APIUrl + "/product/updateproduct", product);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Product Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/ProductDashboard";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Product Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/ProductDashboard";
        }
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
                                <h3 style={{ marginTop: '40px' }}>Add Products</h3>
                                <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                                    <form onSubmit={handleSubmit}>

                                        <div class="row mb-4">
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Product Code" placeholder='P001' variant="outlined" value={code} onChange={(e) => {
                                                    setCode(e.target.value);
                                                }} disabled={disableBtn} />
                                            </div>
                                            <div className="col">
                                                <TextField className="form-control" id="outlined-basic" label="Product Name" placeholder='Sahampoo' variant="outlined" value={name} disabled={disableBtn} onChange={(e) => {
                                                    setName(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <label for="exampleFormControlInput1" class="form-label h6"> Price</label>
                                                <input min="0" type='number' className="form-control" id="outlined-basic" label="Price" placeholder='2500 Rs/=' variant="outlined" value={price} onChange={(e) => {
                                                    setPrice(e.target.value);
                                                }} />
                                            </div>
                                            <div className="col">
                                                <label for="exampleFormControlInput1" class="form-label h6"> Quantity</label>
                                                <input min="0" type='number' className="form-control" id="outlined-basic" label="Quantity" placeholder='0' variant="outlined" value={quantity} onChange={(e) => {
                                                    setQuantity(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className='col'>
                                                <input type="file" onChange={(e) => {
                                                    setimageSelected(e.target.files[0]);
                                                }} class="form-control" id="customFile" disabled={disableBtn} />
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div className="col">
                                                <p style={{ paddingLeft: "50px" }}>Please Select Category : </p>
                                            </div>
                                            <div className="col">
                                                <div >
                                                    <select id="packages" value={category} onChange={handleChangeC} style={{ backgroundColor: "#343a40", color: "#fff" }} disabled={disableBtn}>
                                                        <option value=""> Category</option>
                                                        <option value="Salon Accessories">Salon Accessories</option>
                                                        <option value="Cosmetic Items">Cosmetic Items</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {disableBtn ? (
                                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} onClick={edit} disabled={editBtn}>Edit</button>
                                        ) : (
                                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} disabled={submit}>Save</button>
                                        )}


                                    </form>
                                </div>
                            </div>
                        </center >
                        <center>
                            <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                                <div class="row row-cols-1 row-cols-md-3 g-4">
                                    {product.map((product, key) => (
                                        <div class="col">
                                            <div class="card h-100">
                                                <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + product.picture} class="card-img-top"
                                                />
                                                <div class="card-body">
                                                    <h5 class="card-title"> {product.name}</h5>
                                                    <h6 class="card-title"> {product.code}</h6>
                                                    <h6 class="card-title"> {product.category}</h6>
                                                    <p class="card-text">
                                                        Price : {product.price} Rs/=
                                                    </p>
                                                    <p class="card-text">
                                                        Quantity :{product.quantity}
                                                    </p>
                                                    <div className='row'>

                                                        <div className='col'>
                                                            <button type="submit" class="btn btn-dark" onClick={() => preedit(product.code, product.price, product.category, product.name, product.quantity, product.picture)}>Edit</button>
                                                        </div>

                                                        <div className='col'>
                                                            <button type="button" class="btn btn-danger" onClick={() => remove(product.code)}>Delete</button>
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

export default ProductDashboard
