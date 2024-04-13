import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import * as XLSX from 'xlsx';


function CrewAttend() {

    const [attend, setAttend] = useState([]);
    const [submit, setSubmit] = useState(true);
    const [crewID, setCrewID] = useState("")
    const [date, setDate] = useState("")    

    const valid = () => {
        if ((crewID != "") && (date != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    async function submited(e) {
        e.preventDefault();
        const attend = {crewID, date};
        try {
            const response = await axios.post(global.APIUrl + "/attend/add", attend);            
            Swal.fire({
                title: "Success!",
                text: "Attendance Added Successfully!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/CrewAttend";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Attended Successfully!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/CrewAttend";
        }
    }

    const getAttend = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/attend/get/");
            setAttend(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(attend);
        XLSX.utils.book_append_sheet(wb, ws, "Attendance Data");
        XLSX.writeFile(wb, "attendance.xlsx");
    }

    useEffect(() => {
        getAttend()
        valid()
    }, [crewID, date])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Crew Attended Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >                       
                        <MDBRow className='mt-3'>
                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            <h4>Attendance Form</h4>
                                        </center>
                                        <form>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Crew Id</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCrewID(e.target.value);
                                                    }} value={crewID} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Attended Date</label>
                                                <input type="date" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setDate(e.target.value);
                                                    }} value={date} />
                                            </div>                                           

                                            <div className="text-end">
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={submited} disabled={submit} >Save</button>                                                
                                            </div>
                                        </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>                          
                            <button onClick={exportToExcel} className="btn btn-dark" style={{width: 10, marginLeft:1060}}>
                                <i class="fa-solid fa-file-arrow-down"></i>
                            </button>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Crew Id</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Date</th>                                       
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {attend.map((attend, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {attend.crewID}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {attend.date}
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
export default CrewAttend;
