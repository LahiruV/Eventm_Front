import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';

function ReqEventDashboard() {
    
    const [evtReq, setEvtReq] = useState([]);
    const [submit, setSubmit] = useState(true);
    const [userName, setUserName] = useState("")
    const [userType, setUserType] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [search, setSearch] = useState("")
    /////
     const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [expectedGuests, setExpectedGuests] = useState('');
    const [eventType, setEventType] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [venuePreference, setVenuePreference] = useState('');
    const [accessibilityRequirements, setAccessibilityRequirements] = useState('');
    const [staffRequired, setStaffRequired] = useState([]);
    const [estimatedBudgetRange, setEstimatedBudgetRange] = useState('');
    const [sponsorshipOpportunities, setSponsorshipOpportunities] = useState('');
    const [vendorsNeeded, setVendorsNeeded] = useState('');
    const [numVendorBooths, setNumVendorBooths] = useState('');
    const [uniqueId, setuniqueId] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !eventDate ||
            !eventTime ||
            !expectedGuests ||
            !eventType ||
            !venueDescription ||
            !venuePreference ||
            !accessibilityRequirements ||
            staffRequired.length === 0 ||
            !estimatedBudgetRange ||
            !sponsorshipOpportunities ||
            !vendorsNeeded ||
            !numVendorBooths
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        const reqevents = { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange, sponsorshipOpportunities, vendorsNeeded, numVendorBooths };
        try {
            const response = await axios.post(global.APIUrl + "/eventReq/addEventReq", reqevents);           
            Swal.fire({
                title: "Success!",
                text: "Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/RequestEvent";
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/RequestEvent";
        }
    };


    async function edited(e) {
        e.preventDefault();
        const employee = { userName, phone, email, userType, password };
        try {
            const response = await axios.put(global.APIUrl + "/user/updateadmin", employee);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/UserDashboard";
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
            window.location.href = "/UserDashboard";
        }
    }

    const getAdmins = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/eventReq/allEventReq/");
            setEvtReq(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getByTypeAdmin = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/user/viewSystemReg/" + search);
            setEvtReq(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
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
        setUserName(userName)
        setEmail(email)
        setPassword(password)
        setPhone(phone)
        setUserType(userType)
    }


    useEffect(() => {
        getAdmins()

    }, [userName, email, password, phone, userType])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Request Event Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            <h4>Request Event Form</h4>
                                        </center>
                                        <form onSubmit={handleSubmit}>
                        <MDBRow className="mb-3">

                            <MDBCol>
                                <TextField
                                    label="Event Date"
                                    type="date"
                                    fullWidth
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    InputProps={{
                                        inputProps: { min: new Date().toISOString().split('T')[0] }
                                    }}
                                />
                            </MDBCol>

                            <MDBCol>
                                <TextField
                                    label="Event Time"
                                    type="time"
                                    fullWidth
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol>
                                <TextField
                                    label="Expected Number of Guests"
                                    type="number"
                                    fullWidth
                                    value={expectedGuests}
                                    onChange={(e) => setExpectedGuests(e.target.value)}
                                    required
                                />
                            </MDBCol>

                            <MDBCol>
                                <FormControl fullWidth required>
                                    <InputLabel>Type of Event</InputLabel>
                                    <Select
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <MenuItem value="conference">Conference</MenuItem>
                                        <MenuItem value="wedding">Wedding</MenuItem>
                                        <MenuItem value="birthday">Birthday Party</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <TextField
                                    label="Venue Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={venueDescription}
                                    onChange={(e) => setVenueDescription(e.target.value)}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol>
                                <FormControl fullWidth required>
                                    <InputLabel>Venue Style Preference</InputLabel>
                                    <Select
                                        value={venuePreference}
                                        onChange={(e) => setVenuePreference(e.target.value)}
                                    >
                                        <MenuItem value="hotel">Hotel</MenuItem>
                                        <MenuItem value="restaurant">Restaurant</MenuItem>
                                        <MenuItem value="banquet">Banquet Hall</MenuItem>
                                        <MenuItem value="garden">Garden</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <TextField
                                    label="Accessibility Requirements"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={accessibilityRequirements}
                                    onChange={(e) => setAccessibilityRequirements(e.target.value)}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol>
                                <FormControl fullWidth required>
                                    <InputLabel>Types of Staff Required</InputLabel>
                                    <Select
                                        multiple
                                        value={staffRequired}
                                        onChange={(e) => setStaffRequired(e.target.value)}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        <MenuItem value="eventCoordinator">Event Coordinator</MenuItem>
                                        <MenuItem value="waitstaff">Waitstaff</MenuItem>
                                        <MenuItem value="security">Security</MenuItem>
                                        <MenuItem value="technicalCrew">Technical Crew</MenuItem>
                                        <MenuItem value="photography">Photography</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol>
                                <TextField
                                    label="Estimated Budget Range"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={estimatedBudgetRange}
                                    onChange={(e) => setEstimatedBudgetRange(e.target.value)}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow className="mb-3">
                            <MDBCol>
                                <FormControl fullWidth required>
                                    <InputLabel>Type of Sponsorship Opportunities Needed</InputLabel>
                                    <Select
                                        value={sponsorshipOpportunities}
                                        onChange={(e) => setSponsorshipOpportunities(e.target.value)}
                                    >
                                        <MenuItem value="titleSponsor">Title Sponsor</MenuItem>
                                        <MenuItem value="stageSponsor">Stage Sponsor</MenuItem>
                                        <MenuItem value="boothSponsor">Booth Sponsor</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-3">
                            <MDBCol>
                                <FormControl fullWidth required>
                                    <InputLabel>Types of Vendors Needed</InputLabel>
                                    <Select
                                        value={vendorsNeeded}
                                        onChange={(e) => setVendorsNeeded(e.target.value)}
                                    >
                                        <MenuItem value="foodVendors">Food Vendors</MenuItem>
                                        <MenuItem value="merchandiseVendors">Merchandise Vendors</MenuItem>
                                        <MenuItem value="activityVendors">Activity Vendors</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBCol>

                            <MDBCol>
                                <TextField
                                    label="Number of Vendor Booths"
                                    type="number"
                                    fullWidth
                                    value={numVendorBooths}
                                    onChange={(e) => setNumVendorBooths(e.target.value)}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <button style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }} type="submit">
                            Submit
                        </button>
                    </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <div className=" pt-1">
                                <h6>Search Type</h6>
                                <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getByTypeAdmin}>Go</button>
                            </div>
                            <div className="table-responsive">
    <MDBTable borderless className='mt-3' >
        <MDBTableHead>
            <tr className="bg-dark">
                <th scope='col' className="text-white d-letter-spacing h6">Id</th>
                <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                <th scope='col' className="text-white d-letter-spacing h6">Date</th>
                <th scope='col' className="text-white d-letter-spacing h6">Time</th>
                <th scope='col' className="text-white d-letter-spacing h6">Expected Guests</th>
                <th scope='col' className="text-white d-letter-spacing h6">Event Type</th>
                <th scope='col' className="text-white d-letter-spacing h6">Venue Description</th>
                <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
            {evtReq.map((evtReq, key) => (
                <tr className="bg-light" key={key}>
                    <td>
                        <h6>{evtReq.uniqueId}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.email}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.eventDate}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.eventTime}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.expectedGuests}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.eventType}</h6>
                    </td>
                    <td>
                        <h6>{evtReq.venueDescription}</h6>
                    </td>
                    <td className="text-center">
                        <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(evtReq.email)}>
                            <MDBIcon fas icon="trash-alt" />
                        </MDBBtn>
                        {' '}
                        <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(evtReq.userName, evtReq.email, evtReq.password, evtReq.phone, evtReq.userType)}>
                            <MDBIcon fas icon="edit" />
                        </button>
                        {' '}
                    </td>
                </tr>
            ))}
        </MDBTableBody>
    </MDBTable>
</div>

                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default ReqEventDashboard;
