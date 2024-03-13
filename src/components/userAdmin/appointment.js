import React, { useState, useEffect } from 'react';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBTableBody, MDBTable, MDBTableHead
} from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../main_parts/navbar.user.log.js';
import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import Footer from '../main_parts/footer.js';
import '../APIUrl';


function Appointment() {

    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [nIC, setNIC] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")
    const [paackage, setPackage] = useState("")
    const [time, setTime] = useState("");
    const [submit, setSubmit] = useState(true);
    const [checkedIndex, setCheckedIndex] = useState(-1);
    const userName = sessionStorage.getItem('user_name');
    const [yourAppoiments, setYourAppointments] = useState([]);
    const uniqueId = "A" + generateId();
    const type = "Appointment"
    const [price, setPrice] = useState("")


    function print() {
        let x = 100
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, "Report")
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 60, ' Appointment Report ')
        for (let i = 0; i < yourAppoiments.length; i++) {
            doc.text(25, x, 'Name :' + " " + yourAppoiments[i].name + " " + " " + " " + " " + " Package : " + yourAppoiments[i].paackage + " " + " " + " " + " " + " Date Time : " + yourAppoiments[i].date + "" + yourAppoiments[i].time)
            x = x + 20
        }
        doc.save('Report.pdf')

    }

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const handleChange = (event) => {
        setPackage(event.target.value);
    };
    const handleCheckboxChange = (index, value) => {
        setTime(value);
        setCheckedIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(price);
        const appointment = { name, email, phoneNo, nIC, date, paackage, time, userName };
        try {
            const response = await axios.post(global.APIUrl + "/appointment/addAppointment", appointment);
            console.log(response.data);
            book()
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Appointment Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/Appointment";
        }
    };

    function book() {
        var code = ""
        var size = ""
        var color = ""
        var exlist = ""
        reactLocalStorage.setObject("DBooking", [code, paackage, price, size, color, uniqueId, type, exlist, paackage]);
        window.location.href = "/Booking";
    }

    const valid = () => {
        if ((name !== "") && (email !== "") && (phoneNo !== "") && (nIC !== "") && (date !== "") && (paackage !== "") && (time !== "")) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    const getAppointments = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/appointment/allappointment/" + userName);
            console.log(res.data);
            setYourAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    function remove(name) {
        axios.delete(global.APIUrl + "/appointment/deleteAppointment/" + name).then(() => {
            window.location.href = "/Appointment";

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

    function editAppoiment(name, email, phoneNo, nIC, date, paackage, time) {
        reactLocalStorage.setObject("AppointmentEdit", [name, email, phoneNo, nIC, date, paackage, time]);
        window.location.href = "/AppointmentEdit";
    }

    const priceChange = () => {
        if (paackage === "Hair Cut") {
            setPrice("4500")
        } else if (paackage === "Keratin Treatment") {
            setPrice("20000")
        } else if (paackage === "Hair Straight") {
            setPrice("15000")
        } else if (paackage === "Hair Coloring") {
            setPrice("10500")
        } else if (paackage === "Hair Relaxing") {
            setPrice("10000")
        } else if (paackage === "Nail") {
            setPrice("2500")
        } else if (paackage === "Pedicure") {
            setPrice("4000")
        } else if (paackage === "Facial Treatment") {
            setPrice("5000")
        } else if (paackage === "Makeup") {
            setPrice("2000")
        } else if (paackage === "Dressing") {
            setPrice("200000")
        }
    }

    useEffect(() => {
        getAppointments()
        valid()
        priceChange()
    }, [name, email, phoneNo, nIC, date, paackage, time])

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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Make Your Appointment</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "90%" }}>
                    <h3 style={{ marginTop: '40px' }}>Add Your Appointment</h3>
                    <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        <form onSubmit={handleSubmit}>

                            <div class="row mb-4">
                                <div className="col">
                                    <TextField className="form-control" id="outlined-basic" label="Name" variant="outlined" onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                </div>


                                <div className="col">
                                    <TextField className="form-control" id="outlined-basic" label="NIC" variant="outlined" onChange={(e) => {
                                        setNIC(e.target.value);
                                    }} />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col">
                                    <TextField format="0## ### ####" className="form-control" id="outlined-basic" label="Contact No" variant="outlined" type='number' onChange={(e) => {
                                        setPhoneNo(e.target.value);
                                    }}
                                        onKeyPress={(event) => {
                                            if (event.target.value.length >= 10) {
                                                event.preventDefault();
                                            }
                                        }} />
                                </div>

                                <div class="col">
                                    <TextField className="form-control" id="outlined-basic" type='email' label="Email" variant="outlined" onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} required />
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <p style={{ paddingLeft: "50px" }}>Select Your Package : </p>
                                        </div>
                                        <div className="col">
                                            <div >
                                                <select id="packages" value={paackage} onChange={handleChange} style={{ backgroundColor: "#343a40", color: "#fff" }}>
                                                    <option value="">Please choose an Package</option>
                                                    <option value="Hair Cut">Hair Cut</option>
                                                    <option value="Keratin Treatment">Keratin Treatment</option>
                                                    <option value="Hair Straight">Hair Straight</option>
                                                    <option value="Hair Coloring">Hair Coloring</option>
                                                    <option value="Hair Relaxing">Hair Relaxing</option>
                                                    <option value="Nail">Nail</option>
                                                    <option value="Pedicure">Pedicure</option>
                                                    <option value="Facial Treatment">Facial Treatment</option>
                                                    <option value="Makeup">Makeup</option>
                                                    <option value="Dressing">Dressing</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col">
                                    <div className="row">
                                        <div className="col">
                                            <p style={{ paddingLeft: "50px" }}>Date : </p>
                                        </div>
                                        <div className="col">
                                            <div id="date-picker-example" style={{ paddingRight: "150px" }} class="md-form md-outline input-with-post-icon datepicker" inline="true">
                                                <input placeholder="Select date" type="date" id="example" class="form-control" onChange={(e) => {
                                                    setDate(e.target.value);
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row mb-4">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <p style={{ paddingLeft: "400px" }}>Select Time : </p>
                                        </div>
                                        <div className="col">
                                            <div style={{ paddingRight: "180px" }}>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="inlineCheckbox1"
                                                        checked={checkedIndex === 0}
                                                        onChange={() => handleCheckboxChange(0, "10.00 AM")}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineCheckbox1">
                                                        10.00 AM
                                                    </label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="inlineCheckbox2"
                                                        checked={checkedIndex === 1}
                                                        onChange={() => handleCheckboxChange(1, "12.00 PM")}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineCheckbox2">
                                                        12.00 PM
                                                    </label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="inlineCheckbox3"
                                                        checked={checkedIndex === 2}
                                                        onChange={() => handleCheckboxChange(2, "2.00 PM")}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineCheckbox3">
                                                        2.00 PM
                                                    </label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="inlineCheckbox4"
                                                        checked={checkedIndex === 3}
                                                        onChange={() => handleCheckboxChange(3, "4.00 PM")}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineCheckbox4">
                                                        4.00 PM
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <button type="submit" class="btn btn-dark btn-block mb-5" style={{ width: "500px" }} disabled={submit}>Place order</button>
                        </form>
                    </div>
                </div>
            </center >
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "95%" }}>
                    <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Make Appointment </u></h4>
                    <div style={{ paddingLeft: "1050px", paddingBottom: "5px" }}>
                        <button type="submit" className="btn btn-success btn-block" style={{ width: "200px" }} onClick={print}
                        >Appointment Report</button>
                    </div>
                    <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-warning">
                            <tr>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Name</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>NIC</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Contact No</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Email</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Package</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Time</h6></th>
                                <th scope='col' ><h6 className="text-black" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {yourAppoiments.map((yourAppoiments, key) => (
                                <tr className="bg-light">
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.name}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.nIC}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.phoneNo}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.email}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.paackage}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.date}</td>
                                    <td style={{ fontSize: '17px' }}>{yourAppoiments.time}</td>
                                    <td>
                                        <MDBBtn size='lg' className="shadow-0" color="danger" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => remove(yourAppoiments.name)}>Delete</MDBBtn>{''}&nbsp;&nbsp;
                                        <MDBBtn size='lg' className="shadow-0" color="dark" style={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => editAppoiment(yourAppoiments.name, yourAppoiments.nIC, yourAppoiments.phoneNo, yourAppoiments.email, yourAppoiments.paackage, yourAppoiments.date, yourAppoiments.time)}>Edit</MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </div >
            </center>
            <Footer />
        </div >
    )
};

export default Appointment;