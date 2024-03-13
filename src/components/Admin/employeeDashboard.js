import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';

function EmployeeDashboard() {
    const userName = sessionStorage.getItem('admin_name');

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [edits, setEdits] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [submit, setSubmit] = useState(true);

    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("")
    const [type, setType] = useState("")
    const [salary, setsalary] = useState("")
    const [date, setDate] = useState("")
    const [search, setSearch] = useState("")

    const change = (e) => {
        setType(e.target.value)

        if (e.target.value === "Hair Stylist") {
            setsalary("40000")
        } else if (e.target.value === "Nail Stylist") {
            setsalary("30000")
        } else if (e.target.value === "Dress Designer") {
            setsalary("60000")
        } else if (e.target.value === "Receptionist ") {
            setsalary("25000")
        } else if (e.target.value === "Senior Manager") {
            setsalary("90000")
        } else if (e.target.value === "Cleaner ") {
            setsalary("12000")
        }
    }
    const valid = () => {
        if ((code != "") && (name != "") && (phoneNo != "") && (email != "") && (type != "") && (salary != "") && (date != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    async function save(e) {
        e.preventDefault();
        const employee = { code, name, phoneNo, email, type, salary, date };

        try {
            const response = await axios.post(`${global.APIUrl}/employee/addemployee`, employee);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Form Filled',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/EmployeeDashboard';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Form Not Filled',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/EmployeeDashboard';
        }
    }
    async function edited(e) {
        e.preventDefault();
        const employee = { code, name, phoneNo, email, type, salary, date };
        try {
            const response = await axios.put(global.APIUrl + "/employee/updateemployee", employee);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/EmployeeDashboard";
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
            window.location.href = "/EmployeeDashboard";
        }
    }

    const getEmployees = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/employee/allemployee/");
            setEmployee(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getByType = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/employee/allemployee/" + search);
            setEmployee(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(code) {
        axios.delete(global.APIUrl + "/employee/deleteemployee/" + code).then(() => {
            window.location.href = "/EmployeeDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Employee Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(code, name, phoneNo, email, type, salary, date) {
        setEdits(true)
        setCode(code)
        setName(name)
        setPhoneNo(phoneNo)
        setEmail(email)
        setType(type)
        setsalary(salary)
        setDate(date)

    }


    useEffect(() => {
        getEmployees()
        valid()

    }, [code, name, phoneNo, email, type, salary, date])

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
                                            {edits ? (
                                                <h4>Edit Employee</h4>
                                            ) : (
                                                <h4>Employee Form</h4>
                                            )}

                                        </center>
                                        <form onSubmit={save}>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Code</label>
                                                <input type="text" class="form-control" placeholder="E001"
                                                    onChange={(e) => {
                                                        setCode(e.target.value);
                                                    }} value={code} disabled={edits} />
                                            </div>

                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Name</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }} value={name} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Phone Number</label>
                                                <NumberFormat format="0## ### ####" class="form-control" placeholder="0## ### ## ##" style={{ fontSize: "18px" }} onChange={(e) => {
                                                    setPhoneNo(e.target.value);
                                                }} value={phoneNo} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Email</label>
                                                <input type="email" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }} value={email} required />
                                            </div>

                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Type</label>
                                                <div className="col">
                                                    <div >
                                                        <select id="packages" style={{ height: "30px", backgroundColor: "#343a40", color: "#fff" }} onChange={change} value={type}>

                                                            <option value="">Select Employee Type</option>
                                                            <option value="Hair Stylist">Hair Stylist </option>
                                                            <option value="Nail Stylist">Nail Stylist</option>
                                                            <option value="Dress Designer">Dress Designer</option>
                                                            <option value="Receptionist">Receptionist</option>
                                                            <option value="Senior Manager">Senior Manager </option>
                                                            <option value="Cleaner ">Cleaner  </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Employee Salary</label>
                                                <input type="text" class="form-control" placeholder="" value={salary} disabled />
                                            </div>




                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Join Date</label>
                                                <input type="date" class="form-control" placeholder="To  Date" onChange={(e) => {
                                                    setDate(e.target.value);
                                                }} value={date} />
                                            </div>

                                            <div className="text-end">
                                                {edits ? (
                                                    <button type="button" class="btn btn-success d-letter-spacing " onClick={edited} disabled={submit} >Edit</button>
                                                ) : (
                                                    <button type="submit" class="btn btn-success d-letter-spacing " disabled={submit} >Save</button>
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
                            <div className=" pt-1 mt-5">
                                <h6>Search Type</h6>
                                <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getByType}>Go</button>
                            </div>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Employee Code</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Emnployee Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Type</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Salary</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Start Date</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {employee.map((employee, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {employee.code}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.name}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.phoneNo}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.email}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.type}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.salary} Rs/=
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {employee.date}
                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(employee.code)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(employee.code, employee.name, employee.phoneNo, employee.email, employee.type, employee.salary, employee.date)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
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
export default EmployeeDashboard;
