import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function PacakageDashboard() {

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [items, setItems] = useState("");
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");
    const [edits, setEdits] = useState(false);
    const [disCol, setdisCol] = useState(false);
    const [product, setProduct] = useState([]);
    const [haircare, setHaircare] = useState([]);
    const [nailcare, setNailcare] = useState([]);
    const [packaage, setPaackage] = useState([]);
    const [submit, setSubmit] = useState(true);

    const valid = () => {
        if ((code !== "") && (price !== "") && (items !== "") && (name !== "") && (date !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }

    async function Save(e) {
        e.preventDefault();
        const packageFC = { code, price, items, name, date };

        try {
            const response = await axios.post(`${global.APIUrl}/package/addpackage`, packageFC);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Package Added',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/PacakageDashboard';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Package Not Added',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/PacakageDashboard';
        }
    }
    async function edited(e) {
        e.preventDefault();
        const packageFC = { code, price, items, name, date };
        try {
            const response = await axios.put(global.APIUrl + "/package/updatepackage", packageFC);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Package Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/PacakageDashboard";
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
            window.location.href = "/PacakageDashboard";
        }
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
    const getPackage = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/package/allpackage/");
            setPaackage(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(code) {
        axios.delete(global.APIUrl + "/package/deletepackage/" + code).then(() => {
            window.location.href = "/PacakageDashboard";

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

    function edit(code, price, items, name, date) {
        setdisCol(true)
        setCode(code)
        setPrice(price)
        setItems(items)
        setName(name)
        setDate(date)
        setEdits(true)
    }

    const getHaircare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/haircare/allhaircare/");
            console.log(res.data);
            setHaircare(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getNailpedicare = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/nailpedicare/allnailpedicare/");
            console.log(res.data);
            setNailcare(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getPackage()
        valid()
        getNailpedicare()
        getHaircare()
        getProducts()
    }, [code, price, items, name, date])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h3 className="text-uppercase">Package </h3>
                        </center>
                        <MDBRow className='mt-3'>
                            <MDBCol sm='5'>
                                <MDBCard className='shadow-0'>
                                    <br />
                                    <h3>List</h3>
                                    <MDBCardBody id="divToPrint">
                                        <MDBTable borderless className='mt-3' >
                                            <MDBTableHead>
                                                <tr className="bg-dark">
                                                    <th scope='col' className="text-white d-letter-spacing h6">Product</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Category</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Price</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {product.map((product, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6>
                                                                {product.name}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {product.category}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {product.price} Rs/=
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {haircare.map((haircare, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6>
                                                                {haircare.name}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {haircare.type}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {haircare.price} Rs/=
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                ))}
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
                                                        <td>
                                                            <h6>
                                                                {nailcare.price} Rs/=
                                                            </h6>
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
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Code</label>
                                            <input type="text" class="form-control" placeholder="Enter Code (P001)" onChange={(e) => {
                                                setCode(e.target.value);
                                            }} disabled={disCol} value={code} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Name</label>
                                            <input type="text" class="form-control" placeholder="Enter Package Name" onChange={(e) => {
                                                setName(e.target.value);
                                            }} value={name} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Items</label>
                                            <input type="text" class="form-control" placeholder="#### , #### , ####" onChange={(e) => {
                                                setItems(e.target.value);
                                            }} value={items} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Package Price</label>
                                            <input type="number" class="form-control" placeholder="Enter Package Price" value={price} min="0" onChange={(e) => {
                                                setPrice(e.target.value);
                                            }} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label h6">Date</label>
                                            <input type="date" class="form-control" placeholder="Enter  Date" onChange={(e) => {
                                                setDate(e.target.value);
                                            }} value={date} />
                                        </div>

                                        <div className="text-end">
                                            {edits ? (
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={edited} disabled={submit}>Edit</button>
                                            ) : (
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={Save} disabled={submit}>Save</button>
                                            )}
                                            &nbsp;&nbsp;&nbsp;
                                            <a href="../Admin">
                                                <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                    Back
                                                </MDBBtn>
                                            </a>
                                        </div>
                                        <br />
                                        <MDBTable borderless className='mt-3' >
                                            <MDBTableHead>
                                                <tr className="bg-dark">
                                                    <th scope='col' className="text-white d-letter-spacing h6">Code</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6">Price</th>
                                                    <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {packaage.map((packaage, key) => (
                                                    <tr className="bg-light">
                                                        <td>
                                                            <h6>
                                                                {packaage.code}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {packaage.name}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {packaage.price} Rs/=
                                                            </h6>
                                                        </td>
                                                        <td className="text-center">
                                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(packaage.code)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                            <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(packaage.code, packaage.price, packaage.items, packaage.name, packaage.date)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
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

export default PacakageDashboard
